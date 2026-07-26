// components/VideoModal.js
import { useContext } from "react";
import ModalContext from "../context/ModalContext";

const VideoModal = ({ isOpen, onClose }) => {
  const { modalOpen, closeModal } = useContext(ModalContext)
  if (!modalOpen) return null;

  return (
    <div className={`video-modal ${modalOpen ? 'open' : ''}`} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-inner">
        <button className="modal-close" onClick={closeModal}>✕</button>
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>▶</div>
          <p>Video preview will appear here.<br />Connect your Vimeo portfolio link.</p>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
