"use client";

// route
import Link from "next/link";
import { usePathname } from "next/navigation";

// img
import Image from "next/image";
import home_icon from "@/assets/icons/home.svg";
import myBanks_icon from "@/assets/icons/dollar-circle.svg";
import transaction_icon from "@/assets/icons/transaction.svg";
import payment_icon from "@/assets/icons/money-send.svg";

function Menu({ onClickItem = () => {} }: {onClickItem: Function}) {
    
    const currentURL = usePathname();

    const menuItems = [
        {
          icon: home_icon,
          href: "/",
          name: "Home",
        },
        {
          icon: myBanks_icon,
          href: "/my-banks",
          name: "My Banks",
        },
        {
          icon: transaction_icon,
          href: "/transaction-history",
          name: "Transaction History",
        },
        {
          icon: payment_icon,
          href: "/payment-transfer",
          name: "Transfer Funds",
        },
      ];

    return (
        <>
            {
                menuItems.map(item => {
                    return(
                        <Link 
                            onClick={() => onClickItem()}
                            href={item.href} 
                            key={item.name}
                            className={`${currentURL === item.href ? "sidebarActive" : ""} flex gap-3 items-center p-3 2xl:p-4 rounded-lg transition-[0.3s]`}
                        >
                            <div className="relative flex align-center">
                                <Image
                                    src={item.icon}
                                    alt={item.name}
                                    className={`${currentURL === item.href ? "brightness-[3] invert-0" : ""} me-3`}
                                />
                                <p className="">
                                     { item.name }
                                </p>
                            </div>
                        </Link>
                    )
                })
            }
        </>
    )
}

export default Menu