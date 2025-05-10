import { Avatar, Button, CloseButton, Container, Drawer, Flex, Grid, GridItem, Group, Heading, HStack, Icon, IconButton, Portal, Spacer, StackSeparator, Text, useDisclosure, useMediaQuery, VStack } from "@chakra-ui/react"
import { useContext, useState } from "react";
import { HiHeart } from 'react-icons/hi'
import { RiHeart2Line, RiHeartFill } from "react-icons/ri";
import { RxHamburgerMenu } from "react-icons/rx";
import { TfiShoppingCart } from "react-icons/tfi";
import { NavLink } from "react-router";
import useStore from "./GlobalStore";

export default function MobileHeader({ headerValues }) {

    const [isMobile] = useMediaQuery("(max-width: 768px)")
    const currUser = useStore((state) => state.currUser)
    const loggedIn = useStore((state) => state.loggedIn)

    return (isMobile &&
        <Flex alignItems="center">
            <IconButton as={NavLink} to='/wishlist' variant="plain">
                <RiHeart2Line />
            </IconButton>
            <IconButton size="md" variant="plain">
                <TfiShoppingCart />
            </IconButton>
            <Drawer.Root size="full">
                <Drawer.Trigger asChild>
                    <IconButton hideFrom="md" size="lg" bg="gray.100" color="black">
                        <RxHamburgerMenu />
                    </IconButton>
                </Drawer.Trigger>
                <Portal>
                    <Drawer.Backdrop />
                    <Drawer.Positioner />
                    <Drawer.Content
                        position="fixed"
                        top={0}
                        left={0}
                    >
                        <Drawer.Header>
                            <Group>
                                <Icon size="md">
                                    <HiHeart />
                                </Icon>
                                <Heading>The Charm School Co.</Heading>
                            </Group>
                        </Drawer.Header>
                        <Drawer.Context>
                            {(store) => (
                                <Drawer.Body>
                                    <VStack separator={<StackSeparator />}>
                                        <Avatar.Root onClick={!loggedIn ? () => store.setOpen(false) : null} as={loggedIn ? null : NavLink} to={'/login'} variant={"subtle"}>
                                            <Avatar.Fallback name={loggedIn ? currUser : ""} />
                                        </Avatar.Root>
                                        {headerValues.map(
                                            (val, idx) => <Button onClick={() => store.setOpen(false)} as={NavLink} key={idx} variant={"ghost"} to={val.route}>{val.value}</Button>
                                        )}
                                    </VStack>
                                </Drawer.Body>
                            )}
                        </Drawer.Context>
                        <Drawer.CloseTrigger asChild>
                            <CloseButton size="md" />
                        </Drawer.CloseTrigger>
                    </Drawer.Content>
                </Portal>
            </Drawer.Root>
        </Flex>
    )
}