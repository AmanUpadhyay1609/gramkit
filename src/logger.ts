import { pino } from "pino";
import { config } from "./config";

export const logger = pino({
  level: config.LOG_LEVEL,
  transport: {
    targets: [
      ...(config.isDev
        ? [
            {
              target: "pino-pretty",
              level: config.LOG_LEVEL,
              options: {
                ignore: "pid,hostname",
                colorize: true,
                translateTime: true,
              },
            },
          ]
        : [
            {
              target: "pino-pretty",
              level: config.LOG_LEVEL,
              options: {
                ignore: "pid,hostname",
                colorize: true,
                translateTime: true,
              },
            },
            {
              target: "pino/file",
              level: config.LOG_LEVEL,
              options: { destination: "./logs/app.log", mkdir: true },
            },
          ]),
    ],
  },
});

export type Logger = typeof logger;
