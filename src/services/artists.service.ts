import { Artist } from '@interfaces/artists.interface'
import { resolve } from 'path';
import ArtistDatabase from './artistdatabase.service';

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
                    const result = this.db.create(artists).then(()=>{

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
}

export default ArtistService;