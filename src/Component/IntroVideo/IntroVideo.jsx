import React, { useRef, useEffect, useState } from "react";

export default function IntroVideo({ onComplete }) {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    
    // محاولة تشغيل الصوت تلقائياً (قد لا تعمل في بعض المتصفحات)
    const tryUnmute = () => {
      if (videoRef.current) {
        videoRef.current.muted = false;
        setIsMuted(false);
      }
    };
    
    // التجربة بعد تفاعل المستخدم مع أي مكان
    document.body.addEventListener('click', tryUnmute);
    
    return () => {
      document.body.style.overflow = "auto";
      document.body.removeEventListener('click', tryUnmute);
    };
  }, []);

  const handleSkip = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    onComplete();
  };

  const handleVideoEnd = () => {
    onComplete();
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <div className="intro-overlay">
      <video
        ref={videoRef}
        className="intro-video"
        autoPlay
        muted={isMuted}
        playsInline
        onEnded={handleVideoEnd}
      >
        <source src="/videos/toyota-intro.mp4" type="video/mp4" />
      </video>
      
      <button className="skip-button" onClick={handleSkip}>
        تخطي <i className="fas fa-forward"></i>
      </button>
      
      <button className="sound-button" onClick={toggleMute}>
        <i className={`fas ${isMuted ? 'fa-volume-mute' : 'fa-volume-up'}`}></i>
      </button>

      <style>
        {`
          .intro-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 9999;
            background-color: #000;
          }

          .intro-video {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .skip-button {
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: rgba(0, 0, 0, 0.7);
            color: white;
            border: 1px solid rgba(255, 255, 255, 0.3);
            padding: 12px 28px;
            border-radius: 50px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            z-index: 10000;
            display: flex;
            align-items: center;
            gap: 10px;
            transition: all 0.3s ease;
            font-family: inherit;
          }

          .skip-button:hover {
            background: #e31837;
            border-color: #e31837;
            transform: scale(1.05);
          }

          .sound-button {
            position: fixed;
            bottom: 30px;
            left: 30px;
            background: rgba(0, 0, 0, 0.7);
            color: white;
            border: 1px solid rgba(255, 255, 255, 0.3);
            padding: 12px 16px;
            border-radius: 50px;
            font-size: 18px;
            cursor: pointer;
            z-index: 10000;
            transition: all 0.3s ease;
          }

          .sound-button:hover {
            background: #e31837;
            border-color: #e31837;
            transform: scale(1.05);
          }

          @media (max-width: 480px) {
            .skip-button {
              bottom: 20px;
              right: 20px;
              padding: 8px 20px;
              font-size: 14px;
            }
            .sound-button {
              bottom: 20px;
              left: 20px;
              padding: 8px 14px;
              font-size: 14px;
            }
          }
        `}
      </style>
    </div>
  );
}