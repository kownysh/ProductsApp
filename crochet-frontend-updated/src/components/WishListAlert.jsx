import {
    Button,
    CloseButton,
    Dialog,
    For,
    HStack,
    Portal,
} from "@chakra-ui/react"
import { useState } from "react";

const WishListAlert = ({setShowAlert}) => {

    const [open, setOpen] = useState(true)

    return (
        <Dialog.Root
            key="center"
            placement="center"
            motionPreset="slide-in-bottom"
            open={open}
            onOpenChange={(e) => {
                setOpen(e.open)
                setShowAlert(false)
            }}
        >
            <Dialog.Trigger asChild>
                <Button variant="outline"></Button>
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>Dialog Title</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Sed do eiusmod tempor incididunt ut labore et dolore magna
                                aliqua.
                            </p>
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Dialog.ActionTrigger asChild>
                                <Button variant="outline">Cancel</Button>
                            </Dialog.ActionTrigger>
                            <Button>Save</Button>
                        </Dialog.Footer>
                        <Dialog.CloseTrigger asChild>
                            <CloseButton size="sm" />
                        </Dialog.CloseTrigger>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    )
}


export default WishListAlert;