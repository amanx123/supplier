"use server";
import { cache } from "react";
import { verifySession } from "./session";
import User from "@/db/models/User";

export const getUser = async () => {
  const session = await verifySession();
  if (!session) return null;

  try {
    const data = await User.find({ _id: session.userId });
    return {
      name: data[0].name,
      isAdmin: data[0].isAdmin,
      email: data[0].email,
      _id: data[0]._id,
    };
  } catch (error) {
    console.log("Failed to fetch user");
    return null;
  }
};
