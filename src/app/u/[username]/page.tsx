"use client"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import axios from 'axios'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

type User = {
  username: string;
  email: string;
  
};
const Message = () => {
  const {toast}=useToast();
  const [content , setcontent]=useState("");
  const {data:session }= useSession();

  

   const username = session?.user ? (session.user as User).username : null;

  const handlemessage =async()=>{
    if (!username) {
      toast({
        title: "Error",
        description: "username not found in the uRL",
      });
      return;
    }

    try {
      const response= await axios.post('/api/send-message' , {username , content});
      if (response.data.success) {
        toast({
          title: "Success",
          description: "Message sent successfully",
        });
        console.log(response);
  
      }else{
        toast({
          title:"filed",
          description:"message is not sent"
        })
      }
    } catch (error) {
      console.error(error);
      toast({
        title:"failed",
        description:"error"
      })
      
    }
   

  }

   if(!session || !session.user){
    return (
      <div>Login First....</div>

    )
   }
  return (
    <>
       <div className='text-4xl text-center items-baseline flex justify-center  shadow-sm h-[100px]'><h2 className='mt-7 font-medium'>Public Profile Link</h2></div>

       <div className='m-10 mx-20'>
        <span  className='font-medium opacity-65'>send Anonymous message to @{username}</span>
        <Input className='mt-2' type="text" placeholder='type your anonymous message here' value={content} onChange={(e)=>setcontent(e.target.value)} />
         <Button className='mt-2 bg-gray-600' onClick={handlemessage}>Send Message</Button>
        </div>
    </>
  )
}

export default Message
