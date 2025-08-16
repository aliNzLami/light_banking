import kawakaari from "@/assets/icons/background.jpeg";

function ProfileRightSide({userInfo}: { userInfo: Object }) {
    return (
        <div className="flex flex-col pb-8">
            <div className="h-[120px] w-full bg-cover bg-no-repeat overflow-hidden">
                <img src={kawakaari.src} alt="kawakaari" />
            </div>

            <div className="relative flex px-6 max-xl:justify-center">
                <div className="flex justify-center items-center absolute -top-8 size-24 rounded-full bg-gray-100 border-8 border-white p-2 shadow-lg">
                    <span className="text-5xl font-bold blueText">
                        {userInfo?.name[0]??""}
                    </span>
                </div>
                <div className="flex flex-col pt-24">
                    <span className="text-24 font-semibold text-gray-900 txt-darkMode">
                        {userInfo?.name??""}
                    </span>
                    <p className="text-16 font-normal text-gray-600 txt-darkMode">
                        {userInfo?.email??""}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ProfileRightSide