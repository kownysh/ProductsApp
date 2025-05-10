import { Box, Button, Container, Field, Flex, Heading, IconButton, Input, LinkOverlay, Text } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { NavLink, redirect, useNavigate } from "react-router";
import axios from "axios";
import LoggedInContext from "./LoggedInContext";
import { useMutation } from "@tanstack/react-query";
import useStore from "./GlobalStore";

function LogInForm() {

    const [password, setPassword] = useState(false)
    const navigate = useNavigate()
    const { setCurrUser, setUserID } = useContext(LoggedInContext)
    const loggedIn = useStore((state) => state.loggedIn)
    const setLoggedIn = useStore((state) => state.setLoggedIn)

    async function moveProductsToCart() {
        const items = localStorage.getItem("wishlistedproducts")
        let updatedItems = []
        for (let i = 0; i < items.length; i++) {
            if (/^[0-9]$/.test(items[i])) {
                updatedItems.push(Number(items[i]));
            }
        }

        await axios.post(`${import.meta.env.VITE_SERVER}/moveproducts`, { updatedItems }, { withCredentials: true })
        localStorage.removeItem("wishlistedproducts")
    }

    const mutation = useMutation({
        mutationFn: async ({email, password}) => {
            console.log({email, password})
            await axios.post(`${import.meta.env.VITE_SERVER}/login`, { email, password }, {
                withCredentials: true
            })
        }
    })

    async function submitLogin(e) {
        e.preventDefault()
        const email = e.target.email.value.toLowerCase()
        const password = e.target.password.value
        try {
            await mutation.mutateAsync({ email, password })
            setLoggedIn(true)
            const userDetails = await axios.post(`${import.meta.env.VITE_SERVER}/userdetails`, { email }, { withCredentials: true })
            document.cookie = "_CS-UN = ".concat(userDetails.data.userDetails["firstName"]).concat(" ").concat(userDetails.data.userDetails["lastName"])
            setCurrUser(document.cookie.slice(document.cookie.indexOf('=') + 1))
            navigate('/')
        } catch (error) {
            console.log(error)
            console.log("Unable to login")
        }
    }

    return (
        <Container paddingLeft={{ sm: 20, lg: 80 }} paddingRight={{ sm: 20, lg: 80 }} pt={25} paddingBottom={40} alignItems="center">
            <form autoComplete="off" method="POST" onSubmit={submitLogin}>
                <Flex justify="center" pt={20} pb={10}>
                    <Heading mt={5} fontWeight="extrabold" fontSize={30}>LOGIN</Heading>
                </Flex>
                <Field.Root invalid={false}>
                    <Field.Label>Email</Field.Label>
                    <Input name="email" size="sm" placeholder="Enter your email" />
                    <Field.ErrorText>This field is required</Field.ErrorText>
                </Field.Root>
                <Box marginBottom={10} marginTop={5} position="relative" height={10}>
                    <Field.Root invalid={false}>
                        <Field.Label>Password</Field.Label>
                        <Input name="password" size="sm" type={password ? "text" : "password"} placeholder="Type your password" />
                        <Field.ErrorText>This field is required</Field.ErrorText>
                    </Field.Root>
                    <IconButton onClick={() => setPassword(!password)} size="sm" position="absolute" variant="ghost" right={0} top="65%">
                        {password ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                    </IconButton>
                </Box>
                <Flex justify="center" flexDir="column">
                    <Button textDecoration="underline" pb={8} variant="plain">Forgot your password?</Button>
                    <Button type="submit" alignSelf="center" maxW="20" bgColor="blackAlpha.300" variant="subtle">Log In</Button>
                    <Button as={NavLink} to="/signup" size={20} pt={8} variant="plain">
                        <Text fontWeight="bold">Create Account</Text>
                    </Button>
                </Flex>
            </form>

        </Container>
    )
}

export default LogInForm;