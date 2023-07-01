'use client';
import { signOut, useSession } from "next-auth/react"
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { SyncLoader } from "react-spinners";

export default function Home() {

  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      redirect('/login')
    },
  });
  if (status === 'loading') {
    return <div className='absolute left-[50%] top-[50%]' style={{ transform: 'translate(-50%,-50%)' }}>
      <SyncLoader color="#36d7b7" />
    </div>
  }
  if (session) {
    return (
      <>
        <div className='w-[100%] flex items-center justify-between'>
          <div className='flex gap-[15px] items-center'>
            <Image
              src={session.user?.image as string}
              className='rounded-full'
              width={32}
              height={32}
              alt='Profile image'
            />
            <div className='text-[15px]'>Welcome {session.user?.name?.split(' ')[0]}</div>
          </div>
          <button
            className='py-[10px] px-[20px] flex items-center justify-center bg-green text-white rounded-full'
            onClick={() => signOut()}
          >
            Sign out
          </button>
        </div>
      </>
    )
  }
  else {
    return <div className='w-[100vw] h-[100vh] flex items-center justify-center'>
      <div className='max-w-[300px] w-[100%] h-[300px] rounded-[10px] flex items-center flex-col bg-green justify-center gap-[30px]'>
        <div className='max-w-[200px] text-center text-white' >You need to be logged in to view this page</div>
        <Link href='/login'>
          <button
            className='px-[30px] rounded-full bg-white py-[10px] border-[1px] border-lightGrey'
          >
            Log in
          </button>
        </Link>
      </div>
    </div>

  }

}
