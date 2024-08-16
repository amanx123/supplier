import Supplier from "@/db/models/Supplier";
import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    await dbConnect();

    const data = await req.json();
    console.log(data);
    const supplier = await Supplier.create(data);
    await supplier.save();
    return NextResponse.json(supplier, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const suppliers = await Supplier.find();
    return NextResponse.json(suppliers, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
