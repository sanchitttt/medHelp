import React from 'react'

function PageTitle({ children }: { children: React.ReactNode }) {
    return (
        <div className='text-[18px] font-bold leading-[135%]'>
            {children}
        </div>
    )
}

export default PageTitle