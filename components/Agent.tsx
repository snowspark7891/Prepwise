'use client'
import React, { use, useState } from 'react'
import Image from "next/image"
import {cn} from "@/lib/utils";
import { useRouter } from 'next/navigation';
import { error } from 'console';


enum CallSatus {
    INACTIVE = 'INACTIVE',
    CONNECTING = 'CONNECTING',
    ACTIVE = 'ACTIVE',
    FINISHED = 'FINISHED',
}

interface SavedMessage{
    role: 'user' | 'assistant' | 'system';
    content: string;
}
const Agent = ({userName,userId,type}:AgentProps) => {
    const router = useRouter();
    const [isSpeaking, setisSpeaking] = useState(false)
    const [callStatus, setcallStatus] = useState<CallSatus>(CallSatus.INACTIVE)
    const [messages, setMessages] = useState<SavedMessage[]>([])


    useEffect(() => {
        const onCallStart = ()=>{ setcallStatus(CallSatus.ACTIVE)}
        const onCallEnd = () => {
          setcallStatus(CallSatus.FINISHED);
        };
        const onMessage = (messages: Message)=>{
            if(messages.type==='transcript' && messages.transcriptType === 'final'){
                const newMessage = {role: messages.role , content : messages.transcript}
                setMessages((prev) => [...prev, newMessage]);
            }
        }

        const onSpeechStart = () => {
            setisSpeaking(true);
        };
          const onSpeechEnd = () => {
            setisSpeaking(false);
          };
         
        const onError =(error:Error)=>{
            console.log('Error',error)
            setcallStatus(CallSatus.FINISHED)
        }  
    },[])
    // const  callStatus  = CallSatus.FINISHED
    // const isSpeaking = true;
    // const messages = [
    //     'Whats your name ?',
    //     'My name is Neha, nice to meet you !',

    // ];
    // const lastMessage = messages[messages.length - 1]
   
    return (
        <>
        <div className='call-view'>
            <div className='card-interviewer'>
                <div className='avatar'>
                      <Image src='/ai-avatar.png' alt='Ken' width={65} height={54} className='object-cover'/>
                    {isSpeaking && <span className='animate-speak'/>}
                </div>
                <h3>
                    AI Interviewer
                </h3>
            </div>
            <div className='card-border'>
                 <div className='card-content'>
                     <Image src='/user-avatar.png' alt='user' width={540} height={54} className='rounded-full object-cover size-[120px]'/>
                     <h3>
                         {userName}
                     </h3>
                 </div>
            </div>
        </div>
            {messages.length > 0 && (
                <div className='transcript-border'>
                       <div className="transcript">
                          <p key={lastMessage} className={cn("transition-opacity duration-500 opacity-0 ","animate-fadeIn opacity-100")}>
                              {lastMessage}
                          </p>
                       </div>
                </div>
            )}

            <div className='w-full flex justify-center'>

                {callStatus != 'ACTIVE' ? (  <button className='relative btn-call'>
                        <span className={cn('absolute animate-ping rounded-full opacity-75' , callStatus != 'CONNECTING' & 'hidden')}
                         />
                      <span>
                               {callStatus === 'INACTIVE' || callStatus === 'FINISHED' ? 'Call' : '...'}
                      </span>
                </button>):(
                    <button className='btn-disconnect'>
                        end
                    </button>
                )
                }
            </div>

        </>
    )
}
export default Agent

