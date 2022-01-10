import React from "react";

import {
  Box,
  CloseButton,
  Flex,
  useColorModeValue,
  Text,
  BoxProps,
  Img,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

import NavItem from "./NavItem";

import Logo from "../../assets/logo.png";

import { IconType } from "react-icons";

import { FiUser, FiTrendingUp, FiCreditCard } from "react-icons/fi";

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

interface LinkItemProps {
  name: string;
  icon: IconType;
  routeName: string;
}

const LinkItems: Array<LinkItemProps> = [
  { name: "Usuários", icon: FiUser, routeName: "/users" },
  { name: "Cartões", icon: FiCreditCard, routeName: "/cards" },
  { name: "Auditorias", icon: FiTrendingUp, routeName: "/audits" },
];

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const location = useLocation();
  return (
    <Box
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex
        h="120"
        alignItems="center"
        mx="8"
        justifyContent="space-between"
        direction="column"
      >
        <Img width="100px" height="100px" marginBottom="-15px" src={Logo} />
        <Text
          color="black"
          fontSize="18"
          fontFamily="Lexend"
          fontWeight="bold"
          marginBottom="10px"
        >
          Rocha incrível
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem
          routeName={link.routeName}
          key={link.name}
          icon={link.icon}
          background={
            link.routeName === location?.pathname
              ? "var(--chakra-colors-purple-500)"
              : ""
          }
          color={link.routeName === location?.pathname ? "white" : ""}
          _hover={{
            bg:
              link.routeName === location?.pathname
                ? "var(--chakra-colors-purple-500)"
                : "",
            color:
              link.routeName === location?.pathname
                ? "white"
                : "var(--chakra-colors-purple-500)",
          }}
        >
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

export default SidebarContent;
