'use client';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React from 'react'
import { SyncLoader } from 'react-spinners';
import Unauthorized from '../components/Unauthorized';

function ProtectedRoutesLayout({ children }: {
    children: React.ReactNode
}) {
    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            // The user is not authenticated
            redirect('/login')
        },
    });
    if (status === 'loading') {
        return <div className='absolute left-[50%] top-[50%]' style={{ transform: 'translate(-50%,-50%)' }}>
            <SyncLoader color="#36d7b7" />
        </div>
    }
    if (session) return (
        children
    )
    else {
        return <Unauthorized />
    }
}

export default ProtectedRoutesLayout