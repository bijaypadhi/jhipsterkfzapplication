import React, { useEffect, useState } from 'react';
import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { ToastContainer, toast } from 'react-toastify';
import { useAppDispatch } from 'app/config/store';
import ErrorBoundary from 'app/shared/error/error-boundary';
import OkumaReaderModal from 'app/modules/book/OkumaReaderModal';
import CanvasModal from 'app/modules/canvas/CanvasModal';
import usePortal from 'react-useportal';
import axios from 'axios';
// import SpeechKITT from 'app/modules/sample/speechkiit.js';
import 'react-toastify/dist/ReactToastify.css';

const Sample = () => {
  const dispatch = useAppDispatch();
  const [modalType, setModalType] = useState(null);
  const { Portal } = usePortal();

  const userId = '1'; // Example userId for demonstration
  const bucketName = 'book_application';

  useEffect(() => {
    // Handling modalType change
    try {
      console.warn('Modal Open State:', modalType);
    } catch (error) {
      console.error('Error logging modal state:', error);
      toast.error('An error occurred while logging modal state.');
    }
  }, [modalType]);

  useEffect(() => {
    const handleMessage = (event) => {
      try {
        if (event.data === 'startRecognition') {
          startSpeechRecognition();
        } else if (event.data === 'stopRecognition') {
          stopSpeechRecognition();
        }
      } catch (error) {
        console.error('Error handling message event:', error);
        toast.error('An error occurred while handling the message event.');
      }
    };

    const startSpeechRecognition = () => {
      try {
        // SpeechKITT.startRecognition();
        toast.success('Speech recognition started');
      } catch (error) {
        console.error('Error starting SpeechKITT recognition:', error);
        toast.error('Failed to start speech recognition.');
      }
    };

    const stopSpeechRecognition = () => {
      try {
        // SpeechKITT.abortRecognition();
        toast.info('Speech recognition stopped');
      } catch (error) {
        console.error('Error stopping SpeechKITT recognition:', error);
        toast.error('Failed to stop speech recognition.');
      }
    };

    try {
      window.addEventListener('message', handleMessage);
    } catch (error) {
      console.error('Error adding event listener:', error);
      toast.error('Failed to set up speech recognition event listener.');
    }

    return () => {
      try {
        window.removeEventListener('message', handleMessage);
        // Uncomment if needed: SpeechKITT.abortRecognition(); // Stop SpeechKITT when unmounting
      } catch (error) {
        console.error('Error removing event listener:', error);
        toast.error('Failed to clean up event listener.');
      }
    };
  }, []);

  const callWebService = async (id, bucket) => {
    // const apiUrl = `http://localhost:8080/api/gcs/create-user-folder?userId=${id}&bucketName=${bucket}`;
    // try {
    //   const response = await axios.post(apiUrl);
    //   return response.data;
    // } catch (error) {
    //   console.error('Error calling the web service:', error);
    //   toast.error('Failed to call the web service.');
    //   return null; // Return null or an appropriate fallback value
    // }
  };

  // Handling the opening of modals
  const openModal = async (type) => {
    try {
      const result = await callWebService(userId, bucketName);
      // if (result) {
        setModalType(type);
      // } else {
      //   toast.error('Unable to open modal due to web service error.');
      // }
    } catch (error) {
      console.error('Error opening modal:', error);
      toast.error('An error occurred while opening the modal.');
    }
  };

  // Handling the closing of modals
  const closeModal = () => {
    try {
      setModalType(null);
    } catch (error) {
      console.error('Error closing modal:', error);
      toast.error('An error occurred while closing the modal.');
    }
  };

  return (
    <Box className="app-container" pt="30px" textAlign="center">
      <ToastContainer position={toast.POSITION.TOP_LEFT} className="toastify-container" toastClassName="toastify-toast" />
      <ErrorBoundary>
        <Heading as="h3">Integration Page</Heading>

        <Box mt="20px">
          <Text>Open Modals for Testing</Text>
          <Button
            onClick={() => {openModal('okumaReader')}}
            colorScheme="blue"
            size="md"
            isDisabled={!userId || !bucketName} // Disable the button if data is missing
          >
            Open Okuma Reader
          </Button>
          <Button
            onClick={() => {openModal('paintBrush')}}
            colorScheme="orange"
            size="md"
            ml="10px"
            isDisabled={!userId || !bucketName} // Disable the button if data is missing
          >
            Open Paint Brush
          </Button>
        </Box>

        <Portal>
          {modalType === 'okumaReader' && (
            <OkumaReaderModal isOpen={modalType === 'okumaReader'} onClose={closeModal} userId={userId} />
          )}
        </Portal>

        <Portal>
          {modalType === 'paintBrush' && (
            <CanvasModal isOpen={modalType === 'paintBrush'} onClose={closeModal} />
          )}
        </Portal>
      </ErrorBoundary>
    </Box>
  );
};

export default Sample;