import { MongoClient } from "mongodb";
import App from "./app";
import serverlessExpress from '@vendia/serverless-express';
const { MONGO_URL, MONGO_SECRET } = process.env;

const connectionString = `mongodb+srv://dbUser:${MONGO_SECRET}@${MONGO_URL}/?retryWrites=true&w=majority"`;
const client = new MongoClient(connectionString);
const app: App = new App(client);

export const handler = serverlessExpress({app: app.getServer()});

// const connect = async () => {
//     client.connect();
    
//     const artistDatabase = new MongoArtistDatabase(client.db(`ArtistRoster_${NODE_ENV}`));
//     const artistService = new ArtistService(artistDatabase);
//     artistController = new ArtistsController(artistService);
// }

// export const listAll = async (event: APIGatewayEvent, context: Context) => {
//     console.log(`Event: ${JSON.stringify(event, null, 2)}`);
//     console.log(`Context: ${JSON.stringify(context, null, 2)}`);
//     const res = event;
//     let body = await artistController.listAll(res, {}, ()=>{});
//     const response = {
//         statusCode: 209,
//         body: body,
//         echo: res.body
//     };
//     return response;
// }

// connect();

