import Sidebar from "./Sidebar"
import TopNav from "./TopNav";

function CorePanel() {
    return (
        <div className='flex'>
            <Sidebar />
            <TopNav />
        </div>
    )
}

export default CorePanel