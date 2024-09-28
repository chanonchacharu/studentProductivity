import React, { useEffect, useRef } from "react";
import * as blazeface from "@tensorflow-models/blazeface";
import * as tf from "@tensorflow/tfjs";

const FaceDetection = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Function to set up webcam
  const setupWebcam = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    }
  };

  // Function to run face detection using Blazeface
  const runFaceDetection = async () => {
    const video = videoRef.current;
    if (video && video.readyState === 4) {
      const model = await blazeface.load();

      // Pass the video element to get face predictions
      const predictions = await model.estimateFaces(video, false);

      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");

      if (canvas && ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }

      if (predictions.length > 0) {
        // Draw detected face box and log the coordinates
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
        console.log("No face detected, user may not be focused.");
      }
    }
  };

  useEffect(() => {
    setupWebcam();

    const interval = setInterval(() => {
      runFaceDetection();
    }, 1000); // Run face detection every second

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  return (
    <div>
      <h1>Focus Monitoring with Face Detection</h1>
      <video
        ref={videoRef}
        width="640"
        height="480"
        style={{ display: "none" }} // Hide the video element
      />
      <canvas ref={canvasRef} width="640" height="480"></canvas>
    </div>
  );
};

export default FaceDetection;
