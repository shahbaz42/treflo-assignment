import * as dotEnv from "dotenv";

if (process.env.NODE_ENV !== "prod") {
  const configFile = `./.env.${process.env.NODE_ENV}`;
  dotEnv.config({ path: configFile });
} else {
  dotEnv.config();
}

export const PORT = process.env.PORT || 3000;
export const DB_URI = process.env.DB_URI || "";
export const DISCORD_BOT_SERVER_ENDPOINT = process.env.DISCORD_BOT_SERVER_ENDPOINT || "";
export const DISCORD_BOT_SERVER_API_KEY = process.env.DISCORD_BOT_SERVER_API_KEY || "";
