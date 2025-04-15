import { onShutdown } from "node-graceful-shutdown";
import { createBot } from "./bot";
import { logger } from "./logger";
import { config } from "./config";
import { createServer } from "./bot/server/server";
import db from "./bot/helper/connectDB";
import * as http from "http";
import * as fs from "fs";
import * as path from "path";



function serveStaticFile(
  req: http.IncomingMessage,
  res: http.ServerResponse
): void {
  if (req.url && req.url.startsWith("/public/")) {
    const imagePath = path.join(__dirname, "..", req.url);
    fs.readFile(imagePath, (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("File not found");
      } else {
        const contentType = getContentType(imagePath);
        res.writeHead(200, { "Content-Type": contentType });
        res.end(data);
      }
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Page not found");
  }
}

// Determine content type based on file extension
function getContentType(filePath: string): string {
  const extname = path.extname(filePath).toLowerCase();
  switch (extname) {
    case ".png":
      return "image/png";
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".gif":
      return "image/gif";
    default:
      return "application/octet-stream";
  }
}


const startBotServer = async () => {
    try {
      // Database connection
      db.on("connected", () => {
        console.log("Mongoose connected to MongoDB");
      });
      // Telegram bot connection
      const bot = createBot();
      const server = await createServer(bot);
      // HTTP server setup
      const httpServer = http.createServer((req, res) => {
        serveStaticFile(req, res); // Serve static files
      });
  
      // Start HTTP server
      httpServer.listen(config.HTTP_SERVER_PORT, () => {
        logger.info({
          msg: "Server is listening...",
          host: config.HTTP_SERVER_HOST,
          port: config.HTTP_SERVER_PORT,
        });
      });
  
      // Graceful shutdown
      onShutdown(async () => {
        logger.info("Shutdown");
  
        // Close HTTP server
        httpServer.close();
  
        // Stop bot
        await bot.stop();
      });
  
      // Initialize bot based on configuration
      if (config.BOT_MODE === "webhook") {
        console.log("Webhook mode...");
        await bot.init(); // Initialize bot
        await bot.api.setWebhook(config.BOT_WEBHOOK_URL as string, {
          allowed_updates: config.BOT_ALLOWED_UPDATES as any,
          // secret_token: config.BOT_SECRET,
        });
      } else if (config.BOT_MODE === "polling") {
        console.log("Polling mode...");
        await bot.start({
          allowed_updates: config.BOT_ALLOWED_UPDATES as any,
          onStart: ({ username }) => {
            logger.info({
              msg: "Bot running...",
              username,
            });
          },
        });
        console.log("Bot running...");
      }
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
};

startBotServer();