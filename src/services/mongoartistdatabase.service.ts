import ArtistDatabase from "./artistdatabase.service";
import { Artist } from "@/interfaces/artists.interface";
import { Collection, MongoClient, ObjectId, WithId } from "mongodb";
import { NODE_ENV } from "@/config";
class MongoArtistDatabase implements ArtistDatabase {

    private client: MongoClient;
    private collection: Collection<Artist>;
    readonly defaultArtist: Artist = { artist: null, rate:0.0, streams:0};

    // Database name depends on environment
    private dbName = 'ArtistRoster_'+ NODE_ENV;
    
    constructor(url:string, secret:string) {    
        const uri = `mongodb+srv://dbUser:${secret}@${url}/?retryWrites=true&w=majority`;
        this.client = new MongoClient(uri);
        console.log('Created mongo client at ' + uri);
    }

    async connect(): Promise<void> {
        // Use connect method to connect to the server
        try {
            console.debug('Attempting to connect to server');
            await this.client.connect();
            console.debug('Connected successfully to server');
            const db = this.client.db(this.dbName);
            this.collection = db.collection('artists');
        } catch (e) {
            console.error('Bad Connection: ' + e.toString())
        }
    }

    async disconnect(): Promise<void> {
        this.client.close();
    }

    list(): Promise<Artist[]> {
        return this.collection.find({}).toArray();
    }

    createMany(artists: Artist[]): Promise<number> {
        return this.collection.insertMany(artists).then((result)=>{
            console.debug('inserted %d', result.insertedCount)
            return result.insertedCount;
        })
    }

    drop() {
        return this.collection.deleteMany();
    }
    
    findOne(id: string): Promise<Artist> {
        return this.collection.findOne({_id:new ObjectId(id)});
    };

    createArtist(): Promise<string> {
        return this.collection.insertOne({...this.defaultArtist}).then((result) => {
            return result.insertedId.toString();
        })
    }
 
    update(id:string, artist: Artist): Promise<Artist> {
        return this.collection.updateOne({_id: new ObjectId(id)}, { $set: artist}).then((result) => {
            console.log('Inserted ', result.modifiedCount)
            return artist;
        })
    }
    
    dropOne(id: string): Promise<number> {
        return this.collection.deleteOne({_id: new ObjectId(id)}).then((res) => {return(res.deletedCount ? 1 : 0)})
    }
}

export default MongoArtistDatabase;