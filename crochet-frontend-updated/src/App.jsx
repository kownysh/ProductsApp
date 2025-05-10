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
import CartPage from './components/CartPage';
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query"
import AppRoutes from './components/AppRoutes';

function App() {
  const [products, setProducts] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [currUser, setCurrUser] = useState("");
  const [userID, setUserID] = useState()
  const [wishListedProducts, setWishListedProducts] = useState([])
  const queryClient = new QueryClient()

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
    <QueryClientProvider client={queryClient}>
      <AppRoutes />
    </QueryClientProvider>
  );
}

export default App;
