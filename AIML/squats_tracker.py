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
squat_count = 0
squat_stage = None
feedback_message = "Keep going!"

def calculate_angle(a, b, c):
    a, b, c = np.array(a), np.array(b), np.array(c)
    ba, bc = a - b, c - b
    cosine_angle = np.dot(ba, bc) / (np.linalg.norm(ba) * np.linalg.norm(bc))
    return np.degrees(np.arccos(np.clip(cosine_angle, -1.0, 1.0)))

def generate_frames():
    global squat_count, squat_stage, feedback_message
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
                # Key Points
                hip = [landmarks[mp_pose.PoseLandmark.LEFT_HIP].x, landmarks[mp_pose.PoseLandmark.LEFT_HIP].y]
                knee = [landmarks[mp_pose.PoseLandmark.LEFT_KNEE].x, landmarks[mp_pose.PoseLandmark.LEFT_KNEE].y]
                ankle = [landmarks[mp_pose.PoseLandmark.LEFT_ANKLE].x, landmarks[mp_pose.PoseLandmark.LEFT_ANKLE].y]

                shoulder = [landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER].x, landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER].y]
                foot_distance = abs(landmarks[mp_pose.PoseLandmark.LEFT_ANKLE].x - landmarks[mp_pose.PoseLandmark.RIGHT_ANKLE].x)

                knee_angle = calculate_angle(hip, knee, ankle)
                torso_angle = calculate_angle(shoulder, hip, knee)

                # Squat Detection Logic
                if knee_angle > 160:
                    squat_stage = "up"
                    feedback_message = "Lower yourself slowly."
                
                elif knee_angle < 90 and squat_stage == "up":
                    squat_stage = "down"
                    squat_count += 1
                    feedback_message = "Good squat! Keep your back straight."

                # Additional Form Checkpoints
                if knee_angle < 60:
                    feedback_message = "Don't go too deep! Maintain control."

                if foot_distance < 0.1:
                    feedback_message = "Keep feet shoulder-width apart for stability."

                if torso_angle < 30:
                    feedback_message = "Keep your chest up. Don't lean forward too much."

            except:
                feedback_message = "Make sure your whole body is visible."

        # Encode frame
        ret, buffer = cv2.imencode('.jpg', image)
        frame = buffer.tobytes()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

@app.route('/exercise-data')
def exercise_data():
    return jsonify({"count": squat_count, "feedback": feedback_message})

@app.route('/')
def index():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == "__main__":
    try:
        app.run(host='0.0.0.0', port=5002, debug=True)
    finally:
        cap.release()
        cv2.destroyAllWindows()
