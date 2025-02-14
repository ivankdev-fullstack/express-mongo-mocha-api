import * as dotenv from "dotenv";
dotenv.config();

const ensure = (envName: string): string => {
  const envVar = process.env[envName];
  if (!envVar) {
    throw new Error(
      `${envName} not found. Check .env to be sure of existence of env variable.`
    );
  }
  return envVar;
};

export const envConfig = {
  PORT: ensure("PORT"),
  MONGO_URL: ensure("MONGO_URL"),
};
