// sample/integrationPage.tsx
import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getSession } from 'app/shared/reducers/authentication';
import AppRoutes from 'app/routes';
import ErrorBoundary from 'app/shared/error/error-boundary';
import OkumaReaderModal from 'app/modules/book/OkumaReaderModal';
import CanvasModal from 'app/modules/canvas/CanvasModal';
import usePortal from 'react-useportal';
import axios from 'axios';
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
    // Call your Spring Boot web service before opening the modal
    try {
      await callWebService(userId,bucketName); // Pass userId to your web service
    } catch (error) {
      console.error('Error calling the web service:', error);
      toast.error('Failed to call the web service.'); // Show error notification
    }

    setModalType(type); // Set the modal type
  };

    const callWebService = async (userId: string, bucketName: string) => {
    const apiUrl = `http://localhost:8080/api/gcs/create-user-folder?userId=${userId}&bucketName=${bucketName}`;
         // Update to your Spring Boot API URL
    const response = await axios.post(apiUrl); // Adjust method and payload as necessary
    return response.data; // Or handle the response as needed
  };

  const closeModal = () => {
    setModalType(null); // Close the modal
  };

  return (

      <div className="app-container" style={{ paddingTop }}>
        <ToastContainer position={toast.POSITION.TOP_LEFT} className="toastify-container" toastClassName="toastify-toast" />

        <div id="app-view-container">
          <ErrorBoundary>

            <div>
              <h3>Temporary Test Button</h3>
              <button onClick={() => openModal('okumaReader')}>Open bookWriter</button>
            </div>

            {/* Render Okuma-Reader modal inside a portal */}
            <Portal>
              {modalType === 'okumaReader' && (
                <OkumaReaderModal isOpen={modalType === 'okumaReader'} onClose={closeModal} userId={userId} />
              )}
            </Portal>

            <div>
              <h3>Temporary Test Button</h3>
              <button onClick={() => openModal('paintBrush')}>Paint Brush</button>
            </div>

            {/* Render Paint Brush modal inside a portal */}
            <Portal>
              {modalType === 'paintBrush' && (
                <CanvasModal isOpen={modalType === 'paintBrush'} onClose={closeModal} />
              )}
            </Portal>
          </ErrorBoundary>
          {/* <Footer /> */}
        </div>
      </div>

  );
};

export default IntegrationPage;

