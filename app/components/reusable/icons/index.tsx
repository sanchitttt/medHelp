import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

export function ChevronLeft() {
    const router = useRouter()
    return (
        <button  onClick={() => router.back()}>
            <Image
               
                src='/LeftChevron.svg'
                width={8}
                height={15.8}
                alt='Go Back'
                className='pointer'
            />
        </button>
    )
}


export function EmailIcon({ fill = '#A1A8B0' }: {
    fill?: string
}) {
    return <svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M17 20.5H7C4 20.5 2 19 2 15.5V8.5C2 5 4 3.5 7 3.5H17C20 3.5 22 5 22 8.5V15.5C22 19 20 20.5 17 20.5Z"
            stroke={fill}
            strokeWidth={1.5}
            strokeMiterlimit={10}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M17 9L13.87 11.5C12.84 12.32 11.15 12.32 10.12 11.5L7 9"
            stroke={fill}
            strokeWidth={1.5}
            strokeMiterlimit={10}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
}

export function TickGreenIcon() {
    return <Image
        src='/TickGreen.svg'
        width={16}
        height={16}
        alt='Valid field'
    />
}

export function PasswordIcon({ fill = '#A1A8B0' }: {
    fill?: string
}) {
    return <svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M6 10V8C6 4.69 7 2 12 2C17 2 18 4.69 18 8V10"
            stroke={fill}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M17 22H7C3 22 2 21 2 17V15C2 11 3 10 7 10H17C21 10 22 11 22 15V17C22 21 21 22 17 22Z"
            stroke={fill}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M15.9965 16H16.0054"
            stroke={fill}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M11.9955 16H12.0045"
            stroke={fill}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M7.99451 16H8.00349"
            stroke={fill}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
}

export function NameIcon({ fill = '#A1A8B0' }: {
    fill?: string
}) {
    return <svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
            stroke={fill}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M20.59 22C20.59 18.13 16.74 15 12 15C7.26 15 3.41 18.13 3.41 22"
            stroke={fill}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
}