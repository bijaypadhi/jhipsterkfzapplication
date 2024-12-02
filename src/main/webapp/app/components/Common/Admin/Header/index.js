import React, { useState } from "react";
import { Box, Button, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { IoBookSharp } from "react-icons/io5";
import { MdDraw } from "react-icons/md";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { FaPowerOff } from "react-icons/fa6";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "app/firebase/firebase";
import { signOut } from "firebase/auth";
import usePortal from "react-useportal";
import { useDispatch } from "react-redux";
import { setUserInfo } from "app/shared/reducers/authentication";

function AdminHeader() {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleLogout = () => {
    signOut(auth);
    navigate('/');
    dispatch(setUserInfo({}));
  }

  return (
    <>
      <Box className="sidebar">
        <Box className="sidebar-kfz-logo">
          <Image
            src="content/images/kfz-logo.svg"
            alt="Kids Fun Zone Logo"
            h="50px"
          />
        </Box>
        <Box className="menu-item">
          <NavLink to="/admin/dashboard"
            className={({ isActive }) =>
              isActive && "active"
            }>
            <RiDashboardHorizontalFill /> Homepage
          </NavLink>
        </Box>
        <Box className="menu-item">
          <NavLink to="/admin/mysketch"
            className={({ isActive }) =>
              isActive && "active"
            }>
            <MdDraw /> My Sketch{" "}
          </NavLink>
        </Box>
        <Box className="menu-item">
          <NavLink to="/admin/mybook"
            className={({ isActive }) =>
              isActive && "active"
            }>
            <IoBookSharp /> My Books{" "}
          </NavLink>
        </Box>
        <Box className="menu-item logout" onClick={handleOpen}>
          <FaPowerOff />
          Logout
        </Box>
      </Box>

      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent >
          <ModalHeader>Logout</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          Are you sure you want to logout?
          </ModalBody>
          <ModalFooter gap={6}>
            <Button className="btn-secondary-solid"
              colorScheme="grey" onClick={handleClose}>
              Cancel
            </Button>
            <Button className="btn-secondary-solid"
              colorScheme="purple" onClick={handleLogout}>
              Logout
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AdminHeader;
