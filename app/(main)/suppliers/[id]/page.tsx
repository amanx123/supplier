import { getUser } from "@/lib/dal";
import { redirect } from "next/navigation";

export default async function Supplier({ params }: { params: { id: string } }) {

    const user = await getUser();
    if (!user) {
        return redirect('/signin')
    }
    const data = await fetch(`${process.env.baseUrl}/api/supplier/${params.id}`, { cache: 'no-store' }).then((res) => res.json())
    console.log(data)
    return (
        <div className="w-[70vw] ml-64 flex flex-col items-center justify-center mt-10">
            <h1 className="text-3xl font-normal">More details of <span className="font-semibold">{data.name}</span></h1>
            <div className="flex flex-col items-center justify-center mt-4">
                <p>{data.website}</p>
            </div>
        </div>
    )
}