import { webhookCallback } from "grammy";
import express from "express";
import cors from "cors";
import { IBot } from "..";


export const createServer = async (bot: IBot) => {

  const app = express();
  app.use(express.json());
  app.use(cors({ origin: "*" }));
//   app.post(
//     `/${bot.token}`,
//     webhookCallback(bot, "express", {
//       // secretToken: config.BOT_SECRET,
//     })
//   );

  return app
};
