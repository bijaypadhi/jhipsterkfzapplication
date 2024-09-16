import { useState } from "react";
import { HashLink as Link } from "react-router-hash-link";
import { BiUser, BiKey} from "react-icons/bi";

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
  InputGroup,
  InputRightAddon,
  FormControl,
  FormErrorMessage,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  InputLeftElement,
  Image,
} from "@chakra-ui/react";
import VerifyOTP from "../VerifyOTP";

function Header() {
  const {
    isOpen: isModalOpen,
    onOpen: onLoginModalOpen,
    onClose: onLoginModalClose,
  } = useDisclosure();
  const [isBoxOpen, setIsBoxOpen] = useState(false);
  const handleToggleBox = () => {
    setIsBoxOpen(!isBoxOpen);
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
        <Link href="#">
          <Image
            src="/assets/images/kfz-logo.svg"
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
            {/* <Button
              ref={btnRef}
              onClick={onOpen}
              className="icon-btn-primary"
              colorScheme="teal"
            >
              <FiShoppingCart />
            </Button> */}
            <Button
              onClick={onLoginModalOpen}
              className="btn-secondary-solid"
              colorScheme="purple"
            >
              Login/Sign Up
            </Button>

            {/* login/signup modal */}

            <Modal isOpen={isModalOpen} onClose={onLoginModalClose} size="md">
              <ModalOverlay />
              <ModalContent borderRadius="14px">
                <ModalHeader>Login/Sign Up with</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Tabs isFitted position="relative">
                    <TabList>
                      <Tab _selected={{ color: "purple.700" }}>Email</Tab>
                      <Tab _selected={{ color: "purple.700" }}>Username</Tab>
                      <Tab _selected={{ color: "purple.700" }}>Sign Up</Tab>
                    </TabList>
                    <TabIndicator
                      mt="-1.5px"
                      height="2px"
                      bg="purple.500"
                      borderRadius="1px"
                    />
                    <TabPanels>
                      {/* mobile login */}
                      <TabPanel>
                        <FormControl py="30px">
                          {!isBoxOpen && (
                            <Box className="floating-label">
                              <label>Email address</label>
                              <InputGroup size="lg" className="input-group">
                                <Input
                                  type="text"
                                  placeholder="Email address"
                                />
                                <InputRightAddon className="addon-btn-wrap">
                                  <Button
                                    className="btn-primary-solid"
                                    onClick={handleToggleBox}
                                  >
                                    Get OTP
                                  </Button>
                                </InputRightAddon>
                                <FormErrorMessage>
                                  Enter 10 digit valid number!
                                </FormErrorMessage>
                              </InputGroup>
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
                                  href="#"
                                  className="link text-underline"
                                >
                                  <Text as="b">Sign Up</Text>
                                </Link>
                              </Box>
                            </Box>
                          )}
                          {isBoxOpen && <VerifyOTP />}
                        </FormControl>
                      </TabPanel>
                      {/* mobile login end*/}

                      {/* username */}
                      <TabPanel>
                        <FormControl py="30px">
                          <Box className="floating-label">
                            <label>Username</label>
                            <InputGroup>
                              <InputLeftElement
                                pointerEvents="none"
                                className="input-icon"
                              >
                                <BiUser color="gray.300" />
                              </InputLeftElement>
                              <Input type="text" placeholder="Username" />
                            </InputGroup>
                          </Box>
                          <Box mt="30px" className="floating-label">
                            <label>Password</label>
                            <InputGroup>
                              <InputLeftElement
                                pointerEvents="none"
                                className="input-icon"
                              >
                                <BiKey color="gray.300" />
                              </InputLeftElement>
                              <Input type="password" placeholder="Password" />
                            </InputGroup>
                          </Box>
                          <Box display="flex" mt="40px">
                            <Button
                              flex="1"
                              className="btn-primary-solid"
                              colorScheme="purple"
                              px="20px"
                            >
                              Login
                            </Button>
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
                              href="#"
                              className="link text-underline"
                            >
                              <Text as="b">Sign Up</Text>
                            </Link>
                          </Box>
                        </FormControl>
                      </TabPanel>
                      {/* username end */}
                      {/* sign up */}
                      <TabPanel>
                        <FormControl py="20px">
                          <Box textAlign="center">
                            <button class="gsi-material-button">
                              <div class="gsi-material-button-state"></div>
                              <div class="gsi-material-button-content-wrapper">
                                <div class="gsi-material-button-icon">
                                  <img
                                    src="/assets/images/sign-in-with-google.svg"
                                    alt="Sign in with Google"
                                  />
                                </div>
                                <span class="gsi-material-button-contents">
                                  Sign in with Google
                                </span>
                                <span style={{ display: "none" }}>
                                  Sign in with Google
                                </span>
                              </div>
                            </button>
                          </Box>
                          <Box className="or-divider" h="40px">
                            <span>OR</span>
                          </Box>

                          {/* <Box className="floating-label" mt="32px">
                            <label>
                              Mobile
                            </label>
                            <InputGroup>
                              <InputLeftElement pointerEvents="none">
                                <BiPhone color="gray.300"  className="input-icon" />
                              </InputLeftElement>
                              <Input type="tel" placeholder="Mobile" />
                            </InputGroup>
                          </Box> */}
                          {!isBoxOpen && (
                            <>
                              <Box className="floating-label" mt="32px">
                                <label>Full Name</label>
                                <InputGroup>
                                  <InputLeftElement pointerEvents="none">
                                    <BiUser
                                      color="gray.300"
                                      className="input-icon"
                                    />
                                  </InputLeftElement>
                                  <Input type="text" placeholder="Full Name" />
                                </InputGroup>
                              </Box>
                              <Box className="floating-label" mt="32px">
                                <label>Email address</label>
                                <InputGroup size="lg" className="input-group">
                                  <Input
                                    type="text"
                                    placeholder="Email address"
                                  />
                                  <InputRightAddon className="addon-btn-wrap">
                                    <Button
                                      className="btn-primary-solid"
                                      onClick={handleToggleBox}
                                    >
                                      Get OTP
                                    </Button>
                                  </InputRightAddon>
                                  <FormErrorMessage>
                                    Enter 10 digit valid number!
                                  </FormErrorMessage>
                                </InputGroup>
                              </Box>
                              <Box display="flex" mt="30px">
                                <Button
                                  flex="1"
                                  className="btn-primary-solid"
                                  colorScheme="purple"
                                  px="20px"
                                >
                                  Continue
                                </Button>
                              </Box>
                            </>
                          )}
                          {isBoxOpen && (
                            <Box mt="32px">
                              <VerifyOTP />
                            </Box>
                          )}

                          <Box
                            display="flex"
                            pt="30px"
                            textAlign="center"
                            justifyContent="center"
                            gap="8px"
                          >
                            <h4> Already registered? </h4>
                            <Link
                              as="bold"
                              href="#"
                              className="link text-underline"
                            >
                              <Text as="b">Login</Text>
                            </Link>
                          </Box>
                        </FormControl>
                      </TabPanel>
                      {/* sign up end */}
                    </TabPanels>
                  </Tabs>
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
export default Header;
