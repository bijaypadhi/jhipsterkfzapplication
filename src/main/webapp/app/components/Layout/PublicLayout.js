"use client";
import React from 'react';
import Header from "../Common/Header/Header";
import Footer from "../Common/Footer/Footer";
import { Box } from "@chakra-ui/react";

function PublicLayout({ children }) {
  return (
    <Box>
       <Header />
      {children}
      <Footer />
    </Box>
  );
}

export default PublicLayout;
