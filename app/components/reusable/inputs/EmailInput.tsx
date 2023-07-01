import Image from 'next/image'
import React from 'react'
import { EmailIcon, TickGreenIcon } from '../icons'

function EmailInput({ value, onChangeHandler, emailColor }: {
    value: string,
    emailColor: null | string,
    onChangeHandler: React.ChangeEventHandler<HTMLInputElement>

}) {
    return (
        <div className='w-[100%] h-[56px] flex items-center rounded-full bg-lightGrey border-[1px] border-[#A1A8B0]'>
            <div className='w-[20%] flex items-center justify-center'>
                <EmailIcon fill={emailColor ? emailColor : '#A1A8B0'} />
            </div>
            <input
                type='email'
                className='w-[65%] placeholder:font-normal font-semibold text-[16px] leading-[150%] '
                value={value}
                onChange={onChangeHandler}
                placeholder='Enter your email'
            />
            <div className='15%'>
                {emailColor && <TickGreenIcon />}
            </div>
        </div>
    )
}

export default EmailInput