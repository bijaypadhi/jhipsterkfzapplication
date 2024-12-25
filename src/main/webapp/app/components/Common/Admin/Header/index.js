import React, { useState } from "react";
import { Box, Button, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { IoBookSharp } from "react-icons/io5";
import { MdDraw, MdPublish } from "react-icons/md";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { FaPowerOff } from "react-icons/fa6";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "app/firebase/firebase";
import { signOut } from "firebase/auth";
import usePortal from "react-useportal";
import { useDispatch } from "react-redux";
import { setUserInfo } from "app/shared/reducers/authentication";
import { RiUser3Fill } from "react-icons/ri";
import { BiSolidPurchaseTag } from "react-icons/bi";
import { CgGames } from "react-icons/cg";
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
          <NavLink to="/admin/profile"
            className={({ isActive }) =>
              isActive && "active"
            }>
            <RiUser3Fill /> Profile
          </NavLink>
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
        <Box className="menu-item">
          <NavLink to="/admin/games"
            className={({ isActive }) =>
              isActive && "active"
            }>
            <CgGames /> Games{" "}
          </NavLink>
        </Box>
        <Box className="menu-item">
          <NavLink to="/admin/publish"
            className={({ isActive }) =>
              isActive && "active"
            }>
            <MdPublish /> Publish{" "}
          </NavLink>
        </Box>
        <Box className="menu-item">
          <NavLink to="/admin/purchase"
            className={({ isActive }) =>
              isActive && "active"
            }>
            <BiSolidPurchaseTag /> Purchase{" "}
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
            <Button className="btn-primary-solid"
              colorScheme="purple" onClick={handleClose}>
              Cancel
            </Button>
            <Button className="btn-primary-solid"
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
