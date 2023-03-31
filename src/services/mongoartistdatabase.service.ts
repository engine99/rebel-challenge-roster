import ArtistDatabase from "./artistdatabase.service";
import { Artist } from "@/interfaces/artists.interface";
import { Collection, Db, ObjectId } from "mongodb";
class MongoArtistDatabase implements ArtistDatabase {

    private collection: Collection<Artist>;

    readonly defaultArtist: Artist = { 
        artist: null, 
        rate:0.0, 
        streams:0,
        payout:0.0
    };
     
    constructor(db: Db) {    
        this.collection = db.collection('artists');
    }

    list(): Promise<Artist[]> {
        return this.collection.find({}).sort({payout:-1}).toArray();
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