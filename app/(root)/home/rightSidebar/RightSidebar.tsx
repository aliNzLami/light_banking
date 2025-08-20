
'use client'

// components
import BanksRightSide from "./BanksRightSide";
import ProfileRightSide from "./ProfileRightSide";

function RightSidebar({userInfo, banksList}: HomeHeaderProps) {

    return (
        <aside className="hidden h-screen max-h-screen flex-col border-l border-gray-200 noBorderDarkMode xl:flex w-[355px] profileRight rightAside">
            <ProfileRightSide userInfo={userInfo} />
            <BanksRightSide banksList={banksList} />
        </aside>
    )
}

export default RightSidebar