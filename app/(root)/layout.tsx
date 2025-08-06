'use client'
import CorePanel from "@/components/CorePanel/CorePanel";
import { redirect } from "next/navigation";
import { getLoggedInUser } from "@/lib/appwrite";
import { useEffect, useState } from "react";
import LoadingPage from "@/components/LoadingPage";

import { UseSelector, useDispatch, useSelector } from "react-redux";
import { setNewUser } from "@/lib/redux/userSlice";

export default function RootLayout({ children }: Readonly<{children: React.ReactNode;}>) {

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  
  const checkUser = async () => {
    const user = await getLoggedInUser();
    if(user === null) {
      redirect("/sign-up");
    }
    else {
      dispatch(setNewUser(user));
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
            <CorePanel />
            <div className="custom_container">
              { children }
            </div>
          </>
        }
    </main>
  );
}
