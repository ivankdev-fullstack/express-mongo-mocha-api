import { Application } from "express";
import {
  create,
  deleteById,
  getByQuery,
  updateById,
} from "../controllers/drivers.controller";

export const routes = (app: Application) => {
  app.get("/api/drivers", getByQuery);
  app.post("/api/drivers", create);
  app.put("/api/drivers/:id", updateById);
  app.delete("/api/drivers/:id", deleteById);
};
