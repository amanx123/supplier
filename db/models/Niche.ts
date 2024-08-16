import { model } from "mongoose";
import { INiche } from "../interfaces/INiche";
import NicheSchema from "../schemas/NicheSchema";

const Niche = model<INiche>("Niche", NicheSchema);

export default Niche;
