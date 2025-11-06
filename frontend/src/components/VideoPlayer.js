import React from "react";

const VideoPlayer = () => {
  return (
    <div className="video-container">
      <video
        id="videoPlayer"
        width="720"
        height="400"
        controls
        style={{ borderRadius: "10px", boxShadow: "0 0 10px #333" }}
      >
        <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
        Your browser does not support HTML video.
      </video>
    </div>
  );
};

export default VideoPlayer;
