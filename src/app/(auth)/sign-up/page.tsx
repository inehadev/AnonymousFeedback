'use client'


import { zodResolver } from "@hookform/resolvers/zod"
import {  useForm } from "react-hook-form"
import * as z from "zod"
import  Link from "next/link"
import { useEffect, useState } from "react"
import {useDebounceCallback, useDebounceValue} from 'usehooks-ts'
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { signUpSchema } from "@/schemas/signUpSchema"
import  axios, { AxiosError }  from 'axios'
import { ApiResponse } from "@/types/ApiRespose"
import {Form, FormField  ,FormItem , FormControl , FormDescription , FormLabel, FormMessage  } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

const page = () => {
  const [username , setusername]=useState('');
  const[usernameMessage , setusernameMessage]=useState('')
  const[loader, setloader]=useState(false)
  const[submit , setsubmit]=useState(false)

   const debounced=useDebounceCallback(setusername , 500)
   const {toast}=useToast();
   const router =useRouter()

   /// implementation of zod

   const form =useForm<z.infer<typeof signUpSchema>>({
    resolver:zodResolver(signUpSchema),
    defaultValues:{
      username:'',
      email:'',
      password:''
    }
   })

   useEffect(()=>{
    const checkUsernameunique=async()=>{
      if(username){
        setloader(true)
        setusernameMessage('')

      }

      try {

       const response= await axios.get(`/api/check-username-unique?username=${username}`)
       setusername(response.data.message)
        
      } catch (error) {
        const axiosError=error as AxiosError<ApiResponse>
        setusernameMessage(
          axiosError.response?.data.message ?? "Checking username error"
        )
        
      }finally{
        setloader(false);
      }
     
    }

    checkUsernameunique()

   },[username])


   const onSubmit =  async(data: z.infer<typeof signUpSchema>)=>{
    setsubmit(true);
    try {
    const response=  await axios.post<ApiResponse>('/api/sign-up' , data)
    toast({
      title:'Success',
      description:response.data.message
    })
    router.replace(`/verify/${username}`)
    setsubmit(false);
    } catch (error) {
      console.error("Error in SignUp integration" , error)

      const axiosError=error as AxiosError<ApiResponse>
       let errorMessage= axiosError.response?.data.message
       toast({
        title:'Sing-up Failed',
        description:errorMessage,
        variant:"destructive"
       }) 
       setsubmit(false);
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
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="">Username</FormLabel>
              <FormControl>
                <Input placeholder="username" {...field}
                onChangeCapture={(e)=>{
                  field.onChange(e)
                  debounced((e.target as HTMLInputElement).value)
                }} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
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
          {
            loader ? (
              <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin"/> Please wait
              </> 
            )  : ('Signup')
            
          }
        </Button>

            </form>

            </Form>
            <div className="text-center mt-4">
              <p>Already a member?{''}
                <Link href="/sign-in" className="text-blue-600 hover:text-blue-80000">Sign in</Link>
              </p>
            </div>
          </div>
        </div>
     
    
  )
}

export default page
