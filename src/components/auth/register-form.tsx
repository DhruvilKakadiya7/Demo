"use client"

import * as z from "zod"

import { useEffect, useState, useTransition } from "react"

import { useForm } from "react-hook-form"

import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

import { zodResolver } from "@hookform/resolvers/zod"

import {
    Form, FormItem, FormLabel, FormControl, FormMessage, FormField
} from '@/src/components/ui/form'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/src/components/ui/select";


import { RegisterSchema } from "@/src/schemas"

import { CardWrapper } from "@/src/components/auth/card-wrapper"
import { Input } from "@/src/components/ui/input"
import { Button } from "@/src/components/ui/button"
import { FormError } from "@/src/components/form-error"
import { FormSuccess } from "@/src/components/form-success"
import { register } from "@/src/actions/register"
import PageLoader from "../loader"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";



interface organization {
    id: string;
    name: string
    normalizedLowerCase: string;
}



export const RegisterForm = () => {

    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")

    const [organizations, setOrganizations] = useState<organization[]>([
        {id: 'sell', name: 'SELLER', normalizedLowerCase: 'seller'},
        {id: 'upoad', name: 'UPLOADER', normalizedLowerCase: 'uploader'},
        {id: 'reseller', name: 'RESELLER', normalizedLowerCase: 'reseller'},
    ]);

    const [isLoadingOrganizations, setLoadingOrganizations] = useState(false);


    const [isPending, startTransition] = useTransition()

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            phoneNumber: "",
            password: "",
            name: "",
            role: "SELLER",
        }
    });

    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            register(values).then((data) => {
                setError(data.error)
                setSuccess(data.success)
            })
        })
    }

    const [passwordType, setPasswordType] = useState('password');

    return (

        <>
            <PageLoader loading={isLoadingOrganizations} />

            <CardWrapper
                headerLabel="Create an account"
                backButtonLabel="Already have an account?"
                backButtonHref="/auth/login"
            // showSocial
            >
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={isPending}
                                                placeholder="Kenil Dhola"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={isPending}
                                                placeholder="john.wick@action.com"
                                                type="email"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            /> */}
                            <FormField
                                control={form.control}
                                name="phoneNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone Number</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={isPending}
                                                placeholder="1234567890"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <div
                                                style={{
                                                    position: 'relative'
                                                }}
                                            >
                                                <Input
                                                    {...field}
                                                    disabled={isPending}
                                                    placeholder="******"
                                                    type={passwordType}
                                                ></Input>
                                                <div
                                                    style={{
                                                        position: 'absolute',
                                                        top: '25%',
                                                        right: '3%',
                                                        bottom: '20%',
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    {
                                                        passwordType === "text" ?
                                                            <FaRegEye
                                                                onClick={() => setPasswordType('password')}
                                                            />
                                                            :
                                                            <FaRegEyeSlash
                                                                onClick={() => setPasswordType('text')}
                                                            />
                                                    }
                                                </div>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="role"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Role</FormLabel>
                                    <Select
                                        disabled={isPending}
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select organization" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="ADMIN">
                                                ADMIN
                                            </SelectItem>
                                            {organizations.map((org) => (
                                                <SelectItem key={org.id} value={org.name}>
                                                    {org.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormError message={error} />
                        <FormSuccess message={success} />

                        <Button
                            disabled={isPending}
                            type="submit"
                            className="w-full"
                        >
                            Register
                        </Button>
                    </form>
                </Form>
            </CardWrapper>
        </>

    )
}