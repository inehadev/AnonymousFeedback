
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/UserModel";
import bcrypt from "bcryptjs"
import { sendVerificationEmail } from "@/helpers/sendVerficationEmail";
import { messageSchema } from "@/schemas/messageSchema";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    await dbConnect();
    try {
        const { username, email, password } = await request.json()
        const existingUserVerifiedByUsername = await UserModel.findOne({
            username,
            isverified: true
        })

        if (existingUserVerifiedByUsername) {
            return NextResponse.json({
                success: false,
                message: "Username is alreeady taken"
            },
                { status: 400 })
        }

        const existinguserByEmail = await UserModel.findOne({ email })

        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString()

        if (existinguserByEmail) {
            if (existinguserByEmail.isverified) {
                return Response.json({
                    status: false,
                    message: "User already exist with this email"
                }, { status: 400 })
            } else {
                const hashPassword = await bcrypt.hash(password, 10);
                existinguserByEmail.password = hashPassword;
                existinguserByEmail.verifyCode = verifyCode;
                existinguserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000)

                await existinguserByEmail.save();
            }

        } else {
            const hashPassword = await bcrypt.hash(password, 10)
            const expiryDate = new Date()
            expiryDate.setHours(expiryDate.getHours() + 1)
            const newUser = new UserModel({
                username,
                email,
                password: hashPassword,
                verifyCode: verifyCode,
                verifyCodeExpiry: expiryDate,
                isverified: false,
                isAcceptingMessage: true,
                messages: []


            })

            const res = await newUser.save();
            console.log('New User Created:', res);

        }

        //send verification email
        const emailResponse = await sendVerificationEmail(
            email,
            username,
            verifyCode
        )

        if (!emailResponse.success) {
            return NextResponse.json({
                status: false,
                message: emailResponse.message
            }, { status: 201 })
        }
        return NextResponse.json({
            success: true,
            message: "User registered successfully.Please verify Yout Email"

        }, { status: 201 })


    } catch (error) {
        console.error("Error in registring", error);
        return Response.json({
            success: false,
            message: "Error in regitering user"
        },
            {
                status: 500
            }
        )

    }
}