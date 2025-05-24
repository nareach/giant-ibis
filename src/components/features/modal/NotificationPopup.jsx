'use client'
import React, { forwardRef, useImperativeHandle } from 'react'
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
} from "@heroui/react";

const NotificationPopup = forwardRef((props, ref) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    useImperativeHandle(ref, () => ({
        openModal: () => {
            onOpen();
            if (props.onOpen) props.onOpen();
        }
    }));

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} size='2xl'>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1 text-center">
                            Notification
                        </ModalHeader>
                        <ModalBody>
                            <div className='px-3 pb-3'>
                                <ul className='list-disc'>
                                    <li>Complimentary pick up is only available for customer who stays in the listed partner hotels and guesthouses.</li>
                                    <li>Passengers must be ready and wait for pickup service bus at the lobby in their hotel or guesthouse 1 hour before departure time. Our pickup guys would talk to the hotel's receptionist, please always inform the receptionist when using our service.</li>
                                    <li>Complimentary pick up may be arranged when tickets are purchased one day in advance of departure.</li>
                                    <li>We are not responsible for any passengers who missed pickup service.</li>
                                </ul>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onPress={onClose} className='px-2'>
                                Close
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
});

export default NotificationPopup;