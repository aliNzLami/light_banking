'use client'

// api
import { get_linkToken_plaid, getBanks_API } from "@/lib/actions/users.actions";

// hooks
import { redirect } from "next/navigation";
import { getLoggedInUser } from "@/lib/appwrite";
import { useEffect } from "react";

// redux
import { useDispatch, useSelector } from "react-redux";
import { setNewUser } from "@/lib/redux/userSlice";
import { setBanks, setLinkToken } from "@/lib/redux/bankSlice";
import { RootState } from "@/lib/redux/store";
import { setPageLoading } from "@/lib/redux/loadingSlice";


// components
import LoadingPage from "@/components/LoadingPage";
import CorePanel from "@/components/CorePanel/CorePanel";
import AddFirstBank from "./AddFirstBank";


// Roadmap
// 1. Check User (if has account, continue, if not, goes auth)
// 2. Check Bank (if has bank, goes panel, if not, adds the first bank)
// 3. During all these checking, show loading component


export default function RootLayout({ children }: Readonly<{children: React.ReactNode;}>) {

  // ------------------------------- REDUX ------------------------------- //
  const dispatch = useDispatch();
  const banksList = useSelector((state: RootState) => state.bankInfo.banksList);
  const pageLoading = useSelector((state: RootState) => state.loadingPage);


  // ------------------------------- FUNCTIONS ------------------------------- //
  const checkUser = async () => {
    const user = await getLoggedInUser();
    if(user === null) {
      redirect("/login");
    }
    else {
      dispatch(setNewUser(user));
      checkBanks(user)
    }
  }

  const checkBanks = async (user: object) => {
    await getBanks_API(user.$id)
    .then(res => {
      if(res?.total != 0) {
        dispatch(setBanks(res.documents))
        dispatch(setPageLoading(false));
      }
      else {
        fetchLinkToken(user);
      }
    })
    .catch(err => {
      console.log(err);
    })
  }

  const addPlaidCDN = () => {
    const script = document.createElement('script');
    script.src = "https://cdn.plaid.com/link/v2/stable/link-initialize.js";
    script.async = true;
    document.body.appendChild(script);
  }

  const fetchLinkToken = async (user: object) => {
    await get_linkToken_plaid(user, ['auth', 'transactions', 'identity'])
    .then(res => {
      dispatch(setLinkToken(res.linkToken));
      dispatch(setPageLoading(false));
      dispatch(setBanks([]))
    })
  }


  // ------------------------------- EFFECTS ------------------------------- //
  useEffect(() => {
    checkUser();
    addPlaidCDN();
  }, [])

  return (
    <main>
        {
          pageLoading.isPageLoading
          ?
            <LoadingPage />
          :
          <>
            {
              banksList
              ?
                <>
                    {
                      banksList.length
                      ?
                        <>
                          <CorePanel />
                          <div className="custom_container">
                            { children }
                          </div>
                        </>
                      :
                        <AddFirstBank />
                    }
                </>
              :
                <LoadingPage />
            }
          </>
        }
    </main>
  );
}



