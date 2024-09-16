"use client";
import React from 'react';
import Footer from "../Common/Footer/Footer";
import { Box } from "@chakra-ui/react";

function PublicLayout({ children }) {
  return (
    <Box>

      {children}
      <Footer />
    </Box>
  );
}

export default PublicLayout;
