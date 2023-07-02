import React from 'react'
import PrimaryButton from '../components/buttons'

function Verified() {
    return (
        <div className='flex flex-col w-[100%] mt-[100px] items-center'>
            <div className='w-[80%] flex flex-col items-center gap-[30px]'>
                <PrimaryButton>View Patient Records</PrimaryButton>
                <PrimaryButton>Create Patient Record</PrimaryButton>
            </div>
        </div>
    )
}

export default Verified