import { Session } from 'next-auth'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'
import NonVerified from './NonVerified'
import Verified from './Verified'

function Authorized({ session, verifiedStatus }: {
    session: Session,
    verifiedStatus: boolean
}) {
    return (
        <>
            <div className='w-[100%] flex items-center justify-between'>
                <div className='flex gap-[15px] items-center'>
                    {session?.user?.image && <Image
                        src={session.user?.image as string}
                        className='rounded-full'
                        width={32}
                        height={32}
                        alt='Profile image'
                    />}
                    <div className='text-[15px]'>Welcome {session.user?.name?.split(' ')[0]}</div>
                </div>
                <button
                    className='py-[10px] px-[20px] flex items-center justify-center bg-green text-white rounded-full'
                    onClick={() => signOut()}
                >
                    Sign out
                </button>

            </div>
            {
                !verifiedStatus
                    ?
                    <NonVerified /> :
                    <Verified />
            }
        </>
    )
}

export default Authorized