import { Schema } from "mongoose";
import { IBrandDocument } from "../interfaces/IBrandDocument";
import { IBrand } from "../interfaces/IBrand";

const BrandDocumentSchema: Schema<IBrandDocument> = new Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
});

const BrandSchema: Schema<IBrand> = new Schema({
  name: { type: String, required: true },
  details: { type: String, required: true },
  nicheId: { type: Schema.Types.ObjectId, ref: "Niche", required: true },
  productTypes: { type: [String], required: true },
  tags: {
    averageMainProductPrice: { type: Number, required: true },
    searchVolume: { type: Number, required: true },
    mapCompliance: { type: Boolean, required: true },
    directToConsumerSales: { type: Boolean, required: true },
    productTypesOffered: { type: [String], required: true },
  },
  documents: [BrandDocumentSchema],
  wholesaleAccessAvailable: { type: Boolean, required: true },
  dropshippingAvailable: { type: Boolean, required: true },
});

export default BrandSchema;
