"use client"
import { useState } from "react";
import CreateSupplier from "./createSupplier";
import CreateBrand from "./createBrand";
export default function Home() {
  const [show, setShow] = useState('supplier')
  return (
    <main className="pt-12  pl-10">
      <div className="flex gap-4  justify-start items-center ml-60">
        <button onClick={() => setShow(show === 'supplier' ? 'brand' : 'supplier')} className="px-4 p-2 bg-sky-900 text-white font-medium rounded-lg">
          {show === 'supplier' ? 'Create Brand' : 'Create Supplier'}
        </button>
      </div>
      <div className=" mx-auto ml-64 flex justify-center items-center w-full">
        {
          show === 'supplier' && <CreateSupplier />
        }
        {
          show === 'brand' && <CreateBrand />
        }
      </div>
    </main>
  );
}
