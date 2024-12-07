// OkumaReaderModal.tsx
import React,{useRef,useState} from 'react';
import ReactDOM from 'react-dom';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { Box,Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from "@chakra-ui/react";
import './Canvas.scss'; // Ensure you have appropriate styles for the modal
import Loading from 'app/components/loading/Loading';

interface OkumaReaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLoading : boolean;
}

const OkumaReaderModal: React.FC<OkumaReaderModalProps> = ({ isOpen, onClose,isLoading }) => {
  // const [scale, setScale] = useState(1);
  const iframeRef = useRef(null);
  if (!isOpen) return null;

  // const handleFullscreen = () => {
  //       if (iframeRef.current) {
  //           if (document.fullscreenElement) {
  //               document.exitFullscreen();
  //           } else {
  //               iframeRef.current.requestFullscreen();
  //           }
  //       }
  //   }
  
  return ReactDOM.createPortal(
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxWidth="80vw" height="85vh">
          <ModalCloseButton />
          <ModalBody style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
          {isLoading ? <Loading /> :
          <iframe
            src="http://localhost:8000/bookwriter/"
            style={{
             width: '100%',
             height: '80vh',
             transform: 'scale(1)',
             WebkitTransform: 'scale(1)',  // Chrome/Safari
             msTransform: 'scale(1)',      // IE
             transformOrigin: '0 0',
             zoom: 1,                      // Add this for IE
             border: 'none'
           }}
           sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals"
           allow="microphone; fullscreen"
           allowFullScreen
           title="KFZ BookWriter"

         />}
          </ModalBody>
        </ModalContent>
      </Modal>,
    document.getElementById('root')!
  );
};

export default OkumaReaderModal;
