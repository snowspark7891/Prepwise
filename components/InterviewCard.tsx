import React from 'react'
import dayjs  from "dayjs";
import Image from "next/image";
import {getRandomInterviewCover} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import DisplayTechicon from "@/components/DisplayTechicon";
const InterviewCard = ({interviewId,userId,role,type,techstack,createdAt}:InterviewCardProps) => {

  const feedback = null as Feedback | null;
  //for mixed type interviews
    const normalizedType = /mix/gi.test(type) ? 'Mixed' : type;
    const formatedDate = dayjs(feedback?.createdAt || createdAt || Date.now()).format('DD MMM YYYY ');
    return (
        <div className='card-border w-[360px] max-sm:w-full min-h-96'>
            <div className='card-interview'>
                <div className='absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg bg-light-600'>
                    <p className='badge-text'>{normalizedType}</p>
                </div>
                <Image src={getRandomInterviewCover()} alt='interview' width={90} height={90} className='rounded-full object-fit size-[90px]'/>
                <h3 className='mt-5 capitalize'>
                    {role} interview
                </h3>
                <div className='flex flex-row gap-5 mt-3'>
                    <div className='flex flex-row gap-2'>
                        <Image src='/calendar.svg' alt='calender' height={22} width={22} />
                        <p>{formatedDate}</p>
                    </div>
                    <div className='flex flex-row gap-2 items-center'>
                        <Image src='/star.svg' alt='star' height={22} width={22} />
                        <p>{feedback?.totalScore || '---'}/100</p>
                    </div>
                </div>
                <p className='line-clamp-2 mt-5'>
                    {feedback?.finalAssessment || "you haven't taken the interview yet. Take it now to improve " +
                        "your skills."}
                </p>

                <div className='flex flex-row justify-between'>
                   <DisplayTechicon techStack={techstack} />
                    <Button className='btn-primary'>
                        <Link href={feedback?`/interview/${interviewId}/feedback`
                            : `/interview/${interviewId}`} className='flex items-center gap-2'>
                            {feedback ? 'Check Feedback': 'View Interview'}
                        </Link>
                    </Button>
                </div>
            </div>


        </div>
    )
}
export default InterviewCard;
