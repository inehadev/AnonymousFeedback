"use client"

import React from 'react'
import messagesData from'@/messages.json'
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import { CardHeader } from '@/components/ui/card'

type Message = {
  title: string;
  content: string;
};



const messages: Message[] = messagesData as Message[];

console.log(messages)



const Home = () => {
  return (
    <>
    <main className='flex-grow flex flex-col item-center justify-center px-4 md:px-24 py-12'>
      <section>
        <h1 className='text-3xl md:text-5xl font-bold'>Dive into the World of Anonymous Conversation</h1>
        <p className='mt-3 md:mt-4 text-base md:text-lg'>Explore Anonymous Message where your identity remains a secret</p>
      </section>

      <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-sm"
    >
      <CarouselContent>
       { messages.map((message:Message , index:number)=>(
          <CarouselItem key={index} >
            <div className="p-1">
              <Card>
                <CardHeader>{message.title}</CardHeader>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-3xl font-semibold">{message.content}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))
       }
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>

    </main>

    </>
    
  )
}

export default Home
