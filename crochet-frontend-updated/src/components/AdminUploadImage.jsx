import { Button, Container, Field, Fieldset, Flex, Image, Input, InputGroup, NativeSelect, Text } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

function AdminUploadImage() {

    const [image, setImage] = useState()
    const [value, setValue] = useState("")

    async function handleSubmit(e) {
        e.preventDefault()
        const formData = new FormData()
        formData.append("image", image)
        formData.append("imageName", image.name.trim())
        formData.append("price", e.target.price.value)
        formData.append("description", e.target.description.value)
        if (!value) {
            alert("Select a valid category!")
            return
        }
        formData.append("category", value)
        await axios.post(`${import.meta.env.VITE_SERVER}/uploadimage`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        e.target.reset()
        removeImage()
        setValue("")
    }

    function handleFile(e) {
        setImage(e.target.files[0])
    }

    function removeImage() {
        setImage()
    }

    return (
        <Container mt={20} pt={10}>
            <Fieldset.Root>
                <Fieldset.Legend>Upload images</Fieldset.Legend>
                <Fieldset.Content>
                    <form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
                        <Flex gap={4} flexDirection={{ base: "column", md: "row" }} alignItems="center" borderWidth={10} padding={5}>
                            <Flex direction="column" gap={4}>
                                {!image ? (
                                    <>
                                        <Field.Root>
                                            <Field.Label>Upload Image</Field.Label>
                                            <input type="file" name="image" accept=".jpg, .jpeg, .png" onChange={handleFile} />
                                        </Field.Root>
                                    </>
                                ) : (
                                    <>
                                        <Image
                                            src={URL.createObjectURL(image)}
                                            width={200}
                                            height={200}
                                            alt="Preview"
                                        />
                                        <Button onClick={removeImage}>
                                            Remove Image
                                        </Button>
                                    </>
                                )}
                                <Button type="submit">
                                    Submit
                                </Button>

                            </Flex>
                            <Flex direction="column" gap={2} width="75%">
                                <Field.Root>
                                    <Field.Label>Price</Field.Label>
                                    <InputGroup startElement="Rs">
                                        <Input name="price" required placeholder="0.00" />
                                    </InputGroup>
                                </Field.Root>
                                <Field.Root>
                                    <Field.Label>Description</Field.Label>
                                    <Input name="description" required type="text" />
                                </Field.Root>
                                <NativeSelect.Root invalid={value ? false : true}size="sm" width="240px">
                                    <NativeSelect.Field
                                        placeholder="Select option"
                                        value={value}
                                        onChange={(e) => setValue(e.currentTarget.value)}
                                    >
                                        <option value="crochet">Crochet</option>
                                        <option value="bookmarks">Bookmarks</option>
                                        <option value="tarotcards">Tarot Cards</option>
                                        <option value="stickers">Stickers</option>
                                    </NativeSelect.Field>
                                    <NativeSelect.Indicator />
                                </NativeSelect.Root>
                            </Flex>
                        </Flex>
                    </form>
                </Fieldset.Content>
            </Fieldset.Root>
        </Container>
    )
}


export default AdminUploadImage;