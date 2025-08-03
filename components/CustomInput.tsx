"use client"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

function CustomInput({ form, name, label, type, placeholder }: InputProps) {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
            <div className="flex flex-col gap-1.5">
                <FormLabel className="text-14 w-full max-w-[280px] font-medium text-gray-700">
                    { label }
                </FormLabel>
                <div className="flex w-full flex-col">
                <FormControl>
                    <Input
                        placeholder={placeholder}
                        type={type ? type : "text"}
                        className="text-16 placeholder:text-16 rounded-lg border border-gray-300 text-gray-900 placeholder:text-gray-500"
                        {...field}
                    />
                </FormControl>
                <FormMessage className="text-12 text-red-500 mt-2" />
                </div>
            </div>
            )}
        />
    )
}

export default CustomInput