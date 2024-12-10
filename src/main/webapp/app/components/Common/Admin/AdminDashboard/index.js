import React, { useState } from "react";
import {
  Box,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  IconButton,
  Image,
  Text,
  Card, Button, Avatar
} from "@chakra-ui/react";
import OkumaReaderModal from "app/modules/book/OkumaReaderModal";
import usePortal from "react-useportal";
import CanvasModal from 'app/modules/canvas/CanvasModal';
import { toast } from "react-toastify";
import axios from "axios";
import MyBook from "../MyBook";
import MySketch from "../MySketch";
import AdminLayout from "app/components/Layout/AdminLayout";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function AdminDashboard(props) {
  const [modalType, setModalType] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { Portal } = usePortal();
  const userId = useSelector((state) => state.authentication.userInfo.userId);
  console.error('userId', userId)
  // const userId = props.userId; // Example userId for demonstration
  const bucketName = 'book_application';

  const callWebService = async (id, bucket) => {
    const apiUrl = `http://localhost:8080/api/gcs/create-user-folder?userId=${userId}&bucketName=${bucket}`;
    try {
      const response = await axios.post(apiUrl);
      console.error('response', response);
      return response.data;
    } catch (error) {
      console.error('Error calling the web service:', error);
      toast.error('Failed to call the web service.');
      return null; // Return null or an appropriate fallback value
    }
  };

  // Handling the opening of modals
  const openModal = async (type) => {
    setModalType(type);
    setIsLoading(true);
    try {
      const result = await callWebService(userId, bucketName);
      if (result) {
        setIsLoading(false);
        console.error('result', result);
      }
    } catch (error) {
      setIsLoading(false);
      console.error('Error opening modal:', error);
      toast.error('An error occurred while opening the modal.');
    }
  };

  // Handling the closing of modals
  const closeModal = () => {
    setModalType(null);
  };

  return (
    <AdminLayout>
      {modalType === 'paintBrush' ? (
        <CanvasModal isOpen={modalType === 'paintBrush'} onClose={closeModal} isLoading={isLoading} />
      ) : modalType === 'okumaReader' ? (
        <OkumaReaderModal isOpen={modalType === 'okumaReader'} onClose={closeModal} isLoading={isLoading} />
      ) :
        <Box className="dashboard-wrap">
          <Box className="content-top" p="50px" display="flex" flexDirection="row" gap="40px" alignItems="center" justifyContent="center">
            <Card maxW="sm" boxShadow="xl" borderRadius="14px" className="book-card">
              <CardHeader className="card-header">
                <Flex spacing="4">
                  <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                    <Box>
                      <Heading size="sm">Start Your Book</Heading>
                    </Box>
                  </Flex>

                </Flex>
              </CardHeader>
              <CardFooter
                className="card-footer"
                justify="space-between"
                flexWrap="wrap"
                mt-="20px"
              >
                <Button className="btn-primary-outline btn-lg" size="lg"
                  onClick={() => { openModal('okumaReader') }}>
                  Click here to start the writing book
                </Button>
              </CardFooter>
            </Card>
            <Card maxW="sm" boxShadow="xl" borderRadius="14px" className="book-card">
              <CardHeader className="card-header">
                <Flex spacing="4">
                  <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                    <Box>
                      <Heading size="sm">Start Your Sketch</Heading>
                    </Box>
                  </Flex>

                </Flex>
              </CardHeader>
              <CardFooter
                className="card-footer"
                justify="space-between"
                flexWrap="wrap"
                mt-="20px"
              >
                <Button className="btn-primary-outline btn-lg" size="lg"
                  onClick={() => { openModal('paintBrush') }}>
                  Click here to start the Sketch
                </Button>
              </CardFooter>
            </Card>
          </Box>
        </Box>}
    </AdminLayout>
  );
}

export default AdminDashboard;
