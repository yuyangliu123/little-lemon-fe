import { Box,  VStack, Text } from "@chakra-ui/react";
//A solution to the problem of React Router being unable to scroll to #hash-fragments when navigating with the <Link> component.
import { HashLink } from "react-router-hash-link";
import { useUserRotate } from "../provider/JwtTokenRotate";
import NavLogin from "./NavLogin";
import NavReserve from "./NavReserve";
import { backToTop } from "../provider/backToTop";
import SubFooter from "../Home/SubFooter";

const NavItem = ({ setIsOpen }) => {
  const navElement = [
    {
      name: "HOME",
      href: "/#top"
    },
    {
      name: "ABOUT",
      href: "/#about"
    },
    {
      name: "MENU",
      href: "/#menu"
    },
  ];
  const orderElement = [
    {
      name: "ORDER\u00A0ONLINE",
      href: "/order2",
    },
  ];
  return (
    <>

      <VStack>
        {navElement.map((element) => {
          {
            return (
              <HashLink
                to={element.href}
                onClick={() => setIsOpen(false)}
              >
                <Text textStyle="StyledNav">
                  {element.name}
                </Text>
              </HashLink>
            );
          }
        })}
        {orderElement.map((element) => {
          return (
            <HashLink
              to={element.href}
              key={element.name}
              onClick={() => {
                setIsOpen(false)
                backToTop()
              }}>
              <Text textStyle="StyledNav">{element.name}</Text>
            </HashLink>
          )
        })}
        <Box onClick={() => setIsOpen(false)}>
          <NavReserve />
        </Box>
        <Box>
          <NavLogin setIsOpen={setIsOpen} />
        </Box>
        <Box>
          <SubFooter />
        </Box>
      </VStack>
    </>
  );
}

export default NavItem;

