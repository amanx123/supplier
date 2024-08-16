import mongoose, { Model } from "mongoose";
import { IUser } from "../interfaces/IUser";
import { UserSchema } from "../schemas/UserSchema";

const User: Model<IUser> =
  mongoose.models?.User || mongoose.model<IUser>("User", UserSchema);

export default User;
