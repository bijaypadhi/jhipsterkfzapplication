import React, { useEffect, useRef, useState } from "react";
import { Box, Flex, GridItem, Image, Input, InputGroup, InputLeftElement, Text } from "@chakra-ui/react";
import HTMLFlipBook from "react-pageflip";
import { Button } from "@chakra-ui/react";
import AdminLayout from "app/components/Layout/AdminLayout";
import "../style.scss";
import { BiUser } from "react-icons/bi";
import { FaCameraRetro } from "react-icons/fa";
import PhoneInput from "react-phone-input-2";
import { useSelector } from "react-redux";
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { db } from "app/firebase/firebase";
import { Helper } from "app/helper/Helper";
import Loading from "app/components/loading/Loading";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";
const defaultUserInfo = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  profilePhoto: "content/images/dummy-pic.jpeg",
  countryCode: ""
}
function Profile() {
  const [userData, setUserData] = useState(defaultUserInfo);
  const [fieldError, setFieldError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const userId = useSelector((state) => state.authentication.userInfo.userId);
  const storage = getStorage();
  console.error(userId)
  // validation function
  const validate = () => {
    const errorMessage = {};
    let result = true;
    if (Helper.isUndefined(userData.firstName)) {
      errorMessage.firstName = 'Please enter the first name';
      result = false;
    } else if (!Helper.checkAlphabeticOnly(userData.firstName)) {
      errorMessage.firstName = 'Please enter character only';
      result = false;
    }
    if (Helper.isUndefined(userData.lastName)) {
      errorMessage.lastName = 'Please enter the Last Name';
      result = false;
    } else if (!Helper.checkAlphabeticOnly(userData.lastName)) {
      errorMessage.lastName = 'Please enter character only';
      result = false;
    }

    setFieldError(errorMessage);
    return result;
  };

  // handle change registration
  const handleChange = (e) => {
    console.error('e_________________________', e)
    const { name, value, files } = e.target;

    // Handle file upload if a file is selected
    if (files && files[0]) {
      const file = files[0];
      const fileURL = URL.createObjectURL(file);
      // const storageRef = ref(storage, `profilePhotos/${userId}/${file.name}`);

      // uploadBytes(storageRef, file)
      //   .then(() => {
      //     return getDownloadURL(storageRef);
      //   })
      //   .then((fileURL) => {
      setUserData((prevData) => ({
        ...prevData,
        profilePhoto: fileURL,
      }))
      //   }));
      //   console.error("File uploaded and URL retrieved:", fileURL);
      // })
      // .catch((error) => {
      //   console.error("Error uploading file or retrieving URL:", error);
      // });
    } else {
      setUserData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    getUserData();
  }, [])
  const getUserData = async () => {
    setIsLoading(true);
    const userQuery = query(collection(db, 'users'), where('uid', '==', userId));
    const userSnapshot = await getDocs(userQuery);
    console.error(userSnapshot)
    if (!userSnapshot.empty) {
      const userInfo = userSnapshot.docs[0].data();
      setUserData({
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        email: userInfo.email,
        phoneNumber: userInfo.phoneNumber,
        countryCode: userInfo.countryCode,
        profilePhoto: userInfo.profilePhoto || "content/images/dummy-pic.jpeg"
      })
      setIsLoading(false);
    }
  }

  // Data save to firestore
  const updateUserData = () => {
    if (validate()) {
      setDoc(doc(db, "users", userId), userData, { merge: true })
        .then(() => {
          toast.success("Profile updated successfully")
        }).catch((error) => {
          console.error("Error saving user data:", error);
        })
    }
  };

  return (
    <AdminLayout>
      <div className='book-container' style={{ padding: 60 }}>
        {isLoading ?
          <div className="loading-container">
            <Loading />
          </div>
          : (<><Flex
            width={"100%"}
            gap={10}
          >
            <Box>
              <div className="profile-photo-container">
                <Image src={userData.profilePhoto || "content/images/dummy-pic.jpeg"}
                  alt="Profile" width={400} height={400} />
                <div className="camera-icon-container">
                  <FaCameraRetro className="camera-icon"
                    onClick={() => document.getElementById("fileInput").click()} />
                </div>
                <Input
                  type="file"
                  id="fileInput"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleChange} // Handle file selection
                />
              </div>
            </Box>
            <Box width={"100%"}>
              <Flex gap={10}>
                <Box className="floating-label" mt={30} width={"100%"}>
                  <label>First Name</label>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none" className="input-icon">
                      <BiUser
                        color="gray.300"
                        className="input-icon"
                      />
                    </InputLeftElement>
                    <Input type="text" placeholder="First Name"
                      name="firstName" value={userData.firstName}
                      onChange={handleChange}
                    />
                  </InputGroup>
                  <Text className="error-message">
                    {fieldError.firstName}
                  </Text>
                </Box>
                <Box className="floating-label" mt={30} width={"100%"}>
                  <label>Last Name</label>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      className="input-icon"
                    >
                      <BiUser color="gray.300" />
                    </InputLeftElement>
                    <Input type="text" placeholder="Last Name"
                      name="lastName" value={userData.lastName}
                      onChange={handleChange}
                    />
                  </InputGroup>
                  <Text className="error-message">
                    {fieldError.lastName}
                  </Text>
                </Box>
              </Flex>
              <Box className="floating-label" mt={10}>
                <label>Email</label>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    className="input-icon"
                  >
                    <BiUser color="gray.300" />
                  </InputLeftElement>
                  <Input type="email" placeholder="Email"
                    name="email" value={userData.email}
                    disabled
                  />
                </InputGroup>
              </Box>
              <Box className="floating-label" mt={10}>
                <label>Phone Number</label>
                <Box position="relative">
                  <PhoneInput
                    country={"in"}
                    placeholder="Enter the phone number"
                    name="phoneNumber"
                    countryCodeEditable={false}
                    value={userData.phoneNumber}
                    disabled
                  />
                </Box>
              </Box>
            </Box>
          </Flex>
            <Box className="profile-bottom-button">
              <Button className="btn-primary-solid"
                colorScheme="purple"
                onClick={() => { updateUserData() }} >Update Profile
              </Button>
            </Box></>)}
      </div>
    </AdminLayout >
  );
}

export default Profile;