"use client"

import React from "react"
import Link from "next/link"
import { useSession , signOut } from "next-auth/react"
import { User } from "next-auth"
import { Button } from "@/components/ui/button"

const Navbar=()=>{
    const { data: session } = useSession()

    console.log('Session data:', session); // Debugging line to check session data

    const user = session?.user
    return(
        <div>
       <nav className="p-4 md:p-6 shadow-md bg-gray-100">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
            <a  className="text-2xl font-bold mb-4 mb:mb-0"  href="">Anonymous Message</a>
           
            {
                session ? (
                   <>
                    <span className="mr-4">Welcome , {user?.username || user?.email}</span>
                    <Button className="w-full md:w-auto" onClick={()=>signOut()}>Logout</Button></>
                ) : (
                        <Link href='/sign-in'>
                            <Button className="w-full md:w-auto">Login</Button>
                        </Link>             
                )
            }
        </div>
       </nav>
       </div>
    )
}

export default Navbar
