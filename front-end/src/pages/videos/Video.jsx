// Video.js
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  forwardRef,
  useImperativeHandle
} from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';
import PLACEHOLDER_IMAGE from '../assets/Login/images/Frame 5.png';
import { useNavigate } from 'react-router-dom';

const VideoCall = forwardRef(({ channel, token }, ref) => {
  const client = useRef(AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' })).current;
  const [joined, setJoined] = useState(false);
  const [localAudioTrack, setLocalAudioTrack] = useState(null);
  const [localVideoTrack, setLocalVideoTrack] = useState(null);
  const [remoteUsers, setRemoteUsers] = useState({});
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const navigate = useNavigate();

  // subscribe / unsubscribe remote users...
  useEffect(() => {
    const handleUserPublished = async (user, mediaType) => {
      await client.subscribe(user, mediaType);
      if (mediaType === 'video') {
        const track = user.videoTrack.getMediaStreamTrack();
        track.addEventListener('enabledchange', () => setRemoteUsers(u => ({ ...u })));
      }
      setRemoteUsers(u => ({ ...u, [user.uid]: user }));
    };
    const handleUserUnpublished = user => {
      setRemoteUsers(u => {
        const copy = { ...u };
        delete copy[user.uid];
        return copy;
      });
    };
    client.on('user-published', handleUserPublished);
    client.on('user-unpublished', handleUserUnpublished);
    return () => {
      client.off('user-published', handleUserPublished);
      client.off('user-unpublished', handleUserUnpublished);
    };
  }, [client]);

  // join / leave toggle
  const handleJoinLeave = useCallback(async () => {
    if (joined) {
      await leaveCall();
    } else {
      // join
      await client.join(
        import.meta.env.VITE_AGORA_APP_ID,
        channel,
        token || null,
        null
      );
      const [micTrack, camTrack] = await AgoraRTC.createMicrophoneAndCameraTracks();
      setLocalAudioTrack(micTrack);
      setLocalVideoTrack(camTrack);
      camTrack.play('local-container');
      await client.publish([micTrack, camTrack]);
      setJoined(true);
    }
  }, [joined, client, channel, token]);

  // the actual leave logic
  const leaveCall = useCallback(async () => {
    try {
      await client.leave();
      localVideoTrack?.stop();
      localVideoTrack?.close();
      localAudioTrack?.stop();
      localAudioTrack?.close();
      setJoined(false);
      setRemoteUsers({});
    } catch (err) {
      console.error("Error leaving call:", err);
    }
  }, [client, localVideoTrack, localAudioTrack]);

  // expose leaveCall to parent via ref
  useImperativeHandle(ref, () => ({
    leaveCall: async () => {
      await leaveCall();
      navigate(-1);    // after cleanup, go back
    }
  }), [leaveCall, navigate]);

  // mic/cam toggles...
  const toggleMic = () => {
    if (!localAudioTrack) return;
    const next = !micOn;
    localAudioTrack.setEnabled(next);
    setMicOn(next);
  };
  const toggleCam = () => {
    if (!localVideoTrack) return;
    const next = !camOn;
    localVideoTrack.setEnabled(next);
    setCamOn(next);
    if (next) localVideoTrack.play('local-container');
  };

  const mainRemoteUser = Object.values(remoteUsers)[0];

  return (
    <div style={{ position:'relative', width:'100%', height:'100vh', backgroundColor:'lightblue' }}>
      {mainRemoteUser && <RemoteVideo user={mainRemoteUser} />}
      <div
        id="local-container"
        style={{
          position: 'fixed', width:200, height:150,
          bottom:16, left:16, border:'2px solid #fff',
          borderRadius:8, overflow:'hidden', background:'#000', zIndex:1000
        }}
      >
        {!camOn && <img src={PLACEHOLDER_IMAGE} style={{width:'100%',height:'100%',objectFit:'cover'}} />}
      </div>
      <div style={{
        position:'fixed', top:16, left:'50%', transform:'translateX(-50%)',
        zIndex:1000, display:'flex', gap:8, padding:8,
        background:'rgba(0,0,0,0.7)', borderRadius:8
      }}>
        <button
          onClick={handleJoinLeave}
          style={{
            padding:'8px 16px',
            background: joined ? '#ff4444' : '#4CAF50',
            color:'white', border:'none', borderRadius:4, cursor:'pointer'
          }}
        >
          {joined ? 'Leave Call' : 'Join Call'}
        </button>
        <button onClick={toggleMic} disabled={!joined} style={{ /*…*/ }}>
          {micOn ? 'Mute Mic' : 'Unmute Mic'}
        </button>
        <button onClick={toggleCam} disabled={!joined} style={{ /*…*/ }}>
          {camOn ? 'Disable Camera' : 'Enable Camera'}
        </button>
      </div>
    </div>
  );
});

export default VideoCall;
