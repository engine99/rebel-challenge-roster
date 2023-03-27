import { Artist } from '@interfaces/artists.interface'
import ArtistDatabase from './artistdatabase.service';


/** 
A class for Artist business logic, independent of front-end (i.e. HTTP) and database implementation (i.e. mongodb)
*/
class ArtistService {
    db: ArtistDatabase;

    constructor(db: ArtistDatabase) {
        this.db = db;
    }

    public load(artists: Artist[]): Promise<any> {
        return this.db
        .drop()
            .then(
                () => {
                    artists.forEach(this.setPayout); 

                    const result = this.db.createMany(artists).then(()=>{
                        console.log(result);
                    });
                    return result;
                });
    }

    public list(): Promise<Artist[]> {
        return this.db.list();
    }

    public getById(id: string): Promise<Artist> {
        return this.db.findOne(id);
    }

    public createArtist(): Promise<string> {
        return this.db.createArtist();
    }

    public update(id: string, artist: Artist): Promise<Artist> {
        this.setPayout(artist);
        return this.db.update(id, artist);
    }

    public dropOne(id: string): Promise<number> {
        return this.db.dropOne(id);
    }

    private setPayout(x) {
        try {
            x.payout = x.rate * x.streams
        } catch {
            x.payout = 0.0;
        }
    }
}

export default ArtistService;