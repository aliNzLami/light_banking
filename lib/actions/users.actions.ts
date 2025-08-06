'use server';

import { ID } from "node-appwrite";
import { createAdminClient } from "../appwrite";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { parseStringify } from "@/lib/utils";

declare interface loginParams {
    email: string,
    password: string
}

declare interface signUpParams {
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    address?: string,
    state: string,
    postalCode: string,
    nid: string,
    dateOfBirth?: string,
}

export const login_API = async (userData: loginParams) => {
    "use server";
  const { email, password } = userData

  
  // -------- login account
  const { account } = await createAdminClient();
  await account.createEmailPasswordSession(email, password);


  // -------- session & cookies
  const session = await account.createEmailPasswordSession(email, password);
  const calledCookie = await cookies();
  calledCookie.set("appwrite-session", session.secret, {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  });
}

export const signUp_API = async (userData : signUpParams) => {
  "use server";
  const {email, password, firstName, lastName} = userData


  // -------- create account
  const { account } = await createAdminClient();
  await account.create(ID.unique(), email, password, `${firstName} ${lastName}`);
  

  // -------- session & cookies
  const session = await account.createEmailPasswordSession(email, password);
  const calledCookie = await cookies();
  calledCookie.set("appwrite-session", session.secret, {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  });
}

// export const signOut_API = async () => {
//   "use server";

//   // -------- create account
//   const { account } = await createAdminClient();
//   const sessions = await account.getSessions();
//   if (sessions.sessions.length > 0) {
//     const sessionId = sessions.sessions[0].$id; 
//     await account.deleteSession(sessionId);
//   }

//   // -------- session & cookies
//   const calledCookie = await cookies();
//   calledCookie.set("appwrite-session", "", {
//     path: "/",
//     httpOnly: true,
//     sameSite: "strict",
//     secure: true,
//     expires: new Date(0), // Expire immediately
//   });
// };


// export const signUp_API = async (userData : signUpParams) => {
//     const { email, firstName, lastName, password } = userData;
//     let newUserAccount;
  
//     try {
//       // ------------- Gathering Data
//       const { account, database } = await createAdminClient();
//       newUserAccount = await account.create(
//         ID.unique(), 
//         email, 
//         password, 
//         `${firstName} ${lastName}`
//       );
//       if(!newUserAccount) throw new Error('Error creating user')
      
  
//       // ------------- Create Account
//       const newUser = await database.createDocument(
//         process.env.APPWRITE_DATABASE_ID!,
//         process.env.APPWRITE_USER_COLLECTION_ID!,
//         ID.unique(),
//         {
//           ...userData,
//           userId: newUserAccount.$id,
//         //   dwollaCustomerId,
//         //   dwollaCustomerUrl
//         }
//       )
  
//       // ------------- Sessions & Cookies
//       const session = await account.createEmailPasswordSession(email, password);
//       const calledCookie = await cookies();
//       calledCookie.set("appwrite-session", session.secret, {
//         path: "/",
//         httpOnly: true,
//         sameSite: "strict",
//         secure: true,
//       });
  
//       return parseStringify(newUser);
  
//     } 
//     catch (error) {
//       console.error('Error', error);
//     }
// }