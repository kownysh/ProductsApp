import { Container, Flex, Heading, Text } from "@chakra-ui/react";

export default function AboutUs() {
    return (
        <Container mx="auto" pt={40}>
            <Flex pb={6} justify="center">
                <Heading alignSelf="center">ABOUT US</Heading>
            </Flex>
            <Heading pb={2} size="md">Welcome to our cozy corner of the internet, where handmade meets heart.</Heading>
            <Text>
                
                We are an eCommerce platform passionate about bringing the charm of crochet into your everyday life. Every item in our shop is handcrafted with love by skilled artisans who pour care and creativity into every stitch. From soft baby booties to stylish bags, home décor, cozy wearables, and custom gifts—our collection celebrates the timeless beauty of crochet in all its forms.

                We believe that handmade products carry a special kind of warmth and uniqueness that mass-produced goods simply can't match. That’s why we work with independent crafters and small-batch makers to ensure each piece is as special as the person receiving it.

                Whether you're shopping for a thoughtful gift, adding a personal touch to your space, or indulging in something cozy for yourself, our platform makes it easy to find high-quality, handcrafted crochet pieces. With secure checkout, nationwide shipping, and exceptional customer support, we’re here to make your shopping experience as warm and personal as the products we sell.

                Join our growing community of crochet lovers and experience the joy of handmade—one stitch at a time.
            </Text>
        </Container>
    )
}