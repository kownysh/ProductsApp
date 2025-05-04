import axios from 'axios'
import { useContext, useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { Box, Container, Flex, SimpleGrid, Text, useConst } from '@chakra-ui/react';
import LoggedInContext from './LoggedInContext';

function ProductsList({ products }) {

    const [wishlistedProds, setWishListedProds] = useState([])
    const { loggedIn } = useContext(LoggedInContext)

    useEffect(function () {
        if (loggedIn) {
            async function getProducts() {
                let wishlistedProducts = await axios.get(`${import.meta.env.VITE_SERVER}/user/getwishlistedproducts`, {
                    withCredentials: true
                })
                const productIDs = wishlistedProducts.data.wishlistedProducts.map(val => val.productId)
                setWishListedProds(productIDs)
            }
            getProducts()

            return function () {
                setWishListedProds()
            }
        } else {
            const items = localStorage.getItem("wishlistedproducts")
            const itemsList = []
            if (items) {
                for (let i = 0; i < items.length; i++) {
                    if (/^[0-9]$/.test(items[i])) {
                        itemsList.push(Number(items[i]))
                    }
                }

                setWishListedProds(itemsList)
            }

            return function () {
                setWishListedProds([])
            }
        }

    }, [])

    return (
        <Box maxW="1368px" alignSelf="center" padding={5}>
            <SimpleGrid pt={10} justifyItems="center" columns={[2, 2, 3, 3, 4]} gap={{ base: 5, md: 8 }}>
                {wishlistedProds && products &&
                    products.map(val => <ProductCard key={val.productId} id={val.productId} src={`${import.meta.env.VITE_SERVER}${val.imagePath.replace(/\\/g, '/')}`} title={val.description} price={val.price}
                        color={wishlistedProds.includes(val.productId)}
                    />)}
            </SimpleGrid>
        </Box>
    )
}

export default ProductsList;