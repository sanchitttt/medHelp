'use client';
import React, { useEffect, useState } from 'react'
import CurrentPage from '../components/CurrentPage';
import EmailInput from '../components/reusable/inputs/EmailInput';
import PasswordInput from '../components/reusable/inputs/PasswordInput';
import NameInput from '../components/reusable/inputs/NameInput';
import Link from 'next/link';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
let emailColor: null | string = null;

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (email.match(emailRegex)) {
            emailColor = '#199A8E'
        } else {
            emailColor = null;
        }
    }, [email]);


    return (
        <main className='w-[100vw] max-w-[512px] h-[100vh] flex items-center justify-center'>
            <div className='w-[95%] flex flex-col items-center h-[95%]'>
                <CurrentPage pageName='Sign Up' />
                <div className='w-[95%] mt-[100px] flex flex-col items-center gap-[20px]'>
                    <NameInput
                        value={name}
                        onChangeHandler={(e) => setName(e.target.value)}
                    />
                    <EmailInput
                        value={email}
                        emailColor={emailColor}
                        onChangeHandler={(e) => setEmail(e.target.value)}
                    />
                    <PasswordInput
                        value={password}
                        passwordColor={password.length > 0 ? '#199A8E' : '#A1A8B0'}
                        onChangeHandler={(e) => setPassword(e.target.value)}
                    />
                    <button className='w-[90%] bg-green flex items-center justify-center text-white font-semibold text-[16px] h-[56px] rounded-full'>
                        Sign Up
                    </button>
                    <div className='text-[15px] font-normal text-grey'>
                        {"Already have an account? "}
                        <Link href='/login'>
                            <span className='text-green text-[15px]'>
                                Login
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Signup;
