'use client';
import React, { useEffect, useState } from 'react'
import CurrentPage from '../components/CurrentPage';
import EmailInput from '../components/reusable/inputs/EmailInput';
import PasswordInput from '../components/reusable/inputs/PasswordInput';
import NameInput from '../components/reusable/inputs/NameInput';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import validator from 'validator';
import axios from 'axios';
import config from '../config';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
let emailColor: null | string = null;

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showVerificationLinkModal, setShowVerificationLinkModal] = useState(false);
    const [fetching, setFetching] = useState(false);

    const handleSignup = () => {
        let validFields = true;
        if (!validator.isEmail(email)) {
            validFields = false;
            toast.error('Invalid email', {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        if (password.length <= 7) {
            validFields = false;
            toast.error('Password should be atleast 8 characters long', {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }

        if (!name.length) {
            validFields = false;
            toast.error('Name cant be empty', {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        if (validFields) {
            setFetching(true)
            const signup = async () => {
                const response = await axios.post(`${config.BACKEND_ENDPOINT}/auth/signup`, {
                    email: email,
                    password: password,
                    name: name
                })
            }

            signup().then(() => {
                setShowVerificationLinkModal(true);
                setFetching(false);
            }).catch((err) => {
                setFetching(false)
                toast.error(err.response.data.message, {
                    position: "bottom-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            });
        }
    }

    return (
        <>
            <CurrentPage pageName='Sign Up' />
            <div className='w-[95%] mt-[100px] flex flex-col items-center gap-[20px]'>
                <NameInput
                    value={name}
                    onChangeHandler={(e) => setName(e.target.value)}
                />
                <EmailInput
                    value={email}
                    onChangeHandler={(e) => setEmail(e.target.value)}
                />
                <PasswordInput
                    value={password}
                    passwordColor={password.length > 0 ? '#199A8E' : '#A1A8B0'}
                    onChangeHandler={(e) => setPassword(e.target.value)}
                />
                <button
                    className='w-[90%] bg-green flex items-center justify-center text-white font-semibold text-[16px] h-[56px] rounded-full'
                    onClick={handleSignup}
                >
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
                {showVerificationLinkModal &&
                    <div className='border-[1px] text-center  font-semibold border-[#199a8e99] w-[100%] h-[60px] flex items-center justify-center text-black rounded-[10px] px-[10px] py-[10px]'>
                        A verification link has been sent to your email. Expires in 10 minutes.
                    </div>}
            </div>

            <ToastContainer
                position="bottom-center"
                autoClose={3500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    )
}

export default Signup;
