import Header from './Header';
import Footer from './Footer';
import { Flex } from "@chakra-ui/react";
import '../App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AllProducts from './AllProducts';
import axios from 'axios';
import { useState, useEffect } from 'react';
import LandingPageContent from './LandingPageContent';
import LogInForm from './LogInForm';
import SignUpForm from './SignUpForm';
import WishListedProducts from './WishListedProducts';
import AdminUploadImage from './AdminUploadImage';
import CartPage from './CartPage';
import { useQuery } from "@tanstack/react-query"
import useStore from './GlobalStore';

function AppRoutes() {

    const products = useStore((state) => state.products)
    const setProducts = useStore((state) => state.setProducts)
    const loggedIn = useStore((state) => state.loggedIn)
    const setLoggedIn = useStore((state) => state.setLoggedIn)
    const setFilteredProducts = useStore((state) => state.setFilteredProducts)
    const setCurrUser = useStore((state) => state.setCurrUser)

    const { data } = useQuery({
        queryKey: ["allproducts"],
        queryFn: async () => {
            return await axios.get(`${import.meta.env.VITE_SERVER}/getproducts`);
        }
    })

    useEffect(() => {

        if (data) {
            setProducts(data.data.products)
            setFilteredProducts(data.data.products)
        }

        if (document.cookie.includes('_CS-UN')) {
            setLoggedIn(true);
            setCurrUser(document.cookie.slice(document.cookie.indexOf('=') + 1))
        }

    }, [data]);

    return (
        <BrowserRouter>
            <Flex direction="column" minHeight="100vh">
                <Header />

                <Flex flex="1" direction="column">
                    <Routes>
                        <Route path='/' element={<LandingPageContent products={products} />} />
                        <Route path='/products' element={<AllProducts products={products} />} />
                        <Route path='/login' element={loggedIn ? <Navigate to='/' /> : <LogInForm />} />
                        <Route path='/signup' element={loggedIn ? <Navigate to='/' /> : <SignUpForm />} />
                        <Route path='/wishlist' element={<WishListedProducts />} />
                        <Route path='/uploadimage' element={<AdminUploadImage />} />
                        <Route path='/cart' element={<CartPage />} />
                    </Routes>
                </Flex>

                <Footer />
            </Flex>
        </BrowserRouter>
    )
}

export default AppRoutes;