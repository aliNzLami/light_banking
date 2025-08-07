"use client"
import { Form } from "@/components/ui/form"
import CustomInput from "./CustomInput"
import SubmitBtn from "./SubmitBtn"

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
                <SubmitBtn
                    isLoading={isLoading}
                    onClick={() => {}}
                    buttonText={buttonText}
                />
            </form>
        </Form>
    )
}

export default CustomForm