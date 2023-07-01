'use client';
import React, { useEffect, useState } from 'react'
import CurrentPage from '../CurrentPage'
import EmailInput from './EmailInput'
import PasswordInput from './PasswordInput';
import Image from 'next/image';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
let emailColor: null | string = null;

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (email.match(emailRegex)) {
            emailColor = '#199A8E'
        } else {
            emailColor = null;
        }
    }, [email]);

    useEffect(() => {
        // if (password.match(emailRegex)) {
        //     emailColor = '#199A8E'
        // } else {
        //     emailColor = null;
        // }
    }, [password]);

    return (
        <main className='w-[100vw] h-[100vh] flex items-center justify-center'>
            <div className='w-[95%] flex flex-col items-center h-[95%]'>
                <CurrentPage pageName='Login' />
                <div className='w-[95%] mt-[100px] flex flex-col items-center gap-[20px]'>
                    <EmailInput
                        value={email}
                        emailColor={emailColor}
                        onChangeHandler={(e) => setEmail(e.target.value)}
                    />
                    <PasswordInput
                        value={password}
                        passwordColor={'#A1A8B0'}
                        onChangeHandler={(e) => setPassword(e.target.value)}
                    />
                    <button className='w-[90%] bg-green flex items-center justify-center text-white font-semibold text-[16px] h-[56px] rounded-full'>
                        Login
                    </button>
                    <div className='text-[15px] font-normal text-grey'>
                        {"Don't have an account? "}<span className='text-green text-[15px]'> Sign Up</span>
                    </div>
                    <div className='flex w-[100%] items-center justify-between'>
                        <div className='w-[40%] h-[1px] bg-black' />
                        <div>OR</div>
                        <div className='w-[40%] h-[1px] bg-black' />
                    </div>
                    <div className='mt-[50px] flex flex-col w-[100%]'>
                        <button className='w-[100%] h-[56px] flex items-center justify-center bg-white rounded-full border-[1px] border-lightGrey'>
                            <div className='w-[90%] flex items-center justify-between'>
                                <Image
                                    src='/Google.jpg'
                                    width={20}
                                    height={20}
                                    alt='Google'
                                />
                                <div className='text-semibold font-semibold text-black '>
                                    Login with Google
                                </div>
                                <div></div>
                            </div>
                        </button>
                    </div>
                </div>
            </div>

        </main>
    )
}

export default Login