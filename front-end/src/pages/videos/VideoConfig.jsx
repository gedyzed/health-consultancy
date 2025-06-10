// VideoConfig.jsx
import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import VideoCall from './Video';

export default function VideoConfig() {
  const { userId, peerId } = useParams();
  const [room, setRoom] = useState("");
  const videoRef = useRef();

  useEffect(() => {
    if (userId && peerId) {
      const roomId = userId < peerId  ? `${userId}${peerId}`: `${peerId}${userId}`;
      setRoom(roomId);
    }
  }, [userId, peerId]);

  // this runs when the user clicks the parent’s “Leave Room”
  const handleLeaveRoom = async () => {
    if (videoRef.current?.leaveCall) {
      await videoRef.current.leaveCall();
      // navigation is already handled inside leaveCall’s navigate('/')
    }
  };

  if (!room) return null;
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <VideoCall ref={videoRef} channel={room} token={null} />
      <button
        onClick={handleLeaveRoom}
        style={{
          position: 'fixed',
          top: 16,
          right: 16,
          padding: '8px 16px',
          background: '#ff4444',
          color: '#fff',
          border: 'none',
          borderRadius: 4,
          cursor: 'pointer',
          zIndex: 1001
        }}
      >
        Leave Room
      </button>
    </div>
  );
}