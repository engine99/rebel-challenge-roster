import ArtistDatabase from "./artistdatabase.service";
import { Artist } from "@/interfaces/artists.interface";
import { Collection, MongoClient, ObjectId, WithId } from "mongodb";

class MongoArtistDatabase implements ArtistDatabase {

    private client: MongoClient;
    private collection: Collection<Artist>;
    private defaultArtist: Artist = { name: "", rate:0.0, streams:0};

    // Database Name
    private dbName = 'RebelChallengeArtistDatabase';
    
    constructor(url:string, secret:string) {    
        const uri = `mongodb+srv://dbUser:${secret}@${url}/?retryWrites=true&w=majority`;
        this.client = new MongoClient(uri);
        console.log('Created mongo client at ' + uri);
    }

    async connect() {
    
        // Use connect method to connect to the server
        try {
            console.log('Attempting to connect to server');
            await this.client.connect();
            console.log('Connected successfully to server');
            const db = this.client.db(this.dbName);
            this.collection = db.collection('artists');
        } catch (e) {
            console.log('Bad Connection: ' + e.toString())
        }
    }

    list(): Promise<Artist[]> {
        return this.collection.find({}).toArray();
    }

    createMany(artists: Artist[]): Promise<number> {
        return this.collection.insertMany(artists).then((result)=>{
            console.log('inserted %d', result.insertedCount)
            return result.insertedCount;
        })
    }

    drop() {
        return this.collection.drop();
    }
    
    findOne(id: string): Promise<Artist> {
        return this.collection.findOne({_id:new ObjectId(id)});
    };

    createArtist(): Promise<string> {
        return this.collection.insertOne(this.defaultArtist).then((result) => {
            return result.insertedId.toString();
        })
    }
 
    update(id:string, artist: Artist): Promise<Artist> {
        return this.collection.updateOne({_id: new ObjectId(id)}, { $set: artist}).then((result) => {
            console.log('Inserted ', result.modifiedCount)
            return artist;
        })
    }
}

export default MongoArtistDatabase;