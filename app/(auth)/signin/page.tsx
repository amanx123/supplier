'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { toast } from 'sonner'
import { useFormState, useFormStatus } from 'react-dom'
import { login } from '@/actions/auth'

export default function SignIn() {
    // const [email, setEmail] = useState<string>('')
    // const [password, setPassword] = useState<string>('')
    // const router = useRouter()
    const [state, action] = useFormState(login, undefined);
    const { pending } = useFormStatus();
    // const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    //     e.preventDefault()

    //     try {
    //         const response = await fetch('/api/auth/signin', {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({ email, password }),
    //         })

    //         const data = await response.json()

    //         if (response.ok) {
    //             localStorage.setItem('name', data.name)
    //             localStorage.setItem('token', data.token)
    //             localStorage.setItem('isAdmin', data.isAdmin.toString())
    //             toast("Signed in successfully")
    //             router.push('/')
    //         } else {
    //             console.error(data.message)
    //             // Handle error (e.g., show error message to user)
    //         }
    //     } catch (error) {
    //         console.error('Sign-in error:', error)
    //         // Handle error (e.g., show error message to user)
    //     }
    // }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4 text-center">Sign In</h2>
                <form action={action}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            name="email"
                            type="email"
                            id="email"
                            className="mt-1 block w-full rounded-md  shadow-sm focus:outline-none border border-neutral-300 p-2 px-4 "

                        />
                        {state?.errors?.email && (
                            <p className="text-sm text-red-500">{state.errors.email}</p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            name="password"
                            type="password"
                            id="password"
                            className="mt-1 block w-full rounded-md shadow-sm focus:outline-none border border-neutral-300 p-2 px-4"

                        />
                        {state?.errors?.password && (
                            <p className="text-sm text-red-500">{state.errors.password}</p>
                        )}
                    </div>
                    {state?.message && (
                        <p className="text-sm text-red-500">{state.message}</p>
                    )}
                    <button aria-disabled={pending}
                        type="submit"
                        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        {pending ? 'Loading...' : 'Sign In'}
                    </button>
                </form>
                <p className="mt-4 text-center text-sm text-gray-600">
                    Don't have an account? <Link href="/signup" className="text-indigo-600 hover:text-indigo-500">Sign up</Link>
                </p>
            </div>
        </div>
    )
}