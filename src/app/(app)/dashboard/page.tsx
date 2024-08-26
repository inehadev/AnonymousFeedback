"use client"
import { useToast } from "@/components/ui/use-toast"
import { Message } from '@/model/UserModel'
import { acceptMessageSchema } from '@/schemas/acceptMessageSchema'
import { ApiResponse } from '@/types/ApiRespose'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import { User } from 'next-auth'
import { useSession } from 'next-auth/react'
import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { Loader2, RefreshCcw } from 'lucide-react'
import MessageCard from '@/components/MessageCard'

const DashBoard = () => {

  const { toast } = useToast()
  const [messages, setmessages] = useState<Message[]>([])
  const [loading, setloading] = useState(false);
  const [switchload, setswitchload] = useState(false)
  const { data: session } = useSession()


  const handleDeleteMessage = (messageId: string) => {
    setmessages(messages.filter((message) => message._id != messageId))
  }


  const form = useForm({
    resolver: zodResolver(acceptMessageSchema)
  })

  const { register, watch, setValue } = form;
  const acceptMessage = watch('acceptMessages')

  const fetchAcceptMessage = useCallback(async () => {
    setswitchload(true)
    try {

      const res = await axios.get<ApiResponse>('/api/accept-message')
      setValue('acceptMessages', res.data.isAcceptingMessages)

    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: 'Error',
        description: axiosError.response?.data.message || "Failed to Fetch message",
        variant: "destructive"
      })

    } finally {
      setswitchload(false);
    }
  }, [setValue, toast])

  const fetchMessages = useCallback(async (refresh: boolean = false) => {
    setloading(true)
    setswitchload(false)
    try {
      const res = await axios.get<ApiResponse>('/api/get-messags')
      setmessages(res.data.messages || [])
      if (refresh) {
        toast({
          title: "Refresh Messages",
          description: "Showing Latest messages",
        })
      }

    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: 'Error',
        description: axiosError.response?.data.message || "Failed to Fetch message",
        variant: "destructive"
      })

    } finally {
      setloading(false)
      setswitchload(false);
    }

  }, [setloading , toast])

  useEffect(() => {

    if (!session || session.user) return
    fetchMessages()
    fetchAcceptMessage()


  }, [session, setValue, fetchAcceptMessage, fetchMessages])

  /// handling switch change 

  const handleSwitchChange = async () => {
    try {
      const res = await axios.post<ApiResponse>('/api/accept-message', {
        acceptMessage: !acceptMessage
      })
      setValue('acceptMessages', !'acceptMessages')
      toast({

        title: res.data.message,
        variant: "default"
      })


    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: 'Error',
        description: axiosError.response?.data.message || "Failed to Fetch message",
        variant: "destructive"
      })

    }
  }

  if (!session || !session.user) {
    return <div>Please log in first.</div>;
  }
  const { username } = session?.user as User
  const baseUrl = `${window.location.protocol}//${window.location.host}`
  const profileUrl = `${baseUrl}/u/${username}`
  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl)
    toast({
      title: "Url Copied",
      description: "Profile Url has beeen Copied "
    })
  }

  if (!session || !session.user) {

    return <div>Loign First</div>
  }

  return (
    <div className='my-8 mx-4 md:mx-8 lg:mx-auto p-6 bg-white rounded w-full max-w-6xl'>
      <h1 className='text-4xl font-bold mb-4'>User DashBoard</h1>

      <div className='mb-4'>
        <h2 className='text-lg font-semibold mb-2'>Copy Your Unique Link</h2>
        <div className='flex items-center'>
          <input type="text" value={profileUrl} disabled className='input input-bordered w-full p-2 mr-2' />
          
          <Button onClick={copyToClipboard}>Copy</Button>

        </div>


      </div>

      <div className='mb-4'>
        <Switch {...register('acceptMessage')}
          checked={acceptMessage}
          onCheckedChange={handleSwitchChange}
          disabled={switchload} />

        <span className='ml-2'>
          Accept Messages: {acceptMessage ? 'On' : 'Off'}
        </span>

      </div>

      <Separator />

      <Button className='mt-4 variant = outline ' onClick={(e) => { e.preventDefault(); fetchMessages(true) }}>
        {loading ? (
          <Loader2 className='h-4 w-4 animate-spin' />

        ) : (
          <RefreshCcw className='h-4 w-4' />
        )}
      </Button>

      <div className='mt-4 grid grid-cols-1 mf=d:grid-cols-2 gap-6'>
        {messages.length > 0 ? (
          messages.map((message )=>(
            <MessageCard
            key={message._id as string}
            message={message}
            onmessageDelete={handleDeleteMessage}
          />
          ))
        ) : (
          <p>No message to display</p>
        )}
      </div>


    </div>
  )
}

export default DashBoard



