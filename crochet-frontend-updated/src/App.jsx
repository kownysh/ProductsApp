import Header from './components/Header';
import Footer from './components/Footer';
import { Flex } from "@chakra-ui/react";
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AllProducts from './components/AllProducts';
import axios from 'axios';
import { useState, useEffect } from 'react';
import LandingPageContent from './components/LandingPageContent';
import LogInForm from './components/LogInForm';
import SignUpForm from './components/SignUpForm';
import LoggedInContext from './components/LoggedInContext';
import WishListedProducts from './components/WishListedProducts';
import AdminUploadImage from './components/AdminUploadImage';

function App() {
  const [products, setProducts] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [currUser, setCurrUser] = useState("");
  const [userID, setUserID] = useState()
  const [wishListedProducts, setWishListedProducts] = useState([])

  useEffect(() => {
    async function getProducts() {
      const newValues = await axios.get(`${import.meta.env.VITE_SERVER}/getproducts`);
      setProducts(newValues.data.products);
      setFilteredProducts(newValues.data.products);
    }

    if (document.cookie.includes('_CS-UN')) {
      setLoggedIn(true);
      setCurrUser(document.cookie.slice(document.cookie.indexOf('=') + 1))
    }

    getProducts();
  }, []);

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
            </Routes>
          </Flex>

          <Footer />
        </Flex>
      </LoggedInContext.Provider>
    </BrowserRouter>
  );
}

export default App;
