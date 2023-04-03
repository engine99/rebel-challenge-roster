import { MongoClient } from "mongodb";
import App from "./app";
import serverlessExpress from '@vendia/serverless-express';
const { MONGO_URL, MONGO_SECRET } = process.env;

const connectionString = `mongodb+srv://dbUser:${MONGO_SECRET}@${MONGO_URL}/?retryWrites=true&w=majority`;
const client = new MongoClient(connectionString);
const app: App = new App(client);

export const handler = serverlessExpress({app: app.getServer()});

