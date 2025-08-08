'use server';

import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { cookies } from "next/headers";
import { parseStringify } from "@/lib/utils";
import { plaidClient } from "../plaid/plaid";
import { CountryCode, ProcessorTokenCreateRequest, ProcessorTokenCreateRequestProcessorEnum, Products } from "plaid";


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

declare interface plaidTokenProps {
  $id: string,
  email: string,
  name: string,
  // firstName: string,
  // lastName: string,
  address?: string,
  state?: string,
  postalCode?: string,
  nid?: string,
  dateOfBirth?: string,
}

// ---------------------------- AppWrite AUTH APIs ---------------------------- //

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

export const signOut_API = async () => {
  "use server";

  // -------- delete account
  const { account } = await createSessionClient();
  await account.deleteSession('current');

  // -------- session & cookies
  const calledCookie = await cookies();
  calledCookie.delete("appwrite-session");
};

// ---------------------------- PLAID APIs ---------------------------- //

export const token_generator_plaid = async (user: plaidTokenProps, products: string) => {
  try {
    const tokenParams = {
      user: {
        client_user_id: user.$id
      },
      client_name: user.name,
      products: [products] as Products[],
      language: 'en',
      country_codes: ['US'] as CountryCode[],
    }
    const response = await plaidClient.linkTokenCreate(tokenParams);
    return parseStringify({ linkToken: response.data.link_token })
  } 
  catch (error) {
    console.error('Error creating link token:', error);
  }
}

export const get_accessToken_plaid = async (public_token: string) => {
  try {
    const response = await plaidClient.itemPublicTokenExchange({ public_token });
    return {
      access_token: response.data.access_token,
      item_id: response.data.item_id
    }
  } catch (error) {
    console.error('Error exchanging public token:', error);
  }
}

export const handler = async (access_token: string) => {
  try {
    const response = await plaidClient.accountsGet({ access_token });
    return response;
  } catch (error) {
    console.error('Error fetching accounts:', error);
  }
}


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