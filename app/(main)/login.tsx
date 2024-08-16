'use client';
import Link from 'next/link';


export default function LoginButton(user: any) {
    console.log(user)
    return (
        <Link href='/signin' className='bg-neutral-900 mt-6 text-sm hover:bg-neutral-700 text-white py-2 font-semibold px-4 rounded-lg w-full"'>
            Sign in
        </Link>
    );
}