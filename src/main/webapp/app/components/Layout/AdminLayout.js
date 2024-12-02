"use client";
import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import AdminHeader from "../Common/Admin/Header";
import '../../assets/styles/admin.scss'

function AdminLayout({ children }) {
  return (
    <Box as="main">
      <Flex>
        <Box w="180px">
          <AdminHeader />
        </Box>
        <Box flex="1">
          {children}
        </Box>
      </Flex>
    </Box>
  );
}
export default AdminLayout;
