import React from 'react'
import { ChevronLeft } from './reusable/icons'
import PageTitle from './reusable/text'

function CurrentPage({ pageName }: { pageName: string }) {
    return (
        <div className='relative w-[100%] flex items-center justify-center'>
            <div className='absolute left-[5%] top-[50%] translate-y-[-50%]'

            >
                <ChevronLeft />
            </div>
            <PageTitle>{pageName}</PageTitle>
        </div>
    )
}

export default CurrentPage