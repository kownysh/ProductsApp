import { Box, Button, Checkbox, CheckboxGroup, CloseButton, createListCollection, Drawer, Fieldset, Flex, For, Group, Heading, HStack, Input, Portal, Select, SimpleGrid, Slider, StackSeparator, Text, VStack } from "@chakra-ui/react";
import ProductCard from "./ProductCard";
import { useContext, useEffect, useState } from "react";
import ProductFilters from "./ProductFilters";
import LoggedInContext from "./LoggedInContext";
import ProductsList from "./ProductsList";
import useStore from "./GlobalStore";

function AllProducts({ products }) {

    useEffect(function () {
        window.scrollTo(0, 0)
    }, [])

    //const { filteredProducts } = useContext(LoggedInContext)
    const filteredProducts = useStore((state) => state.filteredProducts)

    return (
        <Flex justify="center">
            <Box 
            paddingTop={30} 
            alignItems="center">
                <Text fontSize={30} fontWeight="light" mt={20} pb={5} textAlign="center">All Products</Text>
                <ProductFilters products={products} />
                <ProductsList products={filteredProducts} />
            </Box>
        </Flex>
    )
}

export default AllProducts;