import { Resend } from "resend";
const resendApiKey = process.env.RESEND_API_KEY;
if (!resendApiKey) {
    console.error('RESEND_API_KEY is not defined in environment variables');
   
}


 export const resend = new Resend(process.env.RESEND_API_KEY)