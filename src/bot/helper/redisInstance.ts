import IORedis from "ioredis";
import { config } from "../../config";
export const redisInstance = new IORedis(config.REDIS_URL);