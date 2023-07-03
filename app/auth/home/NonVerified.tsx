import axios from 'axios';
import React, { useState } from 'react'
import { PulseLoader } from 'react-spinners'
import config from '../../config';
import { useSession } from 'next-auth/react';

function NonVerified() {
    const [fetching, setFetching] = useState(false);
    const [requestSent, setRequestSent] = useState(false);
    const { data: session, status } = useSession({
        required: true,
    });

    const sendVerificationRequestHandler = () => {
        const fetch = async () => {
            setFetching(true);
            try {
                await axios.post(`${config.BACKEND_ENDPOINT}/verification`, {
                    email: session?.user?.email
                })
                setFetching(false);
                setRequestSent(true)
            } catch (error) {
                setFetching(false);
                console.log(error)
            }
        }
        fetch();
    }
    return (
        <div className='mt-[100px] text-[20px] font-semibold flex flex-col items-center text-center gap-[30px]'>
            You are not verified!
            <button
                onClick={sendVerificationRequestHandler}
                className='w-[90%] bg-green px-[30px] flex items-center justify-center text-white font-semibold text-[16px] h-[56px] rounded-full'
            >
                {fetching ? <PulseLoader size={10} color="#fff" /> : requestSent ? "Your verification request has been sent to admin" : "Send a verification request to admin"}
            </button>
        </div>
    )
}

export default NonVerified