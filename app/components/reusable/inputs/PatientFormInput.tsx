import { PatientFormInput } from '@/app/types'
import React from 'react'

function PatientFormInput({
    value,
    onChangeHandler,
    error,
    errorLabel,
    label,
    success,
    placeholder,
    type = 'text'
}: PatientFormInput) {
    return (
        <div className={`flex flex-col w-[100%] border-[1px] py-[10px] rounded-[5px]  ${value.length ? success ? 'border-green' : 'border-[#f3494c]' : 'border-black'}`}>
            {label && <label className='p-[5px]'>{label}</label>}
            <input
                className=' placeholder:font-normal font-semibold text-[16px] leading-[150%] px-[5px]'
                type={type}
                value={value}
                onChange={onChangeHandler}
                placeholder={placeholder}
            />
            {!success && value.length && errorLabel ?
                <div className='text-red text-[15px] px-[5px] text-[#f3494c]'>
                    {errorLabel}
                </div> : null}
        </div>
    )
}

export default PatientFormInput