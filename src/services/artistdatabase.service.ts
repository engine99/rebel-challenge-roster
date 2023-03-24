import { Artist } from "@/interfaces/artists.interface";

interface ArtistDatabase {
    list(): Promise<Artist[]>;
    createMany(artists: Artist[]): Promise<number>;
    findOne(id: string): Promise<Artist>;
    /** Drop the database */
    drop(): Promise<any>;
    createArtist(): Promise<string>;
    update(id: string, artist: Artist): Promise<Artist>;
    dropOne(id: string): Promise<number>;
}

export default ArtistDatabase;