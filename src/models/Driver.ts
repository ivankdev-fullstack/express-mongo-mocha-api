import mongoose, { Schema } from "mongoose";
import { IDriver, IPoint } from "../interfaces/interfaces";

const PointSchema = new Schema<IPoint>({
  type: { type: String, enum: ["Point"], required: true, default: "Point" },
  coordinates: { type: [Number], required: true, index: "2dsphere" },
});

const DriverSchema = new Schema<IDriver>({
  email: { type: String, required: true },
  driving: { type: Boolean, default: false },
  geometry: { type: PointSchema, required: true },
});

export const Driver = mongoose.model<IDriver>("Driver", DriverSchema);
