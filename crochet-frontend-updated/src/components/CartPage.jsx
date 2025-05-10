import { Button, Container, Flex, Heading, Image, Text, VStack, HStack, IconButton, NumberInput, Box, Grid, GridItem, Spinner, Center, Link } from "@chakra-ui/react";
import axios from "axios";
import { memo, useCallback, useContext, useEffect, useState } from "react";
import { LuMinus, LuPlus } from "react-icons/lu"
import { RiDeleteBin6Line } from "react-icons/ri";
import { EmptyState } from "@chakra-ui/react"
import { LuShoppingCart } from "react-icons/lu"
import { NavLink } from "react-router";
import { FaRegHeart } from "react-icons/fa6";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useStore from "./GlobalStore";
import { PiShoppingCartThin } from "react-icons/pi";

function WishListedProducts() {

    const [wproducts, setProducts] = useState()
    const [loading, setLoading] = useState(false)
    const queryClient = useQueryClient()

    const loggedIn = useStore((state) => state.loggedIn)
    const products= useStore((state) => state.products)

    const mutation = useMutation({
        mutationFn: async (productId) => {
            await axios.delete(`${import.meta.env.VITE_SERVER}/removeproductfromcart`, { data: productId, withCredentials: true })
        },

        onSuccess: () => {
            queryClient.invalidateQueries(["cartproducts"])
        }
    })

    async function removeProduct(productId) {
        if (loggedIn) {
            mutation.mutate({ productId })
        } 
    }

    const { isPending, data } = useQuery({
        queryKey: ["cartproducts"],
        queryFn: async () => {
            return await axios.get(`${import.meta.env.VITE_SERVER}/getcartproducts`, {
                withCredentials: true
            })
        }
    })

    if (isPending) {
        return (
            <Container pt={40} >
                <Center><Spinner size="lg" /></Center>
            </Container>
        )
    }

    if (data.data.products && data.data.products.length == 0) {
        return (
            <EmptyState.Root pt={40}>
                <EmptyState.Content>
                    <EmptyState.Indicator>
                        <PiShoppingCartThin />
                    </EmptyState.Indicator>
                    <VStack textAlign="center">
                        <EmptyState.Title>Your Cart is empty!</EmptyState.Title>
                        <EmptyState.Description>
                            Explore our <Link as={NavLink} to='/products' variant="underline">products</Link> and add items to your Cart
                        </EmptyState.Description>
                    </VStack>
                </EmptyState.Content>
            </EmptyState.Root>
        )
    }

    return (
        <Container paddingTop={40}>

            {data.data.products && data.data.products.length > 0 ? products.map((val, idx) => (
                data.data.products.find(prod => prod.productId === val.productId) &&
                <Box padding={10} borderWidth={2} mx="auto" maxW="60vw" key={idx}>
                    <Flex justify="space-between" flexDir={{ base: "column", md: "row" }} alignItems="center" gap={4}>
                        <Image height={40} width={40} src={`${import.meta.env.VITE_SERVER}${val.imagePath.replace(/\\/g, '/')}`} />
                        <VStack>
                            <Heading>{val.description}</Heading>
                            <Text>&#8377;{val.price}</Text>
                        </VStack>
                        <VStack gap={4}>
                            <NumberInput.Root defaultValue="1" min={1} max={3} unstyled spinOnPress={false}>
                                <HStack gap="2">
                                    <NumberInput.DecrementTrigger asChild>
                                        <IconButton variant="outline" size="sm">
                                            <LuMinus />
                                        </IconButton>
                                    </NumberInput.DecrementTrigger>
                                    <NumberInput.ValueText textAlign="center" fontSize="lg" minW="3ch" ></NumberInput.ValueText>
                                    <NumberInput.IncrementTrigger asChild>
                                        <IconButton variant="outline" size="sm">
                                            <LuPlus />
                                        </IconButton>
                                    </NumberInput.IncrementTrigger>
                                </HStack>
                            </NumberInput.Root>
                            <IconButton bgColor="grey" onClick={async () => await removeProduct(val.productId)}>
                                <RiDeleteBin6Line />
                            </IconButton>
                        </VStack>
                    </Flex>
                </Box>
            )) : loading && <Center><Spinner size="lg" /></Center>}

        </Container>
    )
}

export default WishListedProducts;