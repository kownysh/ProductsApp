import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import ProductsList from "./ProductsList";
import { NavLink } from "react-router";
import { useEffect } from "react";
import landingBg from "../assets/landing_bg.jpg"

function LandingPageContent({ products }) {
    console.log("console log", products)
    useEffect(function () {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <Box paddingTop={14} position="relative">
                <Image height={{md: "calc(100vh)"}} marginTop={5} overflow="clip" src={landingBg} width="100%" />
                <Button as={NavLink} to='/products' _hover={{ bgColor: "#eeeee4" }} variant="outline" pos="absolute" top="70%" left="50%" transform="translate(-50%,-50%)">
                    Get me Shopping!
                </Button>
            </Box>
            <Text marginTop={8} fontSize={30} textAlign="center">OUR PRODUCTS</Text>
            <ProductsList products={products.slice(0, 8)} />
            <Flex padding={10} justify="center">
                <Button as={NavLink} to='/products' variant="surface">
                    View All Products
                </Button>
            </Flex>
        </>
    )
}

export default LandingPageContent;