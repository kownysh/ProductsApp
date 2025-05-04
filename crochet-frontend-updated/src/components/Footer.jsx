import { Flex, HStack, IconButton, Link, Text, VStack } from "@chakra-ui/react";
import { RxInstagramLogo } from "react-icons/rx";
import { FaWhatsapp } from "react-icons/fa";

function Footer() {
    return (
        <Flex bottom={0} left={0} width="100%" padding={5} mt={4} bgColor="lightgrey" justify="center">
            <VStack>
                <HStack>
                    <IconButton size="sm" bgColor="black" borderRadius={100}>
                        <RxInstagramLogo color="white" />
                    </IconButton>
                    <IconButton size="sm" bgColor="black" borderRadius={100}>
                        <FaWhatsapp color="white" />
                    </IconButton>
                </HStack>
                <Text textWrap="nowrap">&copy;2025, Charm School Co.</Text>
            </VStack>
        </Flex>
    )
}

export default Footer;