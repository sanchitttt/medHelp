'use client';
import React from 'react'

function LoginButton({ loginButtonHandler }: {
    loginButtonHandler: React.MouseEventHandler<HTMLButtonElement>
}) {

    return (
        <button
            className='w-[90%] bg-green flex items-center justify-center text-white font-semibold text-[16px] h-[56px] rounded-full'
            onClick={loginButtonHandler}
        >
            Login
        </button>
    )
}

export default LoginButton