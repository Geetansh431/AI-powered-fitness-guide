from flask import Flask, Response, jsonify
import cv2
import mediapipe as mp
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Initialize MediaPipe Pose
mp_pose = mp.solutions.pose
pose = mp_pose.Pose()
mp_drawing = mp.solutions.drawing_utils

# Initialize video capture
cap = cv2.VideoCapture(0)

# Initialize counters and stages
pushup_count, squat_count, crunch_count = 0, 0, 0
pushup_stage, squat_stage, crunch_stage = None, None, None

def calculate_angle(a, b, c):
    a = np.array(a)
    b = np.array(b)
    c = np.array(c)
    ba = a - b
    bc = c - b
    cosine_angle = np.dot(ba, bc) / (np.linalg.norm(ba) * np.linalg.norm(bc))
    angle = np.degrees(np.arccos(cosine_angle))
    return angle

def generate_frames():
    global pushup_count, squat_count, crunch_count, pushup_stage, squat_stage, crunch_stage
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
                shoulder = [landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER].x,
                            landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER].y]
                elbow = [landmarks[mp_pose.PoseLandmark.LEFT_ELBOW].x,
                         landmarks[mp_pose.PoseLandmark.LEFT_ELBOW].y]
                wrist = [landmarks[mp_pose.PoseLandmark.LEFT_WRIST].x,
                         landmarks[mp_pose.PoseLandmark.LEFT_WRIST].y]
                elbow_angle = calculate_angle(shoulder, elbow, wrist)
                if elbow_angle > 160:
                    pushup_stage = "up"
                if elbow_angle < 90 and pushup_stage == "up":
                    pushup_stage = "down"
                    pushup_count += 1
            except Exception as e:
                print(f"Error in push-up detection: {e}")
            try:
                hip = [landmarks[mp_pose.PoseLandmark.LEFT_HIP].x,
                       landmarks[mp_pose.PoseLandmark.LEFT_HIP].y]
                knee = [landmarks[mp_pose.PoseLandmark.LEFT_KNEE].x,
                        landmarks[mp_pose.PoseLandmark.LEFT_KNEE].y]
                ankle = [landmarks[mp_pose.PoseLandmark.LEFT_ANKLE].x,
                         landmarks[mp_pose.PoseLandmark.LEFT_ANKLE].y]
                knee_angle = calculate_angle(hip, knee, ankle)
                if knee_angle > 160:
                    squat_stage = "up"
                if knee_angle < 90 and squat_stage == "up":
                    squat_stage = "down"
                    squat_count += 1
            except Exception as e:
                print(f"Error in squat detection: {e}")
            try:
                shoulder_y = landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER].y
                hip_y = landmarks[mp_pose.PoseLandmark.LEFT_HIP].y
                if abs(shoulder_y - hip_y) > 0.2:
                    crunch_stage = "down"
                if abs(shoulder_y - hip_y) < 0.1 and crunch_stage == "down":
                    crunch_stage = "up"
                    crunch_count += 1
            except Exception as e:
                print(f"Error in crunch detection: {e}")
        ret, buffer = cv2.imencode('.jpg', image)
        frame = buffer.tobytes()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

@app.route('/')
def index():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/exercise-data')
def exercise_data():
    """Send exercise counts to the frontend."""
    data = {
        "pushup_count": pushup_count,
        "squat_count": squat_count,
        "crunch_count": crunch_count
    }
    return jsonify(data)

@app.route('/shutdown', methods=['POST'])
def shutdown():
    cap.release()
    cv2.destroyAllWindows()
    return 'Server shutting down...'

if __name__ == "__main__":
    try:
        app.run(host='0.0.0.0', port=8080, debug=True)
    finally:
        cap.release()
        cv2.destroyAllWindows()