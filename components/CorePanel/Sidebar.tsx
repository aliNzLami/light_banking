'use client'

// hooks
import { useState } from "react";

// img
import Image from "next/image";
import logo from "@/assets/icons/logo.jpg"


// components
import Menu from "./Menu";
import SidebarFooter from "./SidebarFooter";
import LogoutModal from "./LogoutModal";

function Sidebar() {
  
  const [showModal, setShowModal] = useState(false);

    return (

      <>
        <LogoutModal 
            showModal={showModal}
            setShowModal={setShowModal}
        />

        <div className="sidebar shadow-md flex flex-col justify-between">
            <nav className="flex flex-col gap-4">
                <div className="sidebar_Logo items-center justify-center">
                    <Image alt="One More Light Logo" src={logo.src} width={65} height={55} />
                    <span className="ms-3 fontLogo">
                      Light Banking
                    </span>
                </div>
                <Menu 
                  onClickItem={() => {}}
                />
            </nav>

            <SidebarFooter onClickHandler={() => setShowModal(true)} />
        </div>
      </>
    )
}

export default Sidebar