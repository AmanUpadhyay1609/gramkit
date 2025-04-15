import { ErrorHandler } from "grammy";
import { CustomContext } from "../context/CustomContext";
import { getUpdateInfo } from "./logger";

export const errorHandler: ErrorHandler<CustomContext> = (error) => {
  const { ctx } = error;

  ctx.logger.error({
    err: error.error,
    update: getUpdateInfo(ctx),
  });
};