import { Artist } from "@/interfaces/artists.interface";
import { WithId } from "mongodb";

interface ArtistDatabase {
    list(): Promise<Artist[]>;
    create(artists: Artist[]): Promise<void>;
    findOne(id: string): Promise<Artist>;
    drop(): Promise<any>;
}

export default ArtistDatabase;