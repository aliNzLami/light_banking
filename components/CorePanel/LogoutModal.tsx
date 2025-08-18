'use client'

// hooks
import { useState } from "react";

// api
import { signOut_API } from "@/lib/actions/users.actions"

// components
import Modal from "../Modal"
import SubmitBtn from "../SubmitBtn"

function LogoutModal({ showModal, setShowModal }: { showModal: boolean, setShowModal: any }) {

    const [isLoading, setIsLoading] = useState(false);

    const handle_logout = () => {
        setIsLoading(true);
        signOut_API()
        .then(msg => {
        window.location.reload();
        })
        .catch(err => {
        setIsLoading(false);
        })
    }

    return (
        <Modal 
            isOpen={showModal}
            onClose={() => setShowModal(false)}
        >
            <div className="flex flex-col justify-center">
            <span className="text-center mt-5 mb-10 text-[20px] leading-[24px] font-semibold text-gray-700 txt-darkMode">
                Are you sure to logout?
            </span>
            <SubmitBtn
                isLoading={isLoading}
                onClick={handle_logout}
                buttonText="Logout"
            />
            </div>
        </Modal>
    )
}

export default LogoutModal