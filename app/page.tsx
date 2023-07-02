'use client';
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation';
import React from 'react'
import { SyncLoader } from 'react-spinners';

function RootPage() {
    const { data: session, status } = useSession();

    if (status === 'loading') {
        return <div className='absolute left-[50%] top-[50%]' style={{ transform: 'translate(-50%,-50%)' }}>
            <SyncLoader color="#36d7b7" />
        </div>
    }
    if (session) {
        redirect('/home');
    }
    return (
        <main className='w-[100vw] max-w-[512px] h-[100vh] flex items-center justify-center'>
            <div className='w-[95%] flex flex-col items-center h-[95%] gap-[60px]'>
                <div className='w-[100vw] h-[300px] flex flex-col justify-end items-center'>
                    <Image
                        src='/Doctor.svg'
                        width={115}
                        height={100}
                        alt='Doctor'
                    />
                    <h6 className='text-[#9AA0B8] text-[18px] text-center font-semibold mt-[30px]'>Welcome to</h6>
                    <h1 className='text-black text-[28px] text-center'>Medhelp</h1>
                </div>
                <div className='flex flex-col gap-[20px] w-[100%] items-center'>
                    <Link href='/login' className='w-[100%] items-center flex justify-center'>
                        <button className='w-[90%] bg-green flex items-center justify-center text-white font-semibold text-[16px] h-[56px] rounded-full'>Login</button>
                    </Link>
                    <Link href='/signup' className='w-[100%] items-center flex justify-center'>
                        <button className='w-[90%] bg-green flex items-center justify-center text-white font-semibold text-[16px] h-[56px] rounded-full'>Sign Up</button>
                    </Link>
                </div>
            </div>
        </main>
    )
}

export default RootPage