import { Document } from "mongoose";
import mongoose from "mongoose";
export interface INiche extends Document {
  name: string;
  productTypes: string[];
  brandIds: mongoose.Types.ObjectId[];
}
