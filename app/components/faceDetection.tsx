"use client";

import React, { useEffect, useRef } from "react";
import * as blazeface from "@tensorflow-models/blazeface";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl";

const FaceDetection = ({ onFocusChange }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Set up TensorFlow.js backend (WebGL)
  const setupBackend = async () => {
    await tf.setBackend("webgl");
    await tf.ready();
  };

  // Set up the webcam stream
  const setupWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.addEventListener("loadedmetadata", () => {
          videoRef.current.play();
        });
      }
    } catch (error) {
      console.error("Error accessing the webcam:", error);
    }
  };

  // Run face detection using BlazeFace
  const runFaceDetection = async () => {
    const video = videoRef.current;
    if (video && video.readyState === 4) {
      const model = await blazeface.load();

      // Get face predictions from the video element
      const predictions = await model.estimateFaces(video, false);

      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");

      if (canvas && ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }

      if (predictions.length > 0) {
        onFocusChange(true); // Notify that focus is detected

        // Draw a box around each detected face
        predictions.forEach((prediction) => {
          const start = prediction.topLeft as [number, number];
          const end = prediction.bottomRight as [number, number];

          if (ctx && canvas) {
            ctx.strokeStyle = "green";
            ctx.lineWidth = 2;
            ctx.strokeRect(
              start[0],
              start[1],
              end[0] - start[0],
              end[1] - start[1]
            );
          }

          console.log("User is detected, face position:", start, end);
        });
      } else {
        onFocusChange(false); // Notify that no face is detected
        console.log("No face detected, user may not be focused.");
      }
    }
  };

  // Set up the webcam and TensorFlow backend on mount
  useEffect(() => {
    const initialize = async () => {
      await setupBackend();
      await setupWebcam();
    };
    initialize();

    const interval = setInterval(() => {
      runFaceDetection();
    }, 1000); // Run face detection every second

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  return (
    <div style={{ position: "relative", width: "640px", height: "480px" }}>
      <video
        ref={videoRef}
        width="640"
        height="480"
        style={{ position: "absolute", top: 0, left: 0 }}
      />
      <canvas
        ref={canvasRef}
        width="640"
        height="480"
        style={{ position: "absolute", top: 0, left: 0 }}
      />
    </div>
  );
};

export default FaceDetection;
