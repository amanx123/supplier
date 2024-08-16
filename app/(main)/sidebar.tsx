
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { LayoutDashboard, Settings, Layers, Coins, Infinity, CirclePlus, EllipsisVertical } from "lucide-react"
import { logout } from "@/actions/auth"
import { getUser } from "@/lib/dal"
import LogoutButton from "./logout"
import LoginButton from "./login"
export default async function Sidebar() {
    // const router = useRouter()
    // const [name, setName] = useState('')
    // const [isAdmin, setIsAdmin] = useState(false)
    // useEffect(() => {
    //     const name = localStorage.getItem('name')
    //     const token = localStorage.getItem('token')
    //     const adminStatus = localStorage.getItem('isAdmin')

    //     if (!token) {
    //         router.push('/signin')
    //     } else {
    //         setName(name || '')
    //         setIsAdmin(adminStatus === 'true')
    //     }
    // }, [router])

    // const handleLogout = () => {
    //     localStorage.removeItem('name')
    //     localStorage.removeItem('token')
    //     localStorage.removeItem('isAdmin')
    //     router.push('/signin')
    // }

    const user = await getUser();

    return (
        <div className="w-60 h-screen bg-neutral-200 flex flex-col justify-between  pt-8 fixed">
            <div className="flex flex-col items-start pl-4">
                {user?.isAdmin &&
                    <Link href='/' className="text-sm border border-black hover:opacity-85 transition-all bg-neutral-400 rounded-xl p-2 px-8 flex gap-2 items-center">
                        <Settings size={15} />
                        <p className="font-medium">Manage</p>
                    </Link>}
                <Link href='/suppliers' className="mt-4 text-sm border border-black hover:opacity-85 transition-all bg-neutral-400 rounded-xl p-2 px-8  flex gap-2 items-center">
                    <Layers size={15} />
                    <p className="font-medium">Suppliers</p>
                </Link>
                <Link href='/explore' className="text-lg mt-4 font-semibold flex gap-2 items-center hover:opacity-70">
                    <LayoutDashboard size={20} />
                    <p>Product Explorer</p>
                </Link>
            </div>
            <div className=" flex flex-col items-center justify-center pb-4">
                <div className="border border-neutral-300 bg-neutral-100 rounded-xl w-52 h-auto pb-4 ">
                    <div className="flex items-center justify-between my-4 px-4">
                        <span className="flex gap-2 items-center justify-center">
                            <Coins size={15} className="text-amber-500" />
                            <p className="text-sm font-medium">Credits</p>
                        </span>
                        <div className="p-1 bg-amber-500 rounded-md">
                            <Infinity size={10} className="text-white" />
                        </div>
                    </div>
                    <hr className="border-1 border-neutral-300 " />
                    <div className="px-4 mt-4 text-neutral-600 space-y-2 ">
                        <span className="flex items-center justify-between font-semibold ">
                            <p className="text-xs ">Monthly Balance</p>
                            <Infinity size={10} />
                        </span>
                        <span className="flex items-center justify-between font-semibold">
                            <p className="text-xs">Add-On Credits</p>
                            <Infinity size={10} />
                        </span>
                    </div>
                    <button className="gap-2 flex justify-center items-center mt-4 bg-blue-500 transition hover:bg-blue-600 rounded-lg px-8 py-2 text-sm mx-auto text-white">
                        <CirclePlus size={15} />
                        <p className="">Add Credits</p>
                    </button>


                </div>
                {user?.name?.length! > 2 &&
                    <div className="flex justify-between items-center mt-2 w-52 ">
                        <span className="flex items-center justify-center gap-2 ">
                            <p className="p-2 rounded-full bg-neutral-100 w-fit text-xs">{user?.name.charAt(0).toUpperCase()! + user?.name.charAt(1).toUpperCase()!}</p>
                            <p className="text-sm font-medium">{user?.name}</p>
                        </span>
                        <span className="bg-neutral-100 p-2 rounded-md cursor-pointer">
                            <EllipsisVertical size={12} />
                        </span>
                    </div>}
                {user !== null && <LogoutButton />}
                {user === null && <LoginButton />}
            </div>
        </div>
    )
}