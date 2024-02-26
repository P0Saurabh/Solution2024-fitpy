import cv2
import numpy as np
import tensorflow as tf
import tensorflow_hub as hub
import json  # Import json module

# Load the MoveNet SinglePose model from TensorFlow Hub
model = hub.load("https://tfhub.dev/google/movenet/singlepose/lightning/4")
movenet = model.signatures['serving_default']

CONFIDENCE_THRESHOLD = 0.4

def run_inference(image):
    """Runs pose estimation inference using MoveNet."""
    image = tf.image.resize_with_pad(tf.convert_to_tensor(image), 192, 192)
    input_image = tf.expand_dims(image, axis=0)
    input_image = tf.cast(input_image, dtype=tf.int32)
    results = movenet(input_image)
    keypoints = results['output_0'].numpy()
    return np.squeeze(keypoints)

def draw_keypoints(frame, keypoints, confidence_threshold=0.4):
    y, x, _ = frame.shape
    for kp in keypoints:
        ky, kx, kp_conf = kp
        if kp_conf > confidence_threshold:
            cv2.circle(frame, (int(kx * x), int(ky * y)), 4, (0, 255, 0), -1)

def update_jump_count_json(jump_counter):
    """Updates the jump count in a JSON file."""
    with open("jump_count.json", "w") as f:
        json.dump({"jump_count": jump_counter}, f)  # Divide jump_counter by 2

def main():
    cap = cv2.VideoCapture(0)
    jump_counter = 0
    was_above_line = False

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        frame = cv2.flip(frame, 1)  # Mirror the frame
        keypoints = run_inference(frame)

        # Draw a horizontal line across the screen
        line_y_position = int(frame.shape[0] * 0.6)
        cv2.line(frame, (0, line_y_position), (frame.shape[1], line_y_position), (255, 0, 0), 2)

        if len(keypoints) >= 17:
            mid_hip_y = int((keypoints[11][0] + keypoints[12][0]) / 2 * frame.shape[0])

            # Jump logic
            if mid_hip_y < line_y_position and was_above_line:
                jump_counter += 1
                was_above_line = False
                update_jump_count_json(jump_counter)  # Update JSON file with new count
            elif mid_hip_y > line_y_position:
                was_above_line = True

        draw_keypoints(frame, keypoints, CONFIDENCE_THRESHOLD)
        cv2.putText(frame, f'Jumps: {jump_counter}', (10, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 0, 0), 2, cv2.LINE_AA)
        cv2.imshow('MoveNet SinglePose Lightning', frame)

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    main()
