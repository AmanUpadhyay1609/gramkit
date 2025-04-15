import mongoose, { Mongoose } from "mongoose";
import {MongoClient} from 'mongodb';
import { config } from "../../config";

mongoose.connect(config.MONGO_URL, {
  serverApi: {
    version: "1", // Use '1' for ServerApiVersion.v1
  },
});

// Get the default connection
const db = mongoose.connection;

export const dbClient = new MongoClient(config.MONGO_URL);

export default db;