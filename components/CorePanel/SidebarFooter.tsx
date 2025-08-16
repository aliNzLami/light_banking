'use client'

// img
import Image from "next/image"
import signOutIcon from "@/assets/icons/logout.svg"

// hooks
import { useState } from "react"

// redux
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";


function SidebarFooter( { onClickHandler }: { onClickHandler: Function } ) {

    const userInfo = useSelector((state: RootState) => state.userInfo.value);

    return (

      <>
        <footer className="flex cursor-pointer items-center justify-between gap-2 py-6" onClick={onClickHandler}>
          <div className="flex size-10 items-center justify-center rounded-full bg-gray-200">
            <p className="text-xl font-bold text-gray-700">
              {userInfo?.name[0]??""}
            </p>
          </div>

          <div className="flex flex-1 flex-col justify-center txt-darkMode">
            <span className="text-[14px] leading-[20px] truncate font-normal text-gray-700 txt-darkMode font-semibold">
              {userInfo?.name??""}
            </span>
            <span className="text-[14px] leading-[20px] truncate font-normal text-gray-600 txt-darkMode font-normal">
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