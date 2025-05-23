import { Box, Button, ButtonGroup, Card, Flex, IconButton, Image, SimpleGrid, Spinner, Text, VStack, WrapItem } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { PiHeartBold, PiSpinner } from "react-icons/pi";
import { IoMdHeart } from "react-icons/io";
import axios from 'axios'
import useStore from "./GlobalStore";

function ProductCard({ id, src, title, price, color, setShowAlert }) {

    const [heartColor, setHeartColor] = useState(color)
    const loggedIn = useStore((state) => state.loggedIn)

    useEffect(function () {
        setHeartColor(color)
    }, [color])

    async function addOrDelProduct(val) {
        if (val) {
            await axios.post(`${import.meta.env.VITE_SERVER}/user/addtowishlist`, { productId: id }, { withCredentials: true })
        } else {
            await axios.delete(`${import.meta.env.VITE_SERVER}/user/removefromwishlist`, { data: { productId: id }, withCredentials: true })
        }
    }

    async function toggleHeart() {
        if (loggedIn) {
            setHeartColor(val => {
                return !val
            })
            await addOrDelProduct(!heartColor)
        } else {
            console.log("insides")
            setShowAlert(true)
        }
        // } else {
        //     if (!heartColor) {
        //         if (!localStorage.getItem("wishlistedproducts")) {
        //             localStorage.setItem("wishlistedproducts", JSON.stringify([id]))
        //         } else {
        //             const items = localStorage.getItem("wishlistedproducts")
        //             localStorage.setItem("wishlistedproducts", JSON.stringify([...JSON.parse(items), id]))
        //         }
        //     } else {
        //         const items = localStorage.getItem("wishlistedproducts")
        //         let updatedItems = []
        //         for (let i = 0; i < items.length; i++) {
        //             if (/^[0-9]$/.test(items[i])) {
        //               items[i] != id && updatedItems.push(Number(items[i]));
        //             }
        //           }                  
        //         localStorage.setItem("wishlistedproducts", JSON.stringify(updatedItems))
        //     }
        // }
    }

    return (
        <>
            <Box w={{ base: 140, sm: 200, md: 230, lg: 280 }}>
                <Box position="relative">
                    <Image
                        src={src}
                        mx="auto"
                        alt="Pic of a dog"
                        opacity={1}
                        transition="all 0.3s ease"
                        height={{ base: 140, sm: 200, md: 230, lg: 280 }}
                        width={{ base: 140, sm: 200, md: 230, lg: 280 }}
                        objectFit="fill"
                        _hover={{ opacity: 0.8 }} />
                    <IconButton onClick={toggleHeart} bgColor="transparent" top="0px" right="2px" position="absolute" transition="all 0.2s linear" _hover={{ transform: 'scale(1.3)' }}>
                        <IoMdHeart color={heartColor ? "red" : "#DBDBD5"} />
                    </IconButton>
                </Box>
                <Text pt={1} wordBreak="break-word">{title}</Text>
                <Text fontSize={{ base: "xs", sm: "xs", md: "md" }} fontWeight="bold">Rs {price}</Text>
            </Box>
        </>
    )
}


export default ProductCard;