import { Button, Container, Flex, Heading, Image, Text, VStack, HStack, IconButton, NumberInput, Box, Grid, GridItem, Spinner, Center, Link } from "@chakra-ui/react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import LoggedInContext from "./LoggedInContext";
import { LuMinus, LuPlus } from "react-icons/lu"
import { RiDeleteBin6Line } from "react-icons/ri";
import { EmptyState } from "@chakra-ui/react"
import { LuShoppingCart } from "react-icons/lu"
import { NavLink } from "react-router";
import { FaRegHeart } from "react-icons/fa6";

function WishListedProducts() {

    const [wproducts, setProducts] = useState()
    const [loading, setLoading] = useState(false)

    const { loggedIn, products } = useContext(LoggedInContext)


    async function removeProduct(productId) {
        setLoading(true)

        if (loggedIn) {
            await axios.delete(`${import.meta.env.VITE_SERVER}/user/removefromwishlist`, { data: { productId: productId }, withCredentials: true })
        } else {
            const items = localStorage.getItem("wishlistedproducts")
            let updatedItems = []
            for (let i = 0; i < items.length; i++) {
                if (/^[0-9]$/.test(items[i])) {
                    items[i] != productId && updatedItems.push(Number(items[i]));
                }
            }
            localStorage.setItem("wishlistedproducts", JSON.stringify(updatedItems))
        }

        setProducts(prev => prev.filter(product => product.productId !== productId))
        setLoading(false)
    }

    useEffect(function () {
        async function getwishlistedProducts() {
            setLoading(true)
            const wishlistedProducts = await axios.get(`${import.meta.env.VITE_SERVER}/user/getwishlistedproducts`, {
                withCredentials: true
            })
            setTimeout(function () {
                setProducts(wishlistedProducts.data.wishlistedProducts)
                setLoading(false)
            }, 750)
        }

        if (loggedIn) {
            getwishlistedProducts()
        } else {
            setLoading(true)
            const items = localStorage.getItem("wishlistedproducts")
            const itemsList = []
            if (items) {
                for (let i = 0; i < items.length; i++) {
                    if (/^[0-9]$/.test(items[i])) {
                        const obj = {
                            productId: Number(items[i])
                        }
                        itemsList.push(obj)
                    }
                }

                setTimeout(function () {
                    setProducts(itemsList)
                    setLoading(false)
                }, 750)
            } else {
                setProducts([])
                setLoading(false)
            }
        }

    }, [])

    if (wproducts && wproducts.length == 0) {
        return (
            <EmptyState.Root pt={40}>
                <EmptyState.Content>
                    <EmptyState.Indicator>
                        <FaRegHeart />
                    </EmptyState.Indicator>
                    <VStack textAlign="center">
                        <EmptyState.Title>Your wishlist is empty!</EmptyState.Title>
                        <EmptyState.Description>
                            Explore our <Link as={NavLink} to='/products' variant="underline">products</Link> and add items to your Wishlist
                        </EmptyState.Description>
                    </VStack>
                </EmptyState.Content>
            </EmptyState.Root>
        )
    }

    return (
        <Container paddingTop={40}>

            {!loading && wproducts && wproducts.length > 0 ? products.map((val, idx) => (
                wproducts.find(prod => prod.productId === val.productId) &&
                <Box padding={10} borderWidth={2} mx="auto" maxW="60vw" key={idx}>
                    <Flex justify="space-between" flexDir={{base: "column", md: "row"}} alignItems="center" gap={4}>
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