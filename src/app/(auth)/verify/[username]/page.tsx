'use client'

import { useToast } from '@/components/ui/use-toast';
import { useParams , useRouter } from 'next/navigation';
import React from 'react'
import { useForm } from 'react-hook-form';
import * as z from "zod"
import { verifySchema } from '@/schemas/verifySchema';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import { ApiResponse } from '@/types/ApiRespose';
import {Form, FormField  ,FormItem , FormControl , FormDescription , FormLabel, FormMessage  } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const Verify= () => {
    const router=useRouter();
    const param = useParams<{username:string}>();
    const {toast}=useToast()

    const form =useForm<z.infer<typeof verifySchema>>({
        resolver:zodResolver(verifySchema)
    })

    const onSubmit = async (data:z.infer<typeof verifySchema>)=>{
        console.log(param);

        try {
           const response = await axios.post('/api/verify-code' , {
            username : param.username,
            code :data.code
           })

           toast({
            title:"Sucess",
            description:response.data.message
           })
           router.replace('sign-in')

           toast({
            title:"Sucess"           })
            
        } catch (error) {
            console.error("Error in verifyfying code", error);
            const axiosError=error as AxiosError <ApiResponse>;
            toast({
                title:"verifcation failed",
                description:axiosError.response?.data.message,
                
            })
            
        }
    }
  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
        <div className='w-full  max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md'>
            <div className='text-center'>
                <h1 className='text-3xl text-md'>Verify Your Account </h1>
            </div>
            <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>verifcation code</FormLabel>
              <FormControl>
                <Input placeholder="code" {...field} />
              </FormControl>
             
              <FormMessage />
            </FormItem> 
             )}
             />
             <Button type="submit">Submit</Button>
           </form>
         </Form>

        </div>
      
    </div>
  )
}

export default Verify
