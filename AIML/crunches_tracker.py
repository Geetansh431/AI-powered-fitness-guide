from flask import Flask, Response, jsonify
import cv2
import mediapipe as mp
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

mp_pose = mp.solutions.pose
pose = mp_pose.Pose()
mp_drawing = mp.solutions.drawing_utils

cap = cv2.VideoCapture(0)
crunch_count = 0
crunch_stage = None
feedback_message = "Keep going!"

def calculate_angle(a, b, c):
    a, b, c = np.array(a), np.array(b), np.array(c)
    ba, bc = a - b, c - b
    cosine_angle = np.dot(ba, bc) / (np.linalg.norm(ba) * np.linalg.norm(bc))
    return np.degrees(np.arccos(np.clip(cosine_angle, -1.0, 1.0)))

def generate_frames():
    global crunch_count, crunch_stage, feedback_message
    while True:
        ret, frame = cap.read()
        if not ret:
            break
        frame = cv2.flip(frame, 1)
        image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = pose.process(image)
        image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)

        if results.pose_landmarks:
            mp_drawing.draw_landmarks(image, results.pose_landmarks, mp_pose.POSE_CONNECTIONS)
            landmarks = results.pose_landmarks.landmark

            try:
                # Define key points
                shoulder = [landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER].x, 
                            landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER].y]
                hip = [landmarks[mp_pose.PoseLandmark.LEFT_HIP].x, 
                       landmarks[mp_pose.PoseLandmark.LEFT_HIP].y]
                knee = [landmarks[mp_pose.PoseLandmark.LEFT_KNEE].x, 
                        landmarks[mp_pose.PoseLandmark.LEFT_KNEE].y]

                # Calculate angle between torso and legs
                crunch_angle = calculate_angle(shoulder, hip, knee)

                # Crunch detection logic
                if crunch_angle > 150:
                    crunch_stage = "down"
                    feedback_message = "Lower yourself slowly."
                
                elif crunch_angle < 100 and crunch_stage == "down":
                    crunch_stage = "up"
                    crunch_count += 1
                    feedback_message = "Great crunch! Engage your core."

                # Additional Form Checkpoints
                if crunch_angle < 70:
                    feedback_message = "Don't curl too much. Maintain control."

                if crunch_angle > 160:
                    feedback_message = "Lower yourself fully for a proper rep."

            except:
                feedback_message = "Make sure your whole body is visible."

        # Encode frame
        ret, buffer = cv2.imencode('.jpg', image)
        frame = buffer.tobytes()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

@app.route('/exercise-data')
def exercise_data():
    return jsonify({"count": crunch_count, "feedback": feedback_message})

@app.route('/')
def index():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == "__main__":
    try:
        app.run(host='0.0.0.0', port=8001, debug=True)
    finally:
        cap.release()
        cv2.destroyAllWindows()
