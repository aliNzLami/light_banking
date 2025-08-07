'use client'

// hooks
import { redirect } from "next/navigation";
import { getLoggedInUser } from "@/lib/appwrite";
import { useEffect, useState } from "react";

// components
import LoadingPage from "@/components/LoadingPage";


export default function RootLayout({children}: Readonly<{ children: React.ReactNode;}>) {

    const [loading, setLoading] = useState(true);

    const checkUser = async () => {
      const user = await getLoggedInUser();
      if(user !== null) {
        redirect("/");
      }
      else {
        setLoading(false);
      }
    }
  
    useEffect(() => {
      checkUser();
    }, [])

    return (
      <main>
        {
          loading
          ?
            <LoadingPage />
          :
            <>
              { children }
            </>
        }
      </main>
    );
  }
  