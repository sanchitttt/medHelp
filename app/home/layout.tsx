'use client';
import { signOut, useSession } from 'next-auth/react';
import React, { useEffect } from 'react'

function HomeLayout({ children }: {
    children: React.ReactNode
}) {
    const { data: session } = useSession();
    return (
        <main className='w-[100vw] max-w-[512px] h-[100vh] flex items-center justify-center'>
            <div className='w-[95%] flex flex-col items-center h-[95%]'>
                {children}
            </div>
        </main>
    )
}

export default HomeLayout;