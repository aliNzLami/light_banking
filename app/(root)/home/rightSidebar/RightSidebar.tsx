
import BanksRightSide from "./BanksRightSide";
import ProfileRightSide from "./ProfileRightSide";

function RightSidebar() {
    return (
        <aside className="no-scrollbar hidden h-screen max-h-screen flex-col border-l border-gray-200 xl:flex w-[355px] xl:overflow-y-scroll">
            <ProfileRightSide />
            <BanksRightSide />
        </aside>
    )
}

export default RightSidebar