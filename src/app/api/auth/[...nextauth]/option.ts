import { NextAuthOptions } from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs'
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/UserModel";
import Credentials from "next-auth/providers/credentials";

export const authOptions : NextAuthOptions={
    providers:[
        CredentialsProvider({
            id:"credentials",
            name:"credentials", 
                credentials:{
                    email:{label:"Email" , type:"text"},
                    password:{label:"Password0", type:"password"}
                },
                async authorize(credentials: any): Promise<any> {
                     await dbConnect();
                     try {
                      const user=  await UserModel.findOne({
                            $or:[
                                {email:credentials.identifier},
                           
                                {username:credentials.identifier}
                            ]
                        })

                        if(!user){
                            throw new Error('No user found with this email')
                        }

                        if(user.isverified){
                            throw new Error('PLease verify your account first')
                        }
                         
                     const isPasswordCorrect=   await bcrypt.compare(credentials.password,user.password)

                     if(isPasswordCorrect){
                        return user
                     }else{
                        throw new Error('Incorrect password')
                     }

                     } catch (err:any) {
                        throw new Error(err)
                     }
            }
        })
    ],
    callbacks:{
        async jwt({token , user}){
            if(user){
                token._id = user._id?.toString()
                token.isVerified=user.isVerfied;
                token.isAcceptingMessage=user.isAcceptingMessages;
                token.username = user.username;
                
            }
            return token
        },
        async session({session  ,token}){
            if(token){
                session.user._id=token._id;
                session.user.isVerfied=token.isVerified;
                session.user.isAcceptingMessages=token.isAcceptingMessages;
                session.user.username=token.username

            }
            return session
        },


    },
    pages:{
        signIn:'/sign-in'
    },
    session:{
        strategy: "jwt"
    },
    secret:process.env.SECRET_KEY


}