// components/VideoModal.js
import React from 'react';

const VideoModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={`video-modal ${isOpen ? 'open' : ''}`} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-inner">
        <button className="modal-close" onClick={onClose}>✕</button>
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>▶</div>
          <p>Video preview will appear here.<br />Connect your Vimeo portfolio link.</p>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
