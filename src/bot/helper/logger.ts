import { Middleware } from "grammy";
import type { Update } from "@grammyjs/types";
import { CustomContext } from "../context/CustomContext";

export function getUpdateInfo(ctx: CustomContext): Omit<Update, "update_id"> {
  // eslint-disable-next-line camelcase, @typescript-eslint/no-unused-vars
  const { update_id, ...update } = ctx.update;

  return update;
}

export function logHandle(id: string): Middleware<CustomContext> {
  return (ctx, next) => {
    ctx.logger.info({
      msg: `handle ${id}`,
      ...(id.startsWith("unhandled") ? { update: getUpdateInfo(ctx) } : {}),
    });

    return next();
  };
}
