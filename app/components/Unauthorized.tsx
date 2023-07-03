import React from 'react'

function Unauthorized() {
    return <div className='w-[100vw] h-[100vh] flex items-center justify-center'>
        <div className='max-w-[300px] w-[100%] h-[300px] rounded-[10px] flex items-center flex-col bg-green justify-center gap-[30px]'>
            <div className='max-w-[200px] text-center text-white' >You need to be logged in to view this page</div>
            {/* <Link href='/login'> */}
            <button
                className='px-[30px] rounded-full bg-white py-[10px] border-[1px] border-lightGrey'
            >
                Log in
            </button>
            {/* </Link> */}

        </div>
    </div>
}

export default Unauthorized