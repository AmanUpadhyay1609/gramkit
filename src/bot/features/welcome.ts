import { Composer } from "grammy";
import { CustomContext } from "../context/CustomContext";
import { logHandle } from "../helper/logger";

const composer = new Composer<CustomContext>();

const feature = composer.chatType("private");

feature.command("start", logHandle("command-start"), async (ctx) => {
  console.log("User hit /start");
  console.log(`telegram context-->`,ctx,`session-->`,ctx.session);
  ctx.api.sendMessage(ctx.chat.id, "Welcome to the bot!", {
    reply_markup: {
      inline_keyboard: [[{ text: "Say hi!", callback_data: "say_hi" }]],
    },
    parse_mode: "HTML",
  });
});

// Add as much commands as you want

export { composer as welcomeFeature };
