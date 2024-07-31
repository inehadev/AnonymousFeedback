import dbConnect from "@/lib/dbConnect";
import UserModel  from "@/model/UserModel";
import { Message } from "@/model/UserModel";


export async function POST (request:Request){
   
   await dbConnect()
   const {username , content}= await request.json()

   try {
   const user= await  UserModel.findOne({username})
   
   if(!user){
    return Response.json({
        success:false,
        message:"user not found",

    },{status:404})
   }

   // is user accepting messaging or not

   if(!user.isAcceptingMessage){
    return Response.json({
        success:false,
        message:"user is not accepting message",

    },{status:403})
   }

   const newMessge = {content,createdAt:new Date()}
   user.messages.push(newMessge as Message)
   await user.save();

   return Response.json({
    success:true,
    message:"Message sent successfuly",

},{status:404})
    
   } catch (error) {

    console.error("error in adding message");
    return Response.json({
        success:false,
        message:"Message adding error",

    },{status:500})
    
   }

}

