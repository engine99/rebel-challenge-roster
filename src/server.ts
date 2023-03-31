import App from '@/app';
import validateEnv from '@utils/validateEnv';
import { MongoClient } from 'mongodb';
import { resolve } from 'path';
import { MONGO_SECRET, MONGO_URL } from './config';


validateEnv();
const connectionString = `mongodb+srv://dbUser:${MONGO_SECRET}@${MONGO_URL}/?retryWrites=true&w=majority"`;
const client = new MongoClient(connectionString);
client.connect().then(() => {
    const app = new App(client);
    app.listen();
});

process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled Rejection at:', reason)
    // Recommended: send the information to sentry.io
    // or whatever crash reporting service you use
    return promise;
  })
