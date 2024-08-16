import { Document } from "mongoose";
import { ITag } from "./ITag";

interface Range {
  min: number;
  max: number;
}

export interface ISupplier extends Document {
  name: string;
  website: string;
  shipsTo: string[];
  range: Range;
  tags: ITag;
}
