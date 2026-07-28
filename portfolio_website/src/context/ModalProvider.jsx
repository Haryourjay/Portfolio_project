import { useEffect, useState } from "react";
import ModalContext from "./ModalContext";

export default function ModalProvider({ children }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState(null)

    const openModal = () => {
        setModalOpen(true);
        document.body.style.overflow = 'hidden';
    };
  
    const closeModal = () => {
      setModalOpen(false);
      document.body.style.overflow = '';
    };

    const selectVideo = (video) => {
      setSelectedVideo(video);
    };

    const getSelectedVideo = () => {
      return selectedVideo
    };
  
    useEffect(() => {
      const onKeyDown = (e) => {
        if (e.key === 'Escape') closeModal();
      };
      document.addEventListener('keydown', onKeyDown);
      return () => document.removeEventListener('keydown', onKeyDown);
    }, []);

  return (
    <ModalContext.Provider value={{ modalOpen, setModalOpen, openModal, closeModal, selectVideo, getSelectedVideo }}>
      {children}
    </ModalContext.Provider>
  );
}