import { Flex, Icon, Link, FlexProps } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { ReactText } from "react";
import { useLocation, useHistory } from "react-router-dom";

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
  routeName: string;
}

const NavItem = ({ icon, children, routeName, ...rest }: NavItemProps) => {
  const location = useLocation();
  const history = useHistory();
  return (
    <Link
      onClick={() => history.push(routeName)}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        role="group"
        cursor="pointer"
        color="black"
        margin="0"
        fontFamily="Lexend"
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: routeName === location?.pathname ? "white" : "",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

export default NavItem;
