
'use client'

// components
import BanksRightSide from "./BanksRightSide";
import ProfileRightSide from "./ProfileRightSide";

function RightSidebar({userInfo, banksList}: HomeHeaderProps) {

    return (
        <aside className="hidden h-screen max-h-screen flex-col border-l border-gray-200 noBorderDarkMode xl:flex w-[355px] profileRight">
            <ProfileRightSide userInfo={userInfo} />
            <BanksRightSide banksList={banksList} userInfo={userInfo} />
        </aside>
    )
}

export default RightSidebar