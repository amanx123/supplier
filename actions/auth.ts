"use server";
import User from "@/db/models/User";
import {
  SignupFormSchema,
  FormState,
  LoginFormSchema,
} from "../lib/definitions";
import bcrypt from "bcryptjs";
import { createSession, deleteSession } from "@/lib/session";
import dbConnect from "@/lib/dbConnect";
import { permanentRedirect, redirect } from "next/navigation";

import { toast } from "sonner";
export async function signup(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  // Validate form fields
  await dbConnect();
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    isAdmin: Boolean(formData.get("isAdmin")),
  });
  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, password, isAdmin } = validatedFields.data;

  const existingUser = await User.findOne({ email: email });

  if (existingUser) {
    return {
      message: "Email already exists, please use a different email or login.",
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    isAdmin,
  });
  if (!newUser) {
    return {
      message: "An error occurred while creating your account.",
    };
  }
  const userId = newUser._id.toString();

  await createSession(userId, newUser.isAdmin, newUser.name);
}

export async function login(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  await dbConnect();
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  console.log(validatedFields);
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;
  const user = await User.findOne({ email: email });

  if (!user) {
    return {
      message: "User not found",
    };
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return {
      message: "Incorrect password",
    };
  }

  await createSession(user._id.toString(), user.isAdmin, user.name);
}

export async function logout() {
  deleteSession();
  redirect("/signin");
}
