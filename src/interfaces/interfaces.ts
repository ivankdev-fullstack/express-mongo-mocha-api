import { Document } from "mongoose";

export interface IPoint {
  type: string;
  coordinates: [number, number];
}

export interface IDriver extends Document {
  email: string;
  driving: boolean;
  geometry: IPoint;
}
