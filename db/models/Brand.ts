import { model } from "mongoose";
import { IBrand } from "../interfaces/IBrand";
import BrandSchema from "../schemas/BrandSchema";

const Brand = model<IBrand>("Brand", BrandSchema);

export default Brand;
