"use client"
import Link from 'next/link'
import { signup } from '../../../actions/auth'
import { useFormState, useFormStatus } from 'react-dom'

const SignUpForm = () => {
    const [state, action] = useFormState(signup, undefined)
    const { pending } = useFormStatus();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
                <form action={action}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            id="name"
                            name="name"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none border p-2 px-4"
                        />
                    </div>
                    {state?.errors?.name && <p>{state.errors.name}</p>}

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none border p-2 px-4"
                        />
                    </div>
                    {state?.errors?.email && <p>{state.errors.email}</p>}

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:outline-none border  p-2 px-4"
                        />
                    </div>
                    {state?.errors?.password && (
                        <div>
                            <p>Password must:</p>
                            <ul>
                                {state.errors.password.map((error) => (
                                    <li key={error}>- {error}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <div className="mb-4">
                        <label htmlFor="isAdmin" className="flex items-center">
                        </label>
                        <input
                            id="isAdmin"
                            name="isAdmin"
                            type="checkbox"
                            className="rounded text-indigo-600 shadow-sm focus:outline-none border border-neutral-300 p-2 px-4"

                        />
                        <span className="ml-2 text-sm text-gray-600">
                            Sign up as admin
                        </span>
                    </div>
                    <button aria-disabled={pending}

                        type="submit"
                        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        {pending ? 'Submitting...' : 'Sign Up'}
                    </button>
                </form>
                <p className="mt-4 text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link href="/signin" className="text-indigo-600 hover:text-indigo-500">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default SignUpForm

