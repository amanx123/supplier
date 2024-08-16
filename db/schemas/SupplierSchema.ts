import { Schema } from "mongoose";
import { ISupplier } from "../interfaces/ISupplier";

const SupplierSchema: Schema<ISupplier> = new Schema({
  name: { type: String, required: true },
  website: { type: String, required: true },
  range: {
    min: { type: Number, required: true },
    max: { type: Number, required: true },
  },
  shipsTo: { type: [String], required: true },
  tags: {
    averageMainProductPrice: { type: Number, required: true },
    searchVolume: { type: Number, required: true },
    mapCompliance: { type: Boolean, required: true },
    directToConsumerSales: { type: Boolean, required: true },
    productTypesOffered: { type: [String], required: true },
  },
});

export default SupplierSchema;
