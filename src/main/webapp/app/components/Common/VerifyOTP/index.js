import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";

import {
  Box,
  Button,
  HStack,
  PinInput,
  PinInputField,
  Text,
} from "@chakra-ui/react";

function VerifyOTP() {
  const [isBoxOpen, setIsBoxOpen] = useState(false);

  const handleToggleBox = () => {
    setIsBoxOpen(!isBoxOpen);
  };
  return (
    <>
      <Box className="toggle-box">
        <Box className="text-center">
          <h4>Verify OTP</h4>
          <small>Enter the 4-digit code we have sent to</small>
          <label
            style={{
              display: "flex",
              paddingBottom: "0",
              fontSize: "13px",
              marginTop: "5px",
              alignItems: "center",
              gap: "5px",
              justifyContent: "center",
            }}
          >
            +91 9876543210
            <BiEdit
              onClick={handleToggleBox}
              className="link"
              handleToggleBox
            />
          </label>
          <HStack mt="20px" justifyContent="center">
            <PinInput otp mask>
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
            </PinInput>
          </HStack>
        </Box>
        <Box pt="30px" textAlign="center">
          <small className="d-block">Didn’t receive any code?</small>
          <Link className="link text-underline" mt="20px">
            <Text as="b" fontSize="sm">
              Resend OTP
            </Text>
          </Link>
        </Box>
        <Box pt="30px" textAlign="center">
          <Text as="b" fontSize="sm">
            Wait for <Box as="span">00:59</Box>
          </Text>
        </Box>
        <Box display="flex" mt="30px">
          <Button
            flex="1"
            className="btn-primary-solid"
            colorScheme="purple"
            px="20px"
          >
            Verify & Proceed
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default VerifyOTP;
