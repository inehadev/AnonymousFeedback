'use client'

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import {  useForm } from "react-hook-form"
import * as z from "zod"
import {  useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { signInSchema } from "@/schemas/signInSchema"
import  axios, { AxiosError }  from 'axios'
import { ApiResponse } from "@/types/ApiRespose"
import {Form, FormField  ,FormItem , FormControl , FormDescription , FormLabel, FormMessage  } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { signIn } from "next-auth/react"
import { Provider } from "@radix-ui/react-toast"

const Page = () => {
  const[loader, setloader]=useState(false)
  const[submit , setsubmit]=useState(false)

   const {toast}=useToast();
   const router =useRouter()

   /// implementation of zod

   const form =useForm<z.infer<typeof signInSchema>>({
    resolver:zodResolver(signInSchema),
    defaultValues:{
      identifier:'',
      password:''
    }
   })


   const onSubmit =  async(data: z.infer<typeof signInSchema>)=>{
    setloader(true)

    const result = await signIn('credentials' , {
        redirect:false,
        identifier:data.identifier,
        password:data.password
      })
   setloader(false);
   console.log(result);
      
   if (result?.error) {
    toast({
      title: "Login Failed",
      description: "Incorrect username or password",
      variant: "destructive",
    });
  } else  {
    
    router.replace('/dashboard');
  } 

      }
    

   
  
  return (
    
      <div className="flex justify-center items-center
      min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-8 bg-white
        rounded-lg shadow-sm">
          <div className="text-center text-3xl">Anonymous Feedback</div>
            <Form {...form} >
<form onSubmit={form.handleSubmit(onSubmit) }className="space-y-6" >
           

        <FormField
          control={form.control}
          name="identifier"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="" >Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field}
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
              <FormLabel className="">Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="password" {...field}
                 />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={loader} className="text-center ml-[40%]  px-2">
         SignIn
        </Button>

            </form>

            </Form>
            <div className="text-center mt-4">
              <p>Don't have an account?{''}
                <Link href="/sign-up" className="text-blue-600 hover:text-blue-80000">Sign Up</Link>
              </p>
            </div>
          </div>
        </div>
     
    
  )
}

export default Page
