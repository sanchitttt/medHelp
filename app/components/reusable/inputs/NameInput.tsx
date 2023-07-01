import Image from 'next/image'
import React from 'react'
import { EmailIcon, TickGreenIcon } from '../icons'

function NameInput({ value, onChangeHandler }: {
    value: string,
    onChangeHandler: React.ChangeEventHandler<HTMLInputElement>

}) {
    return (
        <div className='w-[100%] h-[56px] flex items-center rounded-full bg-lightGrey border-[1px] border-[#A1A8B0]'>
            <div className='w-[20%] flex items-center justify-center'>
                <EmailIcon fill={value.length > 0 ? '#199A8E' : '#A1A8B0'} />
            </div>
            <input
                type='email'
                className='w-[75%] placeholder:font-normal font-semibold text-[16px] leading-[150%] '
                value={value}
                onChange={onChangeHandler}
                placeholder='Enter your name'
            />
        </div>
    )
}

export default NameInput