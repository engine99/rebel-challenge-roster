import { Artist } from "@/interfaces/artists.interface";
import { WithId } from "mongodb";

interface ArtistDatabase {
    list(): Promise<Artist[]>;
    createMany(artists: Artist[]): Promise<number>;
    findOne(id: string): Promise<Artist>;
    drop(): Promise<any>;
    createArtist(): Promise<string>;
    update(id: string, artist: Artist): Promise<Artist>;
}

export default ArtistDatabase;