"use client"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Button } from "@/components/ui/button"
  


import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { X } from "lucide-react"
import { Message } from "@/model/UserModel"
import { ApiResponse } from "@/types/ApiRespose"
import axios from "axios"
import { useToast } from "./ui/use-toast"
  

type MessageCardProps ={
    message: Message;
    onmessageDelete: (messageId:string ) => void
}




const MessageCard = ({message , onmessageDelete}: MessageCardProps) => {
  const {toast} = useToast()
    const handleDelete =async () =>{
        const res = await axios.delete<ApiResponse>(`/api/delete-message/${message._id}`)
         toast({
            title:res.data.message,

         })
        //  onmessageDelete(message._id)
    }
  return (
    <Card className="flex  flex-row-reverse justify-between items-center">

   

    <AlertDialog>
      <AlertDialogTrigger asChild>
       <div> <Button  className="mr-10 bg-red-800"><X className="w-5 h-5"/></Button></div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>


 

<div className="text-center justify-center">  <CardContent>
  <p className="mt-1">{message.content}</p>
  <small>{new Date(message.createdAt).toLocaleString()}</small>
  </CardContent></div>
  
</Card>

  )
}

export default MessageCard
