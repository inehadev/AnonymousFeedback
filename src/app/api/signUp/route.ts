
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/UserModel";
import bcrypt from "bcryptjs"
import { sendVerificationEmail } from "@/helpers/sendVerficationEmail";
import { messageSchema } from "@/schemas/messageSchema";

export async function POST(request:Request){
    await dbConnect();
    try {
     const {username, email , password}=   await request.json()
    const existingUserVerifiedByUsername=await  UserModel.findOne({
        username,
        isverified:true
     })
     
     if(existingUserVerifiedByUsername){
         return Response.json({
            success:false,
            message:"Username is alreeady taken"
         },
        {status:400})
     }

    const existinguserByEmail=await  UserModel.findOne({email})

    const verifyCode=Math.floor(100000+Math.random()*900000).toString()

    if(existinguserByEmail){

    }else{
      const hashPassword= await bcrypt.hash(password , 10)
       const expiryDate=new Date()
       expiryDate.setHours(expiryDate.getHours()+1)
      const newUser = new UserModel({
        username,
        email,
        password:hashPassword,
        verifyCode:verifyCode,
        verifyCodeExpiry:expiryDate,
        isverified:false,
        isAcceptingMessage:true,
        messages :[]
    

       })

       await newUser.save();
    }

    //send verification email
    const emailResponse = await sendVerificationEmail(
        email ,
        username,
        verifyCode
    )
     
    if(!emailResponse.success){
        return Response.json({
            status:false,
            message:emailResponse.message
        },{status:201})
    }
    return Response.json({
        success:true,
        message:"User registered successfully.Please verify Yout Email"

    },{status:500})


    } catch (error) {
        console.error("Error in registring" ,  error);
        return Response.json({
            success:false,
            message:"Error in regitering user"
        },
        {
            status:500
        }
    )
        
    }
}