import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/option";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/UserModel";
import {User} from "next-auth"

export async function POST(request:Request){
    await dbConnect()
   const session= await  getServerSession(authOptions)
   const user : User =  session?.user  as User

   if(!session || !session.user){
    return Response.json({
        success:false,
        message:"Not authenticated"
    },{status:401})
   }

   const userId=user._id
   const {acceptMessages}=await request.json()

   try {
   const updatedUser= await UserModel.findByIdAndUpdate(userId ,
        {isAcceptingMessage:acceptMessages},
       { new:true}
    )

    if(!updatedUser){
        return Response.json({
            sccess:false,
            message:"Failed to update user status of accept message"
        },{status:401})

    }

    return Response.json({
        sccess:true,
        message:"Message acceptance status updated successfully",
        updatedUser
    },{status:200})

    
   } catch (error) {
    console.error("Failed to update user status of accept message")
    return Response.json({
        sccess:false,
        message:"Failed to update user status of accept message"
    },{status:500})
    
   }
}


export async function GET(request:Request){
    await dbConnect();
    const session= await  getServerSession(authOptions)
    const user : User =  session?.user  as User
 
    if(!session || !session.user){
     return Response.json({
         success:false,
         message:"Not authenticated"
     },{status:401})
    }
 
    const userId=user._id
     
  
    try {
        const isUser= await UserModel.findById(userId)
        if(!isUser){
         return Response.json({
             success:false,
             message:"user not found",
     
         },{status:404})
        }
     
        return Response.json({
         success:true,
         isAcceptingMessages:user.isAcceptingMessages,
         
        },{status:200})
        
    } catch (error) {
        console.error("Failed to update user status of accept message")
        return Response.json({
            sccess:false,
            message:"Messsage Acceptence error"
        },{status:500})
    }
}