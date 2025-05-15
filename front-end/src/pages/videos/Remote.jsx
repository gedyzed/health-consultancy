// RemoteVideo.jsx
import React, { useEffect, useRef } from 'react';

const RemoteVideo = ({ user }) => {
  const containerRef = useRef();

  useEffect(() => {
    // whenever the user or their video track changes, play it
    if (user.videoTrack) {
      user.videoTrack.play(containerRef.current);
    }
    // cleanup when unmounting or user/videoTrack changes
    return () => {
      user.videoTrack?.stop();
    };
  }, [user]);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100vh',
        backgroundColor: '#000',
        objectFit: 'cover'
      }}
    />
  );
};

export default RemoteVideo;
