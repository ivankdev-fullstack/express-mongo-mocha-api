import bodyParser from "body-parser";
import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { envConfig } from "./config/envConfig";
import { routes } from "./routes/routes";

const app = express();
const { PORT, MONGO_URL } = envConfig;

mongoose
  .connect(MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

app.use(bodyParser.json());
routes(app);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(422).send({ error: err.message });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
