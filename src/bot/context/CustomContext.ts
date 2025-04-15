
import { Api, Context, SessionFlavor } from "grammy";
import { Update, UserFromGetMe } from "@grammyjs/types";
import { SessionData } from "../middlewares/session";
import { Logger } from "../../logger";
type ExtendedContextFlavor = {
  logger: Logger;
};

export type CustomContext = Context &
  SessionFlavor<SessionData> &
  ExtendedContextFlavor;

export const createContextConstructor = ({ logger }: { logger: Logger }) => {
  return class extends Context implements ExtendedContextFlavor {
    public logger = logger;

    constructor(update: Update, api: Api, me: UserFromGetMe) {
      super(update, api, me);

      this.logger = logger.child({
        update_id: this.update.update_id,
      });
    }
  } as unknown as new (
    update: Update,
    api: Api,
    me: UserFromGetMe
  ) => CustomContext;
};