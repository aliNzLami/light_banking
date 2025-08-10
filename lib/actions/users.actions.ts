'use server';
import { ID, Query } from "node-appwrite";
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
  address?: string,
  state?: string,
  postalCode?: string,
  nid?: string,
  dateOfBirth?: string,
}

function getCircularReplacer() {
  const seen = new WeakSet();
  return (key: string, value: any) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) return "[Circular]";
      seen.add(value);
    }
    return value;
  };
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

export const get_linkToken_plaid = async (user: plaidTokenProps, products: Array) => {
  try {
    const tokenParams = {
      user: {
        client_user_id: user.$id
      },
      client_name: user.name,
      products: products as Products[],
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
  } 
  catch (error) {
    console.error('Error exchanging public token:', error);
  }
}

export const get_bankItems_plaid = async (access_token: string) => {
    const response = await plaidClient.accountsGet({ access_token });
    return response.data;
}

export const get_institution_plaid = async (institution_id: string) => {
  const institutionRes = await plaidClient.institutionsGetById({
    institution_id,
    country_codes: ['US'] as CountryCode[],
    options: { include_optional_metadata: true }
  });
  return institutionRes;
}

export const get_transactions_plaid = async (access_token: string) => {
  const institutionRes = await plaidClient.transactionsGet({
    access_token,
    start_date: '2024-01-01',
    end_date: '2025-01-01'
  });
  return institutionRes;
}

// ---------------------------- BANK APIs ---------------------------- //

export const createBank_API = async (info : object) => {

  const accounts = (await get_bankItems_plaid(info.accessToken)).accounts;
  const institution = (await get_institution_plaid(info.institution.institution_id)).data;
  const transactions = (await get_transactions_plaid(info.accessToken)).data.transactions

  const finalData = {
    ...info,
    accountsList: JSON.stringify(accounts, getCircularReplacer()),
    institution: JSON.stringify(institution, getCircularReplacer()), // AppWrite does not accepts array
    transactions: JSON.stringify(transactions, getCircularReplacer())
  }

  const { database } = await createAdminClient();

  const response = await database.createDocument(
    process.env.APPWRITE_DATABASE_ID!,
    process.env.APPWRITE_BANK_COLLECTION_ID!,
    ID.unique(),            
    finalData,
  );

  return response;
}

export const updateBank_API = async (doc_id: string, changedInfo: object) => {

  const { database } = await createAdminClient();
  const response = await database.updateDocument(
    process.env.APPWRITE_DATABASE_ID!,
    process.env.APPWRITE_BANK_COLLECTION_ID!,
    doc_id,            
    changedInfo,
  );
  return response;
}

export const getBanks_API = async (userId : string) => {
  try {
    const { database } = await createAdminClient();

    const response = await database.listDocuments(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_BANK_COLLECTION_ID!,
      [Query.equal('userID', [userId])]
    )
    return response;

  } 
  catch (error) {
    console.log(error)
  }
}

// export const getBank = async (documentId: string) => {
//   try {
//     const { database } = await createAdminClient();

//     const bank = await database.listDocuments(
//       process.env.APPWRITE_DATABASE_ID!,
//       process.env.APPWRITE_BANK_COLLECTION_ID!,
//       [Query.equal('$id', [documentId])]
//     )

//     return parseStringify(bank.documents[0]);
//   } catch (error) {
//     console.log(error)
//   }
// }

// export const getBankByAccountId = async (accountId: string) => {
//   try {
//     const { database } = await createAdminClient();

//     const bank = await database.listDocuments(
//       process.env.APPWRITE_DATABASE_ID!,
//       process.env.APPWRITE_BANK_COLLECTION_ID!,
//       [Query.equal('accountId', [accountId])]
//     )

//     if(bank.total !== 1) return null;

//     return parseStringify(bank.documents[0]);
//   } catch (error) {
//     console.log(error)
//   }
// }

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