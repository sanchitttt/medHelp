import Image from 'next/image'
import React from 'react'

function TagCapsule({ children, removeHandler, removeShouldWork = true }: {
    children: React.ReactNode,
    removeHandler?: React.MouseEventHandler<HTMLElement>,
    removeShouldWork?: boolean
}) {
    return (
        <div
            className='inline flex gap-[2.5px] border-green bg-white py-[5px] rounded-full px-[10px] border-[1px]'
        >
            {children}
            {removeHandler && removeShouldWork && <Image
                src='/CancelIcon.svg'
                width={18}
                height={18}
                alt='Cancel'
                onClick={removeHandler}
            />}
        </div>
    )
}

export default TagCapsule