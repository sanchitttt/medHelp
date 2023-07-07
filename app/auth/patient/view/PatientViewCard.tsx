import Image from 'next/image'
import React from 'react'

function PatientViewCard({ name, contact, _id }: {
    _id: string,
    name: string,
    contact: string
}) {
    return (
        <div className='flex flex-col items-center hover:scale-[1.05]'
        >
            <Image
                src='/folder.png'
                width={100}
                height={100}
                alt={`${name}'s records`}
            />
            <div className='flex flex-col items-center'>
                <div className='font-semibold'>{name}</div>
                <div className='font-light text-[12px]'>{contact}</div>
            </div>
        </div>
    )
}

export default PatientViewCard