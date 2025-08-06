
'use client'

import BanksRightSide from "./BanksRightSide";
import ProfileRightSide from "./ProfileRightSide";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";

function RightSidebar() {

    const userInfo = useSelector((state: RootState) => state.userInfo.value);

    return (
        <aside className="no-scrollbar hidden h-screen max-h-screen flex-col border-l border-gray-200 xl:flex w-[355px] xl:overflow-y-scroll">
            <ProfileRightSide userInfo={userInfo} />
            <BanksRightSide userInfo={userInfo} />
        </aside>
    )
}

export default RightSidebar