import dbConnect from "@/lib/dbConnect";
import  UserModel  from "@/model/UserModel";

 export async function POST (request:Request){
    await dbConnect();
    try {

        const {username , code}=await request.json();
        const decodedUsername = decodeURIComponent(username);

        const user = await UserModel.findOne({username:decodedUsername});
        if(!user){
            return Response.json({
                success:false,
                message:"User not found "
            } , {status:500})
            

        }
        console.log("user found")
        const isvalidCode = user.verifyCode==code
        const isCodeNotExpired=new Date(user.verifyCodeExpiry)> new Date()
        console.log("still not expired")

        if(isvalidCode && isCodeNotExpired){
            user.isverified=true;
            await user.save()

            return Response.json({
                success:true,
                message:"User Verified Successfully"
            },{status:200})
        }else if(!isCodeNotExpired){
            return Response.json({
                success:false,
                message:"Verification code has expired  "
            },{status:400})
        }else{
            return Response.json({
             success:false,
                message:" Incorrect Verification code  "
            },{status:400})
        }

        
    } catch (error) {
        console.error("Error in verifying user code" , error);
        return Response.json({
            success:false,
            message:"Error in veryfy  user code "
        } , {status:500})
        
    }
}