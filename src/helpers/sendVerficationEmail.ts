import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiRespose";

export async function sendVerificationEmail(
    email:string,
    username:string,
    verifyCode:string
):Promise<ApiResponse>{
    try {

        await resend.emails.send({
            from: 'you@example.com',
            to: 'email',
            subject: 'Anonymous verification code ',
            react: VerificationEmail({username  , otp:verifyCode}),
          });
       
          return { success: true, message: 'Verification email sent' };

    } catch (emailError) {
        console.error("Error sending verification email",emailError)
        return {success:false , message:'Failed to send verofication Email'}
        
    }

}