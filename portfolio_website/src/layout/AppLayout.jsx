import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar';
import ScrollProgress from '../components/ScrollProgress';
import Grain from '../components/Grain';
import VideoModal from '../components/VideoModal';
import Footer from '../components/Footer';
import Cursor from '../components/Cursor';
import ModalContext from '../context/ModalContext';
import ModalProvider from '../context/ModalProvider';

const AppLayout = () => {
    
    return (
        <>
        <ModalProvider>
            <Cursor />
            <ScrollProgress />
            <Grain />
            <VideoModal />
            <Navbar />
            <Outlet />
            <Footer />
        </ModalProvider>
        </>
    )
}

export default AppLayout