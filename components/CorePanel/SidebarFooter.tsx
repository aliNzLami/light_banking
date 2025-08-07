'use client'

// img
import Image from "next/image"
import signOutIcon from "@/assets/icons/logout.svg"

// api
import { signOut_API } from "@/lib/actions/users.actions"

// hooks
import { useState } from "react"

// redux
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";

// components
import Modal from "../Modal"
import SubmitBtn from "../SubmitBtn"


function SidebarFooter() {

    const userInfo = useSelector((state: RootState) => state.userInfo.value);
    const [showModal, setShowModal] = useState(false);
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

      <>
        <Modal 
          isOpen={showModal}
          onClose={() => setShowModal(false)}
        >
          <div className="flex flex-col justify-center">
            <span className="text-center mt-5 mb-10 text-[20px] leading-[24px] font-semibold text-gray-700 text-b&W">
              Are you sure to logout?
            </span>
            <SubmitBtn
              isLoading={isLoading}
              onClick={handle_logout}
              buttonText="Logout"
            />
          </div>
        </Modal>

        <footer className="flex cursor-pointer items-center justify-between gap-2 py-6" onClick={() => setShowModal(true)}>
          <div className="flex size-10 items-center justify-center rounded-full bg-gray-200">
            <p className="text-xl font-bold text-gray-700">
              {userInfo?.name[0]??""}
            </p>
          </div>

          <div className="flex flex-1 flex-col justify-center text-b&w">
            <span className="text-[14px] leading-[20px] truncate font-normal text-gray-700 text-b&w font-semibold">
              {userInfo?.name??""}
            </span>
            <span className="text-[14px] leading-[20px] truncate font-normal text-gray-600 text-b&w font-normal">
              {userInfo?.email??""}
            </span>
          </div>

          <div className="relative max-xl:flex max-xl:justify-center max-xl:items-center">
            <Image 
              src={signOutIcon}
              alt="sign out"
              width={20}
              height={20}
            />
          </div>
        </footer>
      </>
    )
}

export default SidebarFooter