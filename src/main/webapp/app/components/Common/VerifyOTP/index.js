import React from "react";
import { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { toast } from 'react-toastify';
import {
  Box,
  Button,
  HStack,
  PinInput,
  PinInputField,
  Text,
} from "@chakra-ui/react";
import { Helper } from 'app/helper/Helper';
import { doc, setDoc } from "firebase/firestore";
import { db } from "app/firebase/firebase";
import { useDispatch } from "react-redux";
import { setUserInfo } from "app/shared/reducers/authentication";

function VerifyOTP(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {confirmationResult,data}=props;
  
  const [isBoxOpen, setIsBoxOpen] = useState(false);
  const [otp, setOtp] = useState('');
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    if (timeLeft <= 0) return; // Stop when it reaches zero

    const timer = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // Clear the interval when the component unmounts or when timeLeft changes
    return () => clearInterval(timer);
  }, [timeLeft]);

  
  const handleOtpChange = (value) => {
    setOtp(value);
    console.error('OTP:', value); // This will log the current OTP to the console
  };

  const handleToggleBox = () => {
    setIsBoxOpen(!isBoxOpen);
  };

  const verifyOtp = () => {
    if (confirmationResult) {
      confirmationResult.confirm(otp)
        .then((result) => {
          toast.success('User successfully signed in!');
          saveUserData({
            uid: result.user.uid,
            ...props.data,
          });
          dispatch(setUserInfo({userId:result.user.uid}));
          navigate('/admin/dashboard');
        })
        .catch((error) => {
          console.error('Error verifying OTP:', error);
          toast.error('Invalid OTP');
        });
    }
  };

  // Data save to firestore
  const saveUserData = async (saveData) => {
    // Save to Firebase Firestore (Example)
    // Import and initialize Firestore in firebase.js
    try {
      await setDoc(doc(db, "users", saveData.uid), saveData,{ merge: true });
      console.error("User data saved successfully",data);
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  };

  return (
    <>
      <Box className="toggle-box">
        <Box className="text-center">
          <h4>Verify OTP</h4>
          <small>Enter the 6-digit code we have sent to</small>
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
            +91 {data.phoneNumber}
            <BiEdit
              onClick={handleToggleBox}
              className="link"
              handleToggleBox
            />
          </label>
          <HStack mt="20px" justifyContent="center">
            <PinInput otp mask onChange={handleOtpChange}>
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
            </PinInput>
          </HStack>
        </Box>
        {timeLeft===0 ? <Box pt="30px" textAlign="center">
          <small className="d-block">Didn’t receive any code?</small>
          <Link className="link text-underline" mt="20px" to="#">
            <Text as="b" fontSize="sm">
              Resend OTP
            </Text>
          </Link>
        </Box> :
        <Box pt="30px" textAlign="center">
          <Text as="b" fontSize="sm">
            Wait for <Box as="span">{Helper.formatTime(timeLeft)}</Box>
          </Text>
        </Box>}
        <Box display="flex" mt="30px">
          <Button
            flex="1"
            className="btn-primary-solid"
            colorScheme="purple"
            px="20px"
            onClick={verifyOtp}
          >
            Verify & Proceed
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default VerifyOTP;
