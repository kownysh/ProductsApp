import { Box, Button, Container, Field, Flex, Heading, IconButton, Input, LinkOverlay, Text } from "@chakra-ui/react";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Navigate, NavLink, redirect, useNavigate } from "react-router";
import axios from "axios";

function SignUpForm() {

    const [password, setPassword] = useState(false)

    const formValues = {
        "firstName": false,
        "lastName": false,
        "email": false,
        "password": false
    }

    const [fieldValue, setFieldValue] = useState(formValues)
    let navigate = useNavigate()

    async function submitDetails(e) {
        e.preventDefault()
        const firstName = e.target.firstName.value
        const lastName = e.target.lastName.value
        const email = e.target.email.value
        const password = e.target.password.value

        if (!firstName || !lastName || !email || !password) {
            setFieldValue({
                firstName: !firstName ? true : false,
                lastName: !lastName ? true : false,
                email: !email ? true : false,
                password: !password ? true : false
            })
        } else {
            await axios.post(`${import.meta.env.VITE_SERVER}/signup`, {firstName, lastName, email, password})
            navigate('/login')
        }
    }

    return (
        <Container paddingLeft={{ sm: 20, lg: 80 }} paddingRight={{ sm: 20, lg: 80 }} pt={25} paddingBottom={40} alignItems="center">
            <form autoComplete="off" onSubmit={submitDetails} method="POST">
                <Flex justify="center" pt={20} pb={4}>
                    <Heading marginTop={5} fontWeight="extrabold" fontSize={30}>Create Account</Heading>
                </Flex>
                <Field.Root invalid={fieldValue["firstName"]}>
                    <Field.Label>First Name</Field.Label>
                    <Input name="firstName" size="sm" placeholder="First Name" />
                    <Field.ErrorText>This field is required</Field.ErrorText>
                </Field.Root>
                <Field.Root marginTop={5} invalid={fieldValue["lastName"]}>
                    <Field.Label>Last Name</Field.Label>
                    <Input name="lastName" size="sm" placeholder="Last Name" />
                    <Field.ErrorText>This field is required</Field.ErrorText>
                </Field.Root>
                <Field.Root marginTop={5} invalid={fieldValue["email"]}>
                    <Field.Label>Email</Field.Label>
                    <Input name="email" size="sm" placeholder="Enter your email" />
                    <Field.ErrorText>This field is required</Field.ErrorText>
                </Field.Root>
                <Box marginBottom={10} marginTop={5} position="relative" height={10}>
                    <Field.Root invalid={fieldValue["password"]}>
                        <Field.Label>Password</Field.Label>
                        <Input name="password" size="sm" type={password ? "text" : "password"} placeholder="Type your password" />
                        <Field.ErrorText>This field is required</Field.ErrorText>
                    </Field.Root>
                    <IconButton onClick={() => setPassword(!password)} size="sm" position="absolute" variant="ghost" right={0} top="65%">
                        {password ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                    </IconButton>
                </Box>
                <Flex justify="center">
                    <Button 
                    type="submit" variant="solid">
                        Create Account
                    </Button>
                </Flex>
            </form>

        </Container>
    )
}

export default SignUpForm;