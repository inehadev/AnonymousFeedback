import { Resend } from "resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiRespose";

export async function sendVerificationEmail(
    email:string,
    username:string,
    verifyCode:string
):Promise<ApiResponse>{
    const resend:any = new Resend(process.env.RESEND_API_KEY);

    try {
           
       const response= await resend.emails.send({
            from: ' AAnonymous, <n988420@gmail.com>',

            to:[email],
            subject: 'Anonymous verification code ',
            react: VerificationEmail({username  , otp:verifyCode}),
           
          });
          console.log("Email send response:", response);
          console.log("verification email is sent" )
          return { success: true, message: 'Verification email sent' };
          

    } catch (emailError) {
        console.error("Error sending verification email",emailError)
        return {success:false , message:'Failed to send verofication Email'}
        
    }

}