import Image from 'next/image'
import React from 'react'

function TagCapsule({ children, removeHandler }: {
    children: React.ReactNode,
    removeHandler: React.MouseEventHandler<HTMLElement>
}) {
    return (
        <div
            className='inline flex gap-[2.5px] border-green bg-white py-[5px] rounded-full px-[10px] border-[1px]'
        >
            {children} <Image
                src='/CancelIcon.svg'
                width={18}
                height={18}
                alt='Cancel'
                onClick={removeHandler}
            />
        </div>
    )
}

export default TagCapsule