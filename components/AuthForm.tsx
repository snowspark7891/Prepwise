/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import React from "react";
import { Button } from "@/components/ui/button"
import {
  Form
} from "@/components/ui/form"
import Image from "next/image";
import Link from "next/link";
import {toast} from "sonner";
import FormField from "@/components/FormField";
import {useRouter} from "next/navigation";




 const AuthFormSchema =(type:FormType)=>{
   // @ts-ignore
   return z.object(
       {
         name: type === 'sign-up' ? z.string().min(3, {message: "Username must be at least 3 characters."}) : z.string().optional(),
         email: z.string().email(),
         password: z.string().min(2, {message: "Password must be at least 3 characters."}),
       }
   )
 }


const AuthForm = ({type}:{type:FormType}) => {
   const router = useRouter();
   const formSchema = AuthFormSchema(type)
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email:"",
      password:""
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    try{
      if(type === "sign-up"){
        toast.success('Account created successfully. Please sign in')
        console.log('sign up done',values)
        router.push("/sign-in")
      }else {
        toast.success('Welcome back!')
        router.push("/")
      }
    }
    catch (error){
      console.log(error);
      toast.error(`There was an error occurred: ${error}`);
    }
  }
  const isSignIN = type === 'sign-in';
  return (
    <div className="card-border lg:min-w-[566px]">
      <div className="flex flex-col gap-6 py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image src="/logo.svg" width={32} height={38} alt="logo" />
          <h2 className="text-primary-100">PrepWise</h2>
        </div>
        <h3>Practice Job Interview With AI</h3>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full mt-4 form">
            {!isSignIN &&(
                <FormField
                  control={form.control}
                  name="name"
                  label="Name"
                  placeholder="Your Name"
                  type="text"
                />
            )}
            <FormField
                control={form.control}
                name="email"
                label="Email"
                placeholder="Your Email"
                type="email"
            />
            <FormField
                control={form.control}
                name="password"
                label="Password"
                placeholder="Your Password"
                type="password"
            />
            <Button className='btn' type="submit">{isSignIN ? 'Sign In' : 'Create an Account'}</Button>
          </form>
        </Form>

        <p className='text-center'>
          {isSignIN ? 'No Account Yet 🙄 ? ' : 'Already Have an Account 😏 ! '}
          <Link href={!isSignIN ? '/sign-in' : '/sign-up'} className='font-bold text-user-primary ml-1'>
            {!isSignIN ? 'Sign In' : 'Sign Up'}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
