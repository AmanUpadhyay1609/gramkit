import { Bot, session } from "grammy";
import { RedisAdapter } from "@grammyjs/storage-redis";
import { sequentialize } from "grammy-middlewares";
import { createContextConstructor } from "./context/CustomContext";
import { config } from "../config";
import { logger } from "../logger";
import { welcomeFeature } from "./features/welcome";
import { initial } from "./middlewares/session";
import { unhandledFeature } from "./features/unhandled";
import { updateLogger } from "./middlewares/updateLogger";
import { createCommanMenu } from "./helper/createMenu";
import { redisInstance } from "./helper/redisInstance";
import { errorHandler } from "./helper/errorHandler";



export const createBot = () => {
  const bot = new Bot(config.BOT_TOKEN, {
    ContextConstructor: createContextConstructor({ logger }),
    client: {
      canUseWebhookReply: (method) => method === "sendMessage",
    },
  });
  createCommanMenu(bot)

  const storage = new RedisAdapter({ instance: redisInstance });
  //middleWares
  // bot.api.config.use(parseMode("HTML"));
  // bot.api.config.use(autoRetry());

  //handle errors in Bot
  const protectedBot = bot.errorBoundary(errorHandler);

  if (config.isDev) {
    protectedBot.use(updateLogger());
  }
  protectedBot
    .use(
      session({
        initial,
        storage,
        getSessionKey(ctx) {
          return `BOT:${ctx.me.username}:${ctx.chat?.id}`;
        },
      })
    )
    // .use(ignoreOld())
    .use(sequentialize());

  protectedBot.use(welcomeFeature);
  // must be the last handler
  protectedBot.use(unhandledFeature);
  return bot;
};

export type IBot = ReturnType<typeof createBot>;
