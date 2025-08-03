"use client"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import Image from "next/image"
import logo from "@/assets/icons/logo.jpg"
import CustomForm from "@/components/CustomForm"
import { useState } from "react"
import Link from "next/link"
import AuthNav from "./AuthNav"


const formSchema_login = z.object({
  email: z.string().trim().email(),
  password: z.string().trim().min(8),
})

const formSchema_signUp = z.object({
  email: z.string().trim().email(),
  password: z.string().trim().min(8),
  firstName: z.string().trim().min(3), 
  lastName: z.string().trim().min(3), 
  address: z.string().trim().max(50), 
  state: z.string().trim().min(2).max(2), 
  postalCode: z.string().trim().min(3).max(6), 
  nid: z.string().trim().optional(), 
  dateOfBirth: z.string().trim().optional(), 
})

function AuthForm({type}: {type: string}) {

    const [isLoading, setIsLoading] = useState(false);

    // ----------------------------- INPUTS ----------------------------- //

    const login = [
      {
        name: 'email',
        label: 'Email',
        placeholder: "Enter your email",
        type: "email"
      },
      {
        name: 'password',
        label: 'Password',
        placeholder: "Enter your password",
        type: "password"
      },
    ]

    const signUp = [
      {
        name: 'firstName',
        label: 'First Name',
        placeholder: "Enter your first name"
      },
      {
        name: 'lastName',
        label: 'Last Name',
        placeholder: "Enter your last name"
      },
      {
        name: 'address',
        label: 'Address',
        placeholder: "Enter your address"
      },
      {
        name: 'state',
        label: 'State',
        placeholder: "Example: NY"
      },
      {
        name: 'postalCode',
        label: 'Postal Code',
        placeholder: "Example: 11101",
        type: "number",
      },
      {
        name: 'nid',
        label: 'National ID',
        placeholder: "Enter your national ID",
        type: "number",
      },
      {
        name: 'dateOfBirth',
        label: 'Date of Birth',
        placeholder: "Example: mm/dd/yyyy",
        type: "date"
      },
      {
        name: 'email',
        label: 'Email',
        placeholder: "Enter your email",
        type:"email"
      },
      {
        name: 'password',
        label: 'Password',
        placeholder: "Enter your password",
        type: "password"
      },
    ]

    const loginObject = login.reduce((acc: { [key: string]: string }, field) => {
      acc[field.name] = "";
      return acc;
    }, {});

    const signUpnObject = signUp.reduce((acc: { [key: string]: string }, field) => {
      acc[field.name] = "";
      return acc;
    }, {});


    // ----------------------------- FORMS ----------------------------- //
    
    const form_login = useForm<z.infer<typeof formSchema_login>>({
      resolver: zodResolver(formSchema_login),
      defaultValues: {...loginObject},
    })

    const form_signUp = useForm<z.infer<typeof formSchema_signUp>>({
      resolver: zodResolver(formSchema_signUp),
      defaultValues: {...signUpnObject},
    })


    // ----------------------------- FUNCTIONS ----------------------------- //

    function onSubmit_login(values: z.infer<typeof formSchema_login>) {
      console.log(values);
    }

    function onSubmit_signUp(values: z.infer<typeof formSchema_signUp>) {
      console.log(values)
    }

    return (
      <div className="flex min-h-screen w-full flex-col justify-center items-center gap-5 md:gap-8">

        <div className="shadow-lg p-5">
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

          <div className="w-[300px] lg:w-[500px]">
              <div className="mb-8">
                <span className="text-[24px] leading-[30px] lg:text-[36px] lg:leading-[44px] font-semibold blueText">
                  {
                    type === "login"
                    ?
                      "Login"
                    :
                      "Sign Up"
                  }
                </span>
                <span className="block text-[16px] leading-[24px] text-gray-600">
                  Please enter your details.
                </span>
              </div>

              {
                type === "login"
                ?
                    <CustomForm 
                      form={form_login}
                      inputsList={login}
                      onSubmit={onSubmit_login}
                      isLoading={isLoading}
                    />
                :
                  <div className="signUp">
                    <CustomForm 
                        form={form_signUp}
                        inputsList={signUp}
                        onSubmit={onSubmit_signUp}
                        isLoading={isLoading}
                    />
                  </div>
              }
          </div>

          <footer className="mt-8">
            {
              type === "login"
              ?
                  <AuthNav
                    text="Don't have an account?"
                    button="Sign Up"
                    href="/sign-up"
                  />
              :
                  <AuthNav
                    text="Already have an account?"
                    button="Login"
                    href="/login"
                  />
            }
          </footer>
        </div>
        
      </div>
    )
}

export default AuthForm