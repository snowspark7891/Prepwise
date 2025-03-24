import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Page = () => {
    return (
       <>
       <section className='card-cta'>
           <div className='flex flex-col  gap-6 max-w-lg'>
             <h2>Get Interview-Ready with AI-Powered Practice & Feedback</h2>
             <p className='text-lg'>
                Practice on real interview questions & get instant feedback .
             </p>
             <Button asChild className='btn-primary max-sm:w-full'>
              <Link href='/interview'>
               Start an Interview
              </Link>
             </Button>
           </div>
           <Image src='/robot.png' alt='bot-ken' width={400} height={400} className='max-sm:hidden'/>
       </section>
       </>
    )
}
export default Page
