// hooks
import { useState } from "react";

// img
import Image from "next/image"
import logo from "@/assets/icons/logo.jpg"

// redux
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";

// api
import { createBank_API, get_accessToken_plaid } from "@/lib/actions/users.actions";

// components
import SubmitBtn from "@/components/SubmitBtn"


function AddFirstBank() {

    const [isLoading, setIsLoading] = useState(false)
    const linkToken = useSelector((state: RootState) => state.bankInfo.linkToken);
    const userInfo = useSelector((state: RootState) => state.userInfo.value);

    const handleClick = () => {
        setIsLoading(true);
        const handler = window.Plaid.create({
            token: linkToken,
            onSuccess: async (publicToken, metadata) => {
                const response = await get_accessToken_plaid(publicToken);
                createBank({...response}, metadata.accounts, metadata.institution)
            },
            onExit: (err, metadata) => {
                console.log(err);
                console.log(metadata);
            },
        })
        handler.open();
        handler.exit();
    }

    const createBank = (tokens: object, accounts: array, institution: object) => {
        createBank_API({
            accessToken: tokens?.access_token,
            itemID: tokens?.item_id,
            userID: userInfo.$id,
            userName: userInfo.name,
            accountsList: JSON.stringify(accounts),
            bankData: JSON.stringify(institution)
        })
        .then(res => {
            window.location.reload();
        })
        .catch(err => {
            setIsLoading(false);
        })
    }

    return (
        <section className="flex-center size-full max-sm:px-6">
            <div className="flex min-h-screen w-full flex-col justify-center items-center gap-5 md:gap-8">
                <div className="shadow-lg p-30">
                <header className="flex flex-col items-center gap-5 md:gap-8 mb-10">
                    <div className="flex flex-col items-end justify-center">
                        <h1 className="fontLogo">
                            Light Banking
                        </h1>
                        <Image 
                            className="rounded shadow-md"
                            alt="One More Light Logo" 
                            src={logo.src} 
                            width={150} 
                            height={150} 
                        />
                    </div>
                </header>
                    <span className="text-[24px] leading-[30px] lg:text-[36px] lg:leading-[44px] font-semibold text-center block">
                        Add Your First Bank
                    </span>
                    <SubmitBtn
                        isLoading={isLoading}
                        onClick={handleClick}
                        buttonText={"Add"}
                    />
                </div>
            </div>
        </section>
    )
}

export default AddFirstBank