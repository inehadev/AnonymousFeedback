import dbConnect from "@/lib/dbConnect";
import  UserModel  from "@/model/UserModel";
import {z} from "zod"
import { UsernameValidation } from "@/schemas/signUpSchema";


const UserNameQuerySchema= z.object({
    username:UsernameValidation
})

export async function GET(request:Request){

    
    await dbConnect()

    try {
        const {searchParams}=new URL(request.url)
      const queryParam={

        username:searchParams.get('username') 
      }
      const result=  UserNameQuerySchema.safeParse(queryParam)
      
      console.log(result)

      if(!result.success){
        const usernameErrors=result.error.format().username?._errors || []
        return Response.json({
            success:false,
            message: usernameErrors.length>0? usernameErrors.join(','):'Invalid query parameteres'
        },{status:400})
      }

      const {username }=result.data

     const exisitingVerifiedUser=  await UserModel.findOne({username , isverified:true})

     if(exisitingVerifiedUser){
        return Response.json({
            success:false,
            message:'Username is already taken'
        },{status:400})
     }

     return Response.json({
        success:true,
        message:"Username is unique",

     },{status:200})

    } catch (error) {
        console.error("Error checking username" , error)
        return Response.json(
            {
                success:false,
                message:"Error checking username"
            }
        )        
    }
}