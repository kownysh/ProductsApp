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
import LoggedInContext from './LoggedInContext';
import WishListedProducts from './WishListedProducts';
import AdminUploadImage from './AdminUploadImage';
import CartPage from './CartPage';
import { useQuery } from "@tanstack/react-query"

function AppRoutes() {

    const [products, setProducts] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [currUser, setCurrUser] = useState("");
    const [userID, setUserID] = useState()
    const [wishListedProducts, setWishListedProducts] = useState([])

    const { data } = useQuery({
        queryKey: ["allproducts"],
        queryFn: async () => {
            return await axios.get(`${import.meta.env.VITE_SERVER}/getproducts`);
        }
    })

    useEffect(() => {
        async function getProducts() {
            //const newValues = await axios.get(`${import.meta.env.VITE_SERVER}/getproducts`);

            // setProducts(newValues.data.products);
            // setFilteredProducts(newValues.data.products);
        }

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
            <LoggedInContext.Provider value={{
                loggedIn,
                setLoggedIn,
                filteredProducts,
                setFilteredProducts,
                currUser,
                setCurrUser,
                userID,
                setUserID,
                wishListedProducts,
                setWishListedProducts,
                products
            }}>
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
            </LoggedInContext.Provider>
        </BrowserRouter>
    )
}

export default AppRoutes;