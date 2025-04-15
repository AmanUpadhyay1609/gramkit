import "dotenv/config";
import z from "zod";
import { parseEnv, port } from "znv";

const createConfigFromEnvironment = (environment: NodeJS.ProcessEnv) => {
  const config = parseEnv(environment, {
    //Bot configuration
    NODE_ENV: z.enum(["development", "production"]),
    LOG_LEVEL: z
      .enum(["trace", "debug", "info", "warn", "error", "fatal", "silent"])
      .default("info"),
    BOT_TOKEN: z.string(),
    BOT_USERNAME: z.string(),
    BOT_MODE: z.enum(["polling", "webhook"]).default("polling"),
    BOT_ALLOWED_UPDATES: z
      .string()
      .array()
      .default(["message", "callback_query"]),

    //Webhook configuration --> Only if you want to use webhook (if BOT_MODE=webhook)
    BOT_WEBHOOK_URL: z.string().optional(),

    // HTTP Server ---> This configuration is optional if you want to use your own server or you can remove it from whole codebase
    HTTP_SERVER_HOST: z.string().default("0.0.0.0"),
    HTTP_SERVER_PORT: port().default(80),

    //DB and session conf
    REDIS_URL: z.string(),
    MONGO_URL: z.string(),

    // Extra variables
    ENV_1: z.string(),
    ENV_2: z.string(),
    //Add more environment variables here for zod validation
  });
  return {
    ...config,
    isDev: process.env.NODE_ENV === "development",
    isProd: process.env.NODE_ENV === "production",
  };
};

export type Config = ReturnType<typeof createConfigFromEnvironment>;

export const config = createConfigFromEnvironment(process.env);
