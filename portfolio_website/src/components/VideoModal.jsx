// components/VideoModal.js
import { useContext } from "react";
import ModalContext from "../context/ModalContext";
import ReactPlayer from "react-player";

const VideoModal = () => {
  const { modalOpen, closeModal, getSelectedVideo, selectVideo } = useContext(ModalContext)
  if (!modalOpen) return null;

  const selectedVideo = getSelectedVideo()
  if (!selectedVideo.url || !selectedVideo.title) return null;

  const handleClose = () => {
    selectVideo(null)
    closeModal()
  }

  return (
    <div className={`video-modal ${modalOpen ? 'open' : ''}`} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      {/* <div className="modal-inner">
        <button className="modal-close" onClick={closeModal}>✕</button>
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>▶</div>
          <p>Video preview will appear here.<br />Connect your Vimeo portfolio link.</p>
        </div>
      </div> */}
      <div
          className="video-modal-content"
          onClick={(e) => e.stopPropagation()}
      >

          <button
              className="close-btn"
              onClick={handleClose}
          >
              ✕
          </button>

          <ReactPlayer
              src={selectedVideo.url}
              width="100%"
              height="100%"
              playing={true}
              controls
              muted={false}
          />

          <h2>{selectedVideo.title}</h2>

          <p>{selectedVideo.description}</p>

      </div>
    </div>
  );
};

export default VideoModal;
