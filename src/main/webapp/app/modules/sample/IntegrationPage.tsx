// sample/integrationPage.tsx
import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useAppDispatch } from 'app/config/store';
import ErrorBoundary from 'app/shared/error/error-boundary';
import OkumaReaderModal from 'app/modules/book/OkumaReaderModal';
import CanvasModal from 'app/modules/canvas/CanvasModal';
import usePortal from 'react-useportal';
import axios from 'axios';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
// import SpeechKITT from 'app/modules/sample/speechkiit.js';

const IntegrationPage = () => {
  const dispatch = useAppDispatch();
  const [modalType, setModalType] = useState<string | null>(null); // State to track which modal is open

  useEffect(() => {
    console.log('Modal Open State:', modalType);
  }, [modalType]);

  const paddingTop = '0';
  const { Portal } = usePortal();

  const userId = '1'; // Example userId for demonstration
  const bucketName = 'book_application';

  const openModal = async (type: string) => {
    try {
      await callWebService(userId, bucketName); // Pass userId to your web service
    } catch (error) {
      console.error('Error calling the web service:', error);
      toast.error('Failed to call the web service.'); // Show error notification
    }

    setModalType(type); // Set the modal type
  };

  const callWebService = async (userId: string, bucketName: string) => {
    const apiUrl = `http://localhost:8080/api/gcs/create-user-folder?userId=${userId}&bucketName=${bucketName}`;
    const response = await axios.post(apiUrl); // Adjust method and payload as necessary
    return response.data; // Or handle the response as needed
  };

  const closeModal = () => {
    setModalType(null); // Close the modal
  };

  // Initialize SpeechKITT and speech recognition setup
  useEffect(() => {
    //SpeechKITT.annyang(); // Connect SpeechKITT to the speech recognition library
    //SpeechKITT.setInstructionsText('You can start or stop recognition using the toolbar below.');
   // SpeechKITT.vroom(); // Display the SpeechKITT interface

    // Function to handle messages from the iframe
    const handleMessage = (event: MessageEvent) => {
      if (event.data === 'startRecognition') {
        SpeechRecognition.startListening();
        toast.success('Speech recognition started');
      } else if (event.data === 'stopRecognition') {
        SpeechRecognition.stopListening();
        toast.info('Speech recognition stopped');
      }
    };

    // Add the message event listener
    window.addEventListener('message', handleMessage);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('message', handleMessage);
      // SpeechKITT.abortRecognition(); // Stop SpeechKITT when unmounting
    };
  }, []);

  return (
    <div className="app-container" style={{ paddingTop }}>
      <ToastContainer position={toast.POSITION.TOP_LEFT} className="toastify-container" toastClassName="toastify-toast" />

      <div id="app-view-container">
        <ErrorBoundary>
          {/* Button to open the OkumaReaderModal */}
          <div>
            <h3>Temporary Test Button</h3>
            <button onClick={() => openModal('okumaReader')}>Open bookWriter</button>
          </div>

          {/* Render Okuma-Reader modal inside a portal */}
          <Portal>
            {modalType === 'okumaReader' && (
              <OkumaReaderModal isOpen={modalType === 'okumaReader'} onClose={closeModal} userId={userId} isLoading={true}/>
            )}
          </Portal>

          {/* Button to open the CanvasModal */}
          <div>
            <h3>Temporary Test Button</h3>
            <button onClick={() => openModal('paintBrush')}>Paint Brush</button>
          </div>

          {/* Render Paint Brush modal inside a portal */}
          <Portal>
            {modalType === 'paintBrush' && (
              <CanvasModal isOpen={modalType === 'paintBrush'} onClose={closeModal} isLoading={true}/>
            )}
          </Portal>
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default IntegrationPage;
