import { Box, Flex, Portal, Select, createListCollection } from "@chakra-ui/react"
import { useContext, useEffect, useState } from "react";
import useStore from "./GlobalStore";

function ProductFilters({ products }) {
    const [value, setValue] = useState(["allproducts"])
    const [sortValue, setSortvalue] = useState(["featured"])
    const setFilteredProducts = useStore((state) => state.setFilteredProducts)

    function handleFilter(e) {
        let filteredProducts;
        setValue(e.value)

        switch (e.value.toString()) {
            case "allproducts":
                filteredProducts = [...products]
                break;

            case "crochet":
                filteredProducts = [...products].filter(product => product.category === "crochet")
                break;

            case "bookmarks":
                filteredProducts = [...products].filter(product => product.category === "bookmarks")
                break;

            case "tarotcards":
                filteredProducts = [...products].filter(product => product.category === "tarotcards")
                break;

            case "stickers":
                filteredProducts = [...products].filter(product => product.category === "stickers")
                break;
        }

        setFilteredProducts(filteredProducts)
    }

    function handleSortFilter(e) {
        let filteredProducts;
        setSortvalue(e.value)

        switch (e.value.toString()) {
            case "featured":
                filteredProducts = [...products];
                break;

            case "best-selling":
                filteredProducts = [...products]
                break;

            case "name-asc":
                filteredProducts = [...products].sort((a, b) => a.description.localeCompare(b.description));
                break;

            case "name-desc":
                filteredProducts = [...products].sort((a, b) => b.description.localeCompare(a.description));
                break;

            case "price-asc":
                filteredProducts = [...products].sort((a, b) => a.price - b.price);
                break;

            case "price-desc":
                filteredProducts = [...products].sort((a, b) => b.price - a.price);
                break;
        }


        setFilteredProducts(filteredProducts)
    }

    return (
        <Box pl={5} pr={5}>
            <Flex justify={{ base: "space-between", md: "flex-start" }} >
                <Select.Root
                    collection={filters}
                    value={value}
                    onValueChange={handleFilter}
                    pb={5}
                    width="auto"
                    pr={4}
                >
                    <Select.HiddenSelect />
                    <Flex alignItems="center">
                        <Flex justify="flex-start" flexDir={{ base: "column", md: "row" }} alignItems={{ base: "flex-start", md: 'center' }} gap={2}>
                            <Select.Label>FILTER BY</Select.Label>
                            <Select.Control width={{ base: "calc(40vw)", md: "15vw" }}>
                                <Select.Trigger>
                                    <Select.ValueText>
                                        {filters.items.find(item => item.value === value)?.label}
                                    </Select.ValueText>
                                </Select.Trigger>
                                <Select.IndicatorGroup>
                                    <Select.Indicator />
                                </Select.IndicatorGroup>
                            </Select.Control>
                        </Flex>
                    </Flex>
                    <Portal>
                        <Select.Positioner>
                            <Select.Content>
                                {filters.items.map((filter) => (
                                    <Select.Item item={filter} key={filter.value}>
                                        {filter.label}
                                        <Select.ItemIndicator />
                                    </Select.Item>
                                ))}
                            </Select.Content>
                        </Select.Positioner>
                    </Portal>
                </Select.Root>

                <Select.Root
                    collection={sortFilters}
                    value={sortValue}
                    onValueChange={handleSortFilter}
                    pb={5}
                    width="auto"
                    pr={4}
                >
                    <Select.HiddenSelect />
                    <Flex alignItems="center">
                        <Flex justify="flex-start" flexDir={{ base: "column", md: "row" }} alignItems={{ base: "flex-start", md: 'center' }} gap={2}>
                            <Select.Label>SORT BY</Select.Label>
                            <Select.Control width={{ base: "calc(40vw)", md: "15vw" }}>
                                <Select.Trigger>
                                    <Select.ValueText>
                                        {sortFilters.items.find(item => item.value === value)?.label}
                                    </Select.ValueText>
                                </Select.Trigger>
                                <Select.IndicatorGroup>
                                    <Select.Indicator />
                                </Select.IndicatorGroup>
                            </Select.Control>
                        </Flex>
                    </Flex>
                    <Portal>
                        <Select.Positioner>
                            <Select.Content>
                                {sortFilters.items.map((filter) => (
                                    <Select.Item item={filter} key={filter.value}>
                                        {filter.label}
                                        <Select.ItemIndicator />
                                    </Select.Item>
                                ))}
                            </Select.Content>
                        </Select.Positioner>
                    </Portal>
                </Select.Root>
            </Flex>
        </Box>
    )
}

const filters = createListCollection({
    items: [
        { label: "All Products", value: "allproducts" },
        { label: "Crochet", value: "crochet" },
        { label: "Bookmarks", value: "bookmarks" },
        { label: "Tarot Cards", value: "tarotcards" },
        { label: "Stickers", value: "stickers" },
    ],
})


const sortFilters = createListCollection({
    items: [
        { label: "Featured", value: "featured" },
        { label: "Best Selling", value: "best-selling" },
        { label: "A-Z", value: "name-asc" },
        { label: "Z-A", value: "name-desc" },
        { label: "Price: High to Low", value: "price-desc" },
        { label: "Price: Low to High", value: "price-asc" },
    ],
});


export default ProductFilters;