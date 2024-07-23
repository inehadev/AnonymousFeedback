import {z} from 'zod'

export const UsernameValidation = z
  .string()
  .min(2 , "Usenername should atleast 2 charcater")
  .max(20 , "username must be nor more than 20 charaters")
  .regex(/^[a-zA-Z0-9]{3,16}$/)

  export const signUpSchema = z.object({
    username :UsernameValidation,
    email: z.string() .email({message:"Invalid Email"}),
    password:z.string().min(6 , {message:"pasword must contain 6 letters"})

  })