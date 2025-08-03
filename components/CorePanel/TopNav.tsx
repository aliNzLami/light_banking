import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/icons/logo.jpg";
import Menu from "./Menu";
import Offcanvas from "../Offcanvas";

function TopNav() {
    return (
        <div className="topNav flex justify-between align-center shadow-md">
            <Link href='./' className="cursor-pointer items-center gap-2">
                <div className="topNav_Logo">
                    <Image alt="One More Light Logo" src={logo.src} width={65} height={55} />
                </div>
            </Link>

            <Offcanvas 
                content={
                    <nav className="pt-5 flex flex-col gap-4">
                        <Menu />
                    </nav>
                }
            />
            
                        

        </div>
    )
}

export default TopNav