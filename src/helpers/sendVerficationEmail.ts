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
           
        await resend.emails.send({
            from: ' AAnonymous, <n988420@gmail.com>',

            to:['7087330257n@gmail.com'],
            subject: 'Anonymous verification code ',
            react: VerificationEmail({username  , otp:verifyCode}),
           
          });
          console.log("verification email is sent" )
          return { success: true, message: 'Verification email sent' };
          

    } catch (emailError) {
        console.error("Error sending verification email",emailError)
        return {success:false , message:'Failed to send verofication Email'}
        
    }

}