'use client'

// hooks
import { redirect } from "next/navigation";
import { getLoggedInUser } from "@/lib/appwrite";
import { useEffect, useState } from "react";

// redux
import { useDispatch } from "react-redux";
import { setNewUser } from "@/lib/redux/userSlice";

// components
import LoadingPage from "@/components/LoadingPage";
import CorePanel from "@/components/CorePanel/CorePanel";


export default function RootLayout({ children }: Readonly<{children: React.ReactNode;}>) {

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  
  const checkUser = async () => {
    const user = await getLoggedInUser();
    if(user === null) {
      redirect("/login");
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
