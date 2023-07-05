import React from 'react'
import PrimaryButton from '../../components/buttons'
import Link from 'next/link'

function Verified() {
    return (
        <div className='flex flex-col w-[100%] mt-[100px] items-center'>
            <div className='w-[80%] flex flex-col items-center gap-[30px]'>
                <Link href='/auth/patient/create' className='w-[100%] flex items-center justify-center'>
                    <PrimaryButton>Create Patient Record</PrimaryButton>
                </Link>
                <Link href='/auth/patient/view' className='w-[100%] flex items-center justify-center'>
                    <PrimaryButton>View Patient Records</PrimaryButton>
                </Link>
            </div>
        </div>
    )
}

export default Verified