"use client";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import axios from 'axios';
import { useToast } from '@/components/ui/use-toast';
import { useSession } from 'next-auth/react';

type User = {
  username: string;
  email: string;
};

const Message = () => {
  const { toast } = useToast();
  const [content, setcontent] = useState("");
  const [answer, setAnswer] = useState<string[]>([]);
  const [loading, setloading] = useState(false);

  const { data: session } = useSession();
  const username = session?.user ? (session.user as User).username : null;

  const handlemessage = async () => {
    if (!username) {
      toast({
        title: "Error",
        description: "Username not found in the URL",
      });
      return;
    }

    try {
      const response = await axios.post('/api/send-message', { username, content });
      if (response.data.success) {
        toast({
          title: "Success",
          description: "Message sent successfully",
        });
        console.log(response);
      } else {
        toast({
          title: "Failed",
          description: "Message was not sent",
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Failed",
        description: "Error occurred",
      });
    }
  };

  const suggestMessage = async () => {
    try {
      setloading(true);

      const prompt = "Create a list of six open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal and sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What's your hobby you've recently started? || If you could have dinner with any historical figure, who would it be? || What's a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

      const response = await axios({
        method: 'post',
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API}`,
        data: {
          contents: [{
            parts: [{
              text: prompt,
            }],
          }],
        },
      });

      console.log("API data:", response.data);

      const generatedText = response.data.candidates[0]?.content?.parts[0]?.text || "";

      const questionList = generatedText.split('||').map((question: String) => question.trim()).filter((question: String) => question);

      setAnswer(questionList);
      setloading(false);
    } catch (error) {
      console.error("Error generating answer:", error);
      setloading(false);
    }
  };

  if (!session || !session.user) {
    return (
      <div>Login First....</div>
    );
  }

  return (
    <>
      <div className='text-4xl text-center items-baseline flex justify-center shadow-sm h-[100px]'>
        <h2 className='mt-7 font-medium'>Public Profile </h2>
      </div>

      <div className='m-10 mx-20'>
        <span className='font-medium opacity-65'>Send Anonymous message to @{username}</span>
        <Input className='mt-4 h-12' type="text" placeholder='Type your anonymous message here' value={content} onChange={(e) => setcontent(e.target.value)} />
        <Button className='mt-4 bg-gray-600' onClick={handlemessage}>Send Message</Button>
      </div>

      <div className='m-10 mx-20'>
        <p className='mt-5 opacity-65'>Click on any message below to select it</p>
        <Button className='mt-5' onClick={suggestMessage} disabled={loading}>
          {loading ? 'Generating...' : 'Get Messages'}
        </Button>
        <div className='mt-7 grid grid-cols-1 md:grid-cols-2 gap-6'>
          {answer.length > 0 ? (
            answer.map((question, index) => (
              <div key={index} className="p-4 border border-gray-300 rounded"  onClick={()=>setcontent(question)}>
                <p>{question}</p>
               
              </div>
            ))
          ) : (
            <p>No messages to display</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Message;
