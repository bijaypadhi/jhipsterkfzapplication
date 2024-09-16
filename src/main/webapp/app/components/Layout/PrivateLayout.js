"use client";
import Footer from "../Common/Footer/Footer";
import { Box } from "@chakra-ui/react";

function PrivateLayout({ children }) {
  return (
    <Box>      
      {children}
      <Footer />
    </Box>
  );
}

export default PrivateLayout;
