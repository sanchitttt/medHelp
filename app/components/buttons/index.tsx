'use client';
import React from 'react'

function PrimaryButton({ children, loginButtonHandler, className }: {
    children: React.ReactNode,
    loginButtonHandler?: React.MouseEventHandler<HTMLButtonElement>,
    className?: string
}) {

    return (
        <button
            className={`hover:scale-[1.01] w-[90%] bg-green flex items-center justify-center text-white font-semibold text-[16px] h-[56px] rounded-full  ` + className}
            onClick={loginButtonHandler}
        >
            {children}
        </button>
    )
}

export default PrimaryButton