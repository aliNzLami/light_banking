import React from 'react'

import Image from "next/image";
import modeIcon from "@/assets/icons/lightdark.png";

function DarkMode() {
    const changeMode = () => {
        document.body.classList.toggle("darkMode")
    }

    return (
        <div className="changeMode" onClick={changeMode}>
            <Image
            src={modeIcon.src}
            alt="light and dark mode"
            width="40"
            height="40"
            />
        </div>
    )
}

export default DarkMode