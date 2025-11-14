import { Box, List, ListItem, Text, useToast } from "@chakra-ui/react";
import { HashLink } from "react-router-hash-link";
import { useContext, useRef, useState } from "react";
import { apiClient } from '../provider/axiosInstanceWithTokenCheck.js';
import Cookies from 'js-cookie';
import useClickOutside from "../provider/useClickOutside.js";
import { GlobalContext } from "../provider/GlobalModalContext.js";
import { Modal, ModalButton, ModalContent } from "../provider/ModalsSystem.js";
import LoginRotate from "../Register/LoginRotate.js";
import { useToken, useUserRotate } from "../provider/JwtTokenRotate.js";
import { useNavigate } from "react-router-dom";

const NavLogin = ({ setIsOpen }) => {
  const [showLogout, setShowLogout] = useState(false);
  const toast = useToast();
  const { lname, availableAccessToken, accessToken } = useUserRotate();
  const { updateToken } = useToken();
  const navigate = useNavigate();
  const onLogout = async (e) => {
    if (accessToken) {
      try {
        let result = await apiClient.post(`${import.meta.env.VITE_BE_API_URL}/logout/logout`);
        if (result.status === 200) {
          localStorage.removeItem("accessToken");
          Cookies.remove('X-CSRF-Token');
          toast({ title: "Logged Out Successfully", status: "success", duration: 2000 });
          setTimeout(() => {
            navigate("/")
            updateToken()
          }, 2000);
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          localStorage.removeItem("accessToken");
          Cookies.remove('X-CSRF-Token');
          console.log("Unauthorized - Logged Out");
        } else if (error.response && error.response.status === 400) {
          console.log(error.response);
        } else {
          console.error("Error:", error);
        }
      }
    }
  };


  //click outside and hide relative div
  const logoutRef = useRef();

  useClickOutside([logoutRef], () => {
    setShowLogout(false)
  })
  if (availableAccessToken) {
    return (
      <Box height="auto" position="relative" ref={logoutRef} key="Login">
        <Text textStyle="StyledNav" onClick={() => setShowLogout(!showLogout)}>
          Hi {lname}
        </Text>
        <Box
          display={showLogout ? "block" : "none"}
          position="absolute"
          zIndex="100"
          backgroundColor="#fff"
          right="0"
          minWidth="150px"
          height="auto"
          border="1px solid #ccc"
          onClick={() => setShowLogout(!showLogout)}
        >
          <List>
            <ListItem onClick={() => {
              setIsOpen(false)
            }}>
              <HashLink to="/account">
                <Box textStyle="StyledNav" marginLeft="1rem"> My Page</Box>
              </HashLink>
            </ListItem>
            <ListItem onClick={() => {
              onLogout()
              setIsOpen(false)
            }}>
              <Box textStyle="StyledNav" marginLeft="1rem">Log Out</Box>
            </ListItem>
          </List>
        </Box>
      </Box>
    );
  }
  else {
    return (
      <>
        <Modal id="login">
          <ModalButton textStyle="StyledNav">
            LOGIN
          </ModalButton>
          <ModalContent>
            <LoginRotate />
          </ModalContent>
        </Modal>
      </>
    );
  }
}

export default NavLogin