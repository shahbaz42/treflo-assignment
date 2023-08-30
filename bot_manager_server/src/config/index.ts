import * as dotEnv from "dotenv";

if (process.env.NODE_ENV !== "prod") {
  const configFile = `./.env.${process.env.NODE_ENV}`;
  dotEnv.config({ path: configFile });
} else {
  dotEnv.config();
}

export const PORT = process.env.PORT || 3000;
export const APP_ID = process.env.APP_ID;
export const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
export const PUBLIC_KEY = process.env.PUBLIC_KEY;