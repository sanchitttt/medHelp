import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React from 'react'

function LoginLayout({ children }: {
    children: React.ReactNode
}) {
    // const { data: session } = useSession();
    // if (session) {
    //     redirect('/login')
    // }
    return (
        <main className='w-[100vw] max-w-[512px] h-[100vh] flex items-center justify-center'>
            <div className='w-[95%] flex flex-col items-center h-[95%]'>
                {children}
            </div>
        </main>
    )
}

export default LoginLayout;