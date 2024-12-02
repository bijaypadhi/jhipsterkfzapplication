import React, { useReducer, useRef, useEffect, useState } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import { BiUser, BiKey } from 'react-icons/bi';
import { FaEyeSlash, FaEye } from "react-icons/fa";
import {
  Box,
  ListItem,
  UnorderedList,
  Button,
  Input,
  useDisclosure,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  TabIndicator,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Image,
  PortalManager,
  FormControl,         // Import FormControl
  InputGroup,          // Import InputGroup
  InputLeftElement,    // Import InputLeftElement
  InputRightAddon,     // Import InputRightAddon
  FormErrorMessage,    // Import FormErrorMessage
  Text,                 // Import Text
  InputRightElement,
  Select
} from '@chakra-ui/react';
import VerifyOTP from '../VerifyOTP';
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword, RecaptchaVerifier, sendEmailVerification, signInWithEmailAndPassword, signInWithPhoneNumber, signInWithPopup, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Helper } from 'app/helper/Helper';
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth, db } from 'app/firebase/firebase';
import { collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";

// Define the initial state
const initialState = {
  isBoxOpen: false, // To toggle OTP box
};

// Define the reducer function
function reducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_BOX':
      return {
        ...state,
        isBoxOpen: !state.isBoxOpen, // Toggle the OTP box
      };
    default:
      return state;
  }
}

// Default Values
const defaultRegisterUserDetails = {
  firstName: '',
  lastName: '',
  email: '',
  countryCode: 'in',
  phoneNumber: ''
}
const defaultLoginUserDetails = {
  countryCode: 'in',
  phoneNumber: ''
}

function KFZHeader() {
  const navigate = useNavigate();
  const { isOpen: isModalOpen, onOpen: onLoginModalOpen, onClose: onLoginModalClose } = useDisclosure();
  const [state, dispatch] = useReducer(reducer, initialState);
  const buttonRef = useRef(null); // Ref for the Login/Sign Up button
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [registerUser, setRegisterUser] = useState(defaultRegisterUserDetails);
  const [loginUser, setLoginUser] = useState(defaultLoginUserDetails);
  const [fieldError, setFieldError] = useState({});
  const [isSignUp, setIsSignUp] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [otpSent, setOtpSent] = useState('');
  const [disableButton,setDisableButton]=useState(false);

  // Effect to calculate modal position
  useEffect(() => {
    if (isModalOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();

      // Check if window is defined
      if (typeof window !== 'undefined') {
        const newModalPosition = {
          top: rect.bottom + window.scrollY,
          left: rect.left + window.scrollX,
        };
        setModalPosition(newModalPosition);
      }
    }
  }, [isModalOpen]); // Runs when isModalOpen changes

  // Toggle box handler
  // const handleToggleBox = () => {
  //   dispatch({ type: 'TOGGLE_BOX' });
  // };

  // Open modal handler
  const handleOpenModal = () => {
    if (!isModalOpen) {
      onLoginModalOpen();
    } else {
      onLoginModalClose();
    }
  };

  // validation function
  const validate = () => {
    const errorMessage = {};
    let result = true;
    if (isSignUp) {
      if (Helper.isUndefined(registerUser.firstName)) {
        errorMessage.firstName = 'Please enter the first name';
        result = false;
      } else if (!Helper.checkAlphabeticOnly(registerUser.firstName)) {
        errorMessage.firstName = 'Please enter character only';
        result = false;
      }
      if (Helper.isUndefined(registerUser.lastName)) {
        errorMessage.lastName = 'Please enter the Last Name';
        result = false;
      } else if (!Helper.checkAlphabeticOnly(registerUser.lastName)) {
        errorMessage.lastName = 'Please enter character only';
        result = false;
      }
      if (Helper.isUndefined(registerUser.email)) {
        errorMessage.email = 'Please enter the email';
        result = false;
      } else if (!Helper.checkIsValidEmail(registerUser.email)) {
        errorMessage.email = 'Please enter valid email';
        result = false;
      }

      if (Helper.isUndefined(registerUser.phoneNumber)) {
        errorMessage.phoneNumber = 'Please enter the phone number';
        result = false;
      } else if (!Helper.checkIsValidPhone(registerUser.phoneNumber, registerUser.countryCodes)) {
        errorMessage.phoneNumber = 'Please enter valid phone number';
        result = false;
      }
    } else {
      if (Helper.isUndefined(loginUser.phoneNumber)) {
        errorMessage.loginPhoneNumber = 'Please enter the phone number';
        result = false;
      } else if (!Helper.checkIsValidPhone(loginUser.phoneNumber, loginUser.countryCode)) {
        errorMessage.loginPhoneNumber = 'Please enter valid phone number';
        result = false;
      }
    }

    setFieldError(errorMessage);
    return result;
  };

  // reset function
  const resetLoginRegistrationHandler = () => {
    setLoginUser(defaultLoginUserDetails);
    setRegisterUser(defaultRegisterUserDetails);
    setFieldError({});
    setDisableButton(false);
    setIsSignUp(false);
  }

  // modal close handler
  const modalCloseHandler=()=>{
    resetLoginRegistrationHandler();
    onLoginModalClose();
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterUser({ ...registerUser, [name]: value });
  };

  // Register new user
  const handleRegisterUser = async () => {
    if (validate()) {
      try {
        // Check if the user already exists 
        const userQuery = query(collection(db, 'users'), where('phoneNumber', '==', registerUser.phoneNumber));
        const userSnapshot = await getDocs(userQuery);
        console.error(userSnapshot)
        if (!userSnapshot.empty) {
          toast.error('User already exists with this phone number. Please log in instead.');
        } else {
          setDisableButton(true);
          const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {});
          signInWithPhoneNumber(auth, registerUser.phoneNumber, recaptcha)
            .then((response) => {
              dispatch({ type: 'TOGGLE_BOX' });
              setConfirmationResult(response);
              toast.success("OTP sent successfully!");
            })
            .catch((error) => {
              console.error("Error during OTP send:", error);
              toast.error("Failed to send OTP. Check console for details.");
            });
        }
      } catch (error) {
        toast.error("Validation failed. Please check your inputs.");
      }
    };
  }

  const handleLoginUserWithPhoneNumber = async () => {
    if (validate()) {
      try {
        // Check if the user already exists 
        const userQuery = query(collection(db, 'users'), where('phoneNumber', '==', loginUser.phoneNumber));
        const userSnapshot = await getDocs(userQuery);
        console.error(userSnapshot)
        if (userSnapshot.empty) {
          toast.error('User does not exist, please create an account.');
        } else {
          setDisableButton(true);
          const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {});
          signInWithPhoneNumber(auth, loginUser.phoneNumber, recaptcha)
            .then((response) => {
              setConfirmationResult(response);
              setOtpSent('loginOTP');
              dispatch({ type: 'TOGGLE_BOX' });
              toast.success("OTP sent successfully!");
            })
            .catch((error) => {
              console.error("Error during OTP send:", error);
              toast.error("Failed to send OTP. Check console for details.");
            });
        }
      } catch (error) {
        toast.error("Validation failed. Please check your inputs.");
      }
    };
  };

  return (
    <>
      <Box
        as="header"
        display="flex"
        width="100%"
        alignItems="center"
        justifyContent="space-between"
        className="header"
      >
        <Link to="#">
          <Image
            src="content/images/kfz-logo.svg"
            alt="Kids Fun Zone Logo"
            h="50px"
          />
        </Link>
        <Box
          as="nav"
          className="user-actions"
          flexGrow="1"
          display="flex"
          justifyContent="end"
          gap="50px"
        >
          <UnorderedList
            className="no-list-style"
            display="flex"
            gap="30px"
            m="0"
          >
            <ListItem>
              <Link to="#aboutSection">About KFZ</Link>
            </ListItem>
            <ListItem>
              <Link to="#bookStore">Write a Book</Link>
            </ListItem>
            <ListItem>
              <Link to="#sketchYourIdeas">Sketch Your Ideas</Link>
            </ListItem>
            <ListItem>
              <Link to="#freeBooks">Free Books</Link>
            </ListItem>
          </UnorderedList>
          <Box display="flex" alignItems="center" gap="20px">

            <Button
              onClick={onLoginModalOpen}
              className="btn-secondary-solid"
              colorScheme="purple"
            >
              Login/Sign Up
            </Button>
            {/* login/signup modal */}
            <Modal isOpen={isModalOpen} onClose={modalCloseHandler} size="md">
              <ModalOverlay />
              <ModalContent borderRadius="14px">
                <ModalHeader>Login/Sign Up with</ModalHeader>
                <ModalCloseButton onClick={modalCloseHandler} />
                <ModalBody>
                  <FormControl py="30px">
                    {!isSignUp ? !state.isBoxOpen && (
                      <>
                        <Box className="floating-label">
                          <label>Phone Number</label>
                          <Box position="relative">
                            <PhoneInput
                              country={"in"} // Default country
                              value={loginUser.phoneNumber}
                              countryCodeEditable={false}
                              onChange={(phone, country) => { setLoginUser({ phoneNumber: `+${phone}`, countryCode: country.countryCode }) }}
                            />
                          </Box>
                          <Text className="error-message" >
                            {fieldError.loginPhoneNumber}
                          </Text>
                          <Box>
                            <div style={{ marginTop: "10px" }} id="recaptcha"></div>
                          </Box>
                          <Box display="flex" mt="30px">
                            <Button
                              flex="1"
                              className="btn-primary-solid"
                              colorScheme="purple"
                              px="20px"
                              isDisabled={disableButton}
                              onClick={() => { handleLoginUserWithPhoneNumber() }}
                            >
                              Get OTP
                            </Button>
                          </Box>
                        </Box>
                        <Box
                          display="flex"
                          pt="30px"
                          textAlign="center"
                          justifyContent="center"
                          gap="8px"
                        >
                          <h4>Not registered yet?</h4>
                          <Link
                            as="bold"
                            to="#"
                            onClick={() => { setIsSignUp(true); }}
                            className="link text-underline"
                          >
                            <Text as="b">Sign Up</Text>
                          </Link>
                        </Box>
                      </>
                    ) : (
                      <>
                        <Box className="floating-label">
                          <label>First Name</label>
                          <InputGroup>
                            <InputLeftElement pointerEvents="none" className="input-icon">
                              <BiUser
                                color="gray.300"
                                className="input-icon"
                              />
                            </InputLeftElement>
                            <Input type="text" placeholder="First Name"
                              name="firstName" value={registerUser.firstName}
                              onChange={handleChange} />
                          </InputGroup>
                          <Text className="error-message">
                            {fieldError.firstName}
                          </Text>
                        </Box>
                        <Box className="floating-label" mt="32px">
                          <label>Last Name</label>
                          <InputGroup>
                            <InputLeftElement
                              pointerEvents="none"
                              className="input-icon"
                            >
                              <BiUser color="gray.300" />
                            </InputLeftElement>
                            <Input type="text" placeholder="Last Name"
                              name="lastName" value={registerUser.lastName}
                              onChange={handleChange} />
                          </InputGroup>
                          <Text className="error-message">
                            {fieldError.lastName}
                          </Text>
                        </Box>
                        <Box className="floating-label" mt="32px">
                          <label>Email</label>
                          <InputGroup>
                            <InputLeftElement
                              pointerEvents="none"
                              className="input-icon"
                            >
                              <BiUser color="gray.300" />
                            </InputLeftElement>
                            <Input type="email" placeholder="Email"
                              name="email" value={registerUser.email}
                              onChange={handleChange} />
                          </InputGroup>
                          <Text className="error-message">
                            {fieldError.email}
                          </Text>
                        </Box>
                        <Box className="floating-label" mt="32px">
                          <label>Phone Number</label>
                          <Box position="relative">
                            <PhoneInput
                              country={"in"} // Default country
                              placeholder="Enter the phone number"
                              name="phoneNumber"
                              countryCodeEditable={false}
                              value={registerUser.phoneNumber}
                              onChange={(phone, country) => { setRegisterUser({ ...registerUser, phoneNumber: `+${phone}`, countryCode: country.countryCode }) }}
                            />
                          </Box>
                          <Text className="error-message">
                            {fieldError.phoneNumber}
                          </Text>
                        </Box>
                        <Box>
                          <div style={{ marginTop: "10px" }} id="recaptcha"></div>
                        </Box>
                        <Box display="flex" mt="30px">
                          <Button
                            flex="1"
                            className="btn-primary-solid"
                            colorScheme="purple"
                            px="20px"
                            isDisabled={disableButton}
                            onClick={() => { handleRegisterUser() }}
                          >
                            Get OTP
                          </Button>
                        </Box>
                        <Box
                          display="flex"
                          pt="30px"
                          textAlign="center"
                          justifyContent="center"
                          gap="8px"
                        >
                          <h4>Already have an account?</h4>
                          <Link
                            as="bold"
                            to="#"
                            onClick={() => { setIsSignUp(false) }}
                            className="link text-underline"
                          >
                            <Text as="b">Login</Text>
                          </Link>
                        </Box>
                      </>
                    )}

                    {state.isBoxOpen ? <VerifyOTP data={otpSent === 'loginOTP' ? loginUser : registerUser}
                      confirmationResult={confirmationResult} /> : null}
                  </FormControl>
                  {/* mobile login end*/}

                </ModalBody>
              </ModalContent>
            </Modal>
            {/* login/signup modal end*/}
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default KFZHeader;
