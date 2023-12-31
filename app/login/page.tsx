'use client';
import { useState } from 'react'
import CurrentPage from '../components/CurrentPage';
import { signIn, useSession } from 'next-auth/react';
import EmailInput from '../components/reusable/inputs/EmailInput';
import PasswordInput from '../components/reusable/inputs/PasswordInput';
import LoginButton from './LoginButton';
import Link from 'next/link';
import GoogleLogin from './GoogleLogin';
import validator from 'validator';
import { ToastContainer, toast } from 'react-toastify';
import { PulseLoader, SyncLoader } from 'react-spinners';
import 'react-toastify/dist/ReactToastify.css';
import { redirect } from 'next/navigation';
import axios from 'axios';
import config from '../config';
import { useRouter } from 'next/navigation';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fetching, setFetching] = useState(false);
    const { data: session, status } = useSession();
    const router = useRouter();

    const loginButtonHandler = () => {
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

        if (validFields) {
            const status = signIn('credentials', { email: email, password: password, redirect: false, callbackUrl: '/home' });
            status.then((res) => {
                if (res?.error === "CredentialsSignin") {
                    toast.error('Invalid credentials', {
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
            }).catch((err) => {

            })
            // setFetching(true)
            // const verifyLogin = async () => {
            //     const response = await axios.post(`${config.BACKEND_ENDPOINT}/auth/login`, {
            //         email: email,
            //         password: password
            //     })
            //     console.log(response);
            //     return true;
            // }
            // verifyLogin().then(() => {
            //     setFetching(false)
            //     toast.success('Welcome back, redirecting you...', {
            //         position: "bottom-center",
            //         autoClose: 2000,
            //         hideProgressBar: false,
            //         closeOnClick: true,
            //         pauseOnHover: true,
            //         draggable: true,
            //         progress: undefined,
            //         theme: "colored",
            //     });
            //     try {
            //         router.push('/home')
            //     } catch (error) {
            //         console.log(error);
            //     }


            // }).catch((err) => {
            //     setFetching(false)
            //     toast.error(err.response.data, {
            //         position: "bottom-center",
            //         autoClose: 3000,
            //         hideProgressBar: false,
            //         closeOnClick: true,
            //         pauseOnHover: true,
            //         draggable: true,
            //         progress: undefined,
            //         theme: "light",
            //     });
            // })
        }
    }

    if (status === 'loading') {
        return <div className='absolute left-[50%] top-[50%]' style={{ transform: 'translate(-50%,-50%)' }}>
            <SyncLoader color="#36d7b7" />
        </div>
    }

    if (session) {
        redirect('/home');
    }

    return (
        <>
            <CurrentPage pageName='Login' />
            <div className='w-[95%] mt-[100px] flex flex-col items-center gap-[20px]'>
                <EmailInput
                    value={email}
                    onChangeHandler={(e) => setEmail(e.target.value)}
                />
                <PasswordInput
                    value={password}
                    passwordColor={password.length > 7 ? '#199A8E' : '#A1A8B0'}
                    onChangeHandler={(e) => setPassword(e.target.value)}
                />
                <LoginButton loginButtonHandler={loginButtonHandler}>
                    {fetching ? <PulseLoader size={10} color="#fff" /> : "Login"}
                </LoginButton>
                <div className='text-[15px] font-normal text-grey'>
                    {"Don't have an account? "}
                    <Link href='/signup'>
                        <span className='text-green text-[15px]'>
                            Sign Up
                        </span>
                    </Link>
                </div>
                <div className='flex w-[100%] items-center justify-between'>
                    <div className='w-[40%] h-[1px] bg-black' />
                    <div>OR</div>
                    <div className='w-[40%] h-[1px] bg-black' />
                </div>
                <div className='mt-[50px] flex flex-col w-[100%]'>
                    <GoogleLogin />
                </div>
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

export default Login