'use client';
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation";
import { SyncLoader } from "react-spinners";
import { useEffect, useState } from 'react';
import axios from "axios";
import config from "../../config";
import Authorized from "./Authorized";
import { Session } from "next-auth";

export default function Home() {
  const [verifiedStatus, setVerifiedStatus] = useState(false);
  const [checkingVerifiedStatus, setCheckingVerifiedStatus] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      const getUserDetails = async () => {
        const response = await axios.get(`${config.BACKEND_ENDPOINT}/users?email=${session?.user?.email}`);
        if (response?.data?.status === 'nonVerified') {
          setVerifiedStatus(false)
        }
        else {
          setVerifiedStatus(true);
        }
        setCheckingVerifiedStatus(false);
      }
      getUserDetails();
    }
  }, [session]);


  if (checkingVerifiedStatus) {
    return <div className='absolute left-[50%] top-[50%]' style={{ transform: 'translate(-50%,-50%)' }}>
      <SyncLoader color="#36d7b7" />
    </div>
  }

  return <Authorized session={session as Session} verifiedStatus={verifiedStatus} />

}
