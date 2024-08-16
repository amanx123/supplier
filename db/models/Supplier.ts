import mongoose, { Model, model } from "mongoose";
import { ISupplier } from "../interfaces/ISupplier";
import SupplierSchema from "../schemas/SupplierSchema";

const Supplier: Model<ISupplier> =
  mongoose.models.Supplier ||
  mongoose.model<ISupplier>("Supplier", SupplierSchema);

export default Supplier;
