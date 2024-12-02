import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './OkumaReaderModal.scss'; // Ensure you have appropriate styles for the modal
import Loading from 'app/components/loading/Loading';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay } from '@chakra-ui/react';

interface OkumaReaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
  userId: string; // Keep userId as a required prop
}

const OkumaReaderModal: React.FC<OkumaReaderModalProps> = ({ isOpen, onClose, userId,isLoading }) => {
  const [iframeSrc, setIframeSrc] = useState('');

  useEffect(() => {
    // Append userId as a query parameter to the iframe URL
    const baseUrl = 'http://localhost:8000/bookwriter/';
    setIframeSrc(userId ? `${baseUrl}?userId=${userId}` : baseUrl);
  }, [userId]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin === "http://localhost:8000") {
        // Handle the received message
        if (event.data.action === "startRecognition") {
          console.error("Start recognition command received");
        } else if (event.data.action === "abortRecognition") {
          console.error("Abort recognition command received");
        }
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxWidth="80vw" height="85vh">
          <ModalCloseButton />
          <ModalBody style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
          {isLoading ? <Loading /> :
          <iframe
          src={iframeSrc}
          style={{
            width: '100%',
            height: '80vh',
            transform: 'scale(1)',
            WebkitTransform: 'scale(1)', // Chrome/Safari
            msTransform: 'scale(1)',     // IE
            transformOrigin: '0 0',
            zoom: 1,                     // Add this for IE
            border: 'none',
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
