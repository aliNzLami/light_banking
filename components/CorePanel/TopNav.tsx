'use client'
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/icons/logo.jpg";
import Menu from "./Menu";
import Offcanvas from "../Offcanvas";
import { useState } from "react";
import SidebarFooter from "./SidebarFooter";

function TopNav() {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="topNav flex justify-between align-center shadow-md">
            <Link href='./' className="cursor-pointer items-center gap-2">
                <div className="topNav_Logo">
                    <Image alt="One More Light Logo" src={logo.src} width={65} height={55} />
                </div>
            </Link>

            <Offcanvas 
                setIsOpen={setIsOpen}
                isOpen={isOpen}
                content={
                    <div className="flex flex-col justify-between h-screen">
                        <nav className="pt-5 flex flex-col gap-4">
                            <Menu 
                                onClickItem={()=> setIsOpen(false)}
                            />
                        </nav>
                        <SidebarFooter />
                    </div>
                }
            />
            
                        

        </div>
    )
}

export default TopNav