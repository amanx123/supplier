import { Document, Types } from "mongoose";
import { ITag } from "./ITag";
import { IBrandDocument } from "./IBrandDocument";

export interface IBrand extends Document {
  name: string;
  details: string;
  nicheId: Types.ObjectId;
  productTypes: string[];
  tags: ITag;
  documents: IBrandDocument[];
  wholesaleAccessAvailable: boolean;
  dropshippingAvailable: boolean;
}
