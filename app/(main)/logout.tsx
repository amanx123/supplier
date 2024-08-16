'use client';

import { logout } from '@/actions/auth';
import Link from 'next/link';


export default function LogoutButton() {
    return (
        <button onClick={async () => await logout()} className="bg-neutral-900 mt-6 text-sm hover:bg-neutral-700 text-white py-2 font-semibold px-4 rounded-lg w-52"
        >
            Sign out
        </button>

    );
}