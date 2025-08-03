import Menu from "./Menu";
import Image from "next/image";
import logo from "@/assets/icons/logo.jpg"

function Sidebar() {
  return (
    <div className="sidebar shadow-md">
        <nav className="flex flex-col gap-4">
            <div className="sidebar_Logo flex justify-center">
                <Image alt="One More Light Logo" src={logo.src} width={65} height={55} />
            </div>
            <Menu />
        </nav>
    </div>
  )
}

export default Sidebar