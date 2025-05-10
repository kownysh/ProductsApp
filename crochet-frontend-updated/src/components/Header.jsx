import { Avatar, Button, CloseButton, Container, Drawer, Flex, Grid, GridItem, Group, Heading, HStack, Icon, IconButton, Portal, Spacer, StackSeparator, Text, useDisclosure, VStack } from "@chakra-ui/react"
import { useContext, useState } from "react";
import { HiHeart } from 'react-icons/hi'
import { RxHamburgerMenu } from "react-icons/rx";
import { TfiShoppingCart } from "react-icons/tfi";
import MobileHeader from "./MobileHeader";
import { NavLink } from "react-router";
import { RiHeart2Line } from "react-icons/ri";
import useStore from "./GlobalStore";

const Header = () => {

    const headerValues = [
        { value: "Home", route: '/' },
        { value: "Shop", route: "/products" },
        { value: "About", route: "/" },
        { value: "Contact", route: "/" }
    ]

    const currUser = useStore((state) => state.currUser)
    const loggedIn = useStore((state) => state.loggedIn)

    return (
        <div>
            <Container fluid w="100%" height={20} shadow="lg" alignContent="center" position="fixed" backgroundColor="white" zIndex={1} mb={30}>
                <Flex justify="space-between" align="center" wrap="nowrap" w="100%">
                    <Group>
                        <Icon size="lg">
                            <HiHeart />
                        </Icon>
                        <Heading textWrap="nowrap">Charm School Co.</Heading>
                    </Group>
                    <div>
                        <Flex gap={3} hideBelow="md">
                            {headerValues.map(
                                (val, idx) => <Button as={NavLink} to={val.route} key={idx} variant={"ghost"}>
                                    <Text fontSize={16} fontWeight="light">
                                        {val.value}
                                    </Text>
                                </Button>
                            )}
                        </Flex>
                    </div>
                    <div>
                        <Flex justify="flex-end" hideBelow="md">
                            <Avatar.Root as={loggedIn ? null : NavLink} to={'/login'} variant={"subtle"}>
                                <Avatar.Fallback name={loggedIn ? currUser : ""} />
                            </Avatar.Root>
                            <IconButton as={NavLink} to='/wishlist' variant="plain">
                                <RiHeart2Line />
                            </IconButton>
                            <IconButton variant="plain">
                                <TfiShoppingCart />
                            </IconButton>
                        </Flex>
                    </div>

                    <MobileHeader headerValues={headerValues} />

                </Flex>
            </Container>
        </div>
    )
}

export default Header;