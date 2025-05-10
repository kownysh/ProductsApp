import { create } from 'zustand'

const useStore = create((set) => ({
    products: [], loggedIn: false, filteredProducts: [], currUser: "",
    setProducts: (products) => set({products: products}),
    setLoggedIn: (isLoggedIn) => set({loggedIn: isLoggedIn}),
    setFilteredProducts: (filteredProducts) => set({filteredProducts: filteredProducts}),
    setCurrUser: (currUser) => set({currUser: currUser})
}))

export default useStore;