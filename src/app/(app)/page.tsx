"use client"

import React, { useEffect, useRef } from 'react'
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
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Footer from '@/components/Footer'

type Message = {
  title: string;
  content: string;
};



const messages: Message[] = messagesData as Message[];

console.log(messages)



const Home = () => {
  
  return (
    <>
    <main className='flex-grow flex flex-col item-center  items-center justify-center px-4 md:px-24 py-12'>
      <section className='items-center'>
        <h1 className='text-2xl text-center md:text-4xl font-bold'>Dive into the World of Anonymous Conversation</h1>
        <p className='mt-3 md:mt-4 text-base text-center opacity-60 font-medium md:text-lg'>Explore Anonymous Message where your identity remains a secret</p>
      </section>

      
     
      <Carousel
       plugins={[Autoplay({delay:1000})]}
       className="w-full max-w-sm mt-16"
       
    >
      <CarouselContent>
       { messages.map((message:Message , index:number)=>(
          <CarouselItem key={index} >
            <div className="p-1  ">
              <Card className='h-[200px] '>
                <CardHeader className='items-center justify-center'>{message.title}</CardHeader>
                <CardContent className="flex  items-center justify-center p-4">
                  <span className="text-3xl text-center font-semibold">{message.content}</span>
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
    <Footer/>

    </>
    
  )
}

export default Home
