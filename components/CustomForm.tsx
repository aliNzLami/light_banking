"use client"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import CustomInput from "./CustomInput"

function CustomForm({ inputsList, form, onSubmit, isLoading, buttonText = "Submit" }: FormProps) {
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="customGrid">
                    {
                        inputsList.map(item => {
                        return (
                            <div className={`${item.name} mb-4`} key={item.name}>
                                <CustomInput
                                    form={form} 
                                    name={item.name} 
                                    label={item.label} 
                                    placeholder={item.placeholder}
                                    type={item.type}
                                />
                            </div>
                        )
                        })
                    }
                </div>
                <Button className="primaryButton mt-10" type="submit" disabled={isLoading}>
                    {
                        isLoading
                        ?
                            <div className="animate-spin spin-white w-[20px] h-[20px]"></div>
                        :
                            `${buttonText}`
                    }
                </Button>
            </form>
        </Form>
    )
}

export default CustomForm