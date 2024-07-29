import { useToast } from '@/components/ui/use-toast';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/router'
import React from 'react'
import { useForm } from 'react-hook-form';
import * as z from "zod"
import { verifySchema } from '@/schemas/verifySchema';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import { Description } from '@radix-ui/react-toast';
import { readableFromAsyncIterable } from 'ai';
import { ApiResponse } from '@/types/ApiRespose';

const verify= () => {
    const router=useRouter();
    const param = useParams<{username:string}>()
    const {toast}=useToast()

    const form =useForm<z.infer<typeof verifySchema>>({
        resolver:zodResolver(verifySchema)
    })

    const onsubmit = async (data:z.infer<typeof verifySchema>)=>{

        try {
           const response = await axios.post('/api/verify-code' , {
            username : param
            .username,
            code :data.code
           })

           toast({
            title:"Sucess",
            description:response.data.message
           })
           router.replace('sign-in')

           toast({
            title
:"Sucess"           })
            
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
            <div className='text-center'></div>

        </div>
      
    </div>
  )
}

export default verify
