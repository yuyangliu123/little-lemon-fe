import { Box, HStack, Image, Text} from "@chakra-ui/react";
import { HashLink } from "react-router-hash-link";

import NavCart from "./NavCart.js";
import NavLike from "./NavLike.js";
import NavLogin from "./NavLogin.js";
import NavReserve from "./NavReserve.js";
import { backToTop } from "../provider/backToTop.js";
import SubFooterContainer from "../Home/SubFooterContainer.js";
import navConfig from "./config/navConfig.js";
//If two queries have the same query name and variables, Apollo will treat them as the same query and only make one network request. 
//Then, when the result of one of the queries returns, Apollo will pass the result to all components using that query. 
//For example, the following two queries:


// This can cause query merging or query interference, which means that when querying CART_ITEM_QUERY, 
// it may also return the result of CART_QUERY.

const Nav2 = () => {
  const navElement = [
    {
      name: "HOME",
      href: "/#top",
    },
    {
      name: "ABOUT",
      href: "/#about",
    },
    {
      name: "MENU",
      href: "/#menu",
    },
  ];
  const orderElement = [
    {
      name: "ORDER\u00A0ONLINE",
      href: "/order2",
    },
  ];


  return (
    <Box
      width="100%"
      display={{ base: "none", [navConfig.showNavSize]: "block" }}
      id="2layer"
    >
      <HStack justifyContent="space-between" id="1layer">
        <HashLink to="/#top">
          <Image src="/images/Logo.svg" />
        </HashLink>
        {navElement.map((element) => {
          {
            return (
              <HashLink to={element.href} key={element.name}>
                <Text textStyle="StyledNav">{element.name}</Text>
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
                backToTop()
              }}>
              <Text textStyle="StyledNav">{element.name}</Text>
            </HashLink>
          )
        })}
        <NavReserve />
        <NavCart />
        <NavLike />


        <NavLogin />
        <SubFooterContainer />
      </HStack>
    </Box>
  );
};

export default Nav2;
