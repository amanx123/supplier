import { Schema } from "mongoose";
import { INiche } from "../interfaces/INiche";

const NicheSchema: Schema<INiche> = new Schema({
  name: { type: String, required: true },
  productTypes: { type: [String], required: true },
  brandIds: [{ type: Schema.Types.ObjectId, ref: "Brand" }],
});

export default NicheSchema;
