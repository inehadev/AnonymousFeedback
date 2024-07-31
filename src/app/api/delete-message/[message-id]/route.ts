import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/option";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/UserModel";
import {User} from "next-auth"


export async function DELETE(request:Request , {params}:{params:{messageid:string}}){
    const messageId=params.messageid
    await dbConnect();
    const session= await  getServerSession(authOptions)
    const user : User =  session?.user  as User

    if(!session || !session.user){
        return Response.json(
            {
                sucess: false,
                message:"Not Authenticated"
            },
            {status:401}
        )
    }

    try {
      const updateResult=  await UserModel.updateOne(
            {_id:user._id},
            {$pull:{messages: {_id:messageId}}}
        )

        if(updateResult.modifiedCount==0){
            return Response.json({
                success:false,
                message:"Message not found already or already delete"
            } , {status:401})
        }
        return Response.json({
            success:true,
            message:"Message delete"
        } , {status:200})
        
    } catch (error) {
        return Response.json({
            success:false,
            message:"Errror in deleting message"
        } , {status:500})
        
    }
 
  
}