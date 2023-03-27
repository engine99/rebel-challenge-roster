import { IsString, IsInt, IsNumber } from 'class-validator';

export class CreateArtistDto {
  @IsString()
  public artist: string;

  @IsNumber()
  public rate: number;

  @IsInt()
  public streams: number;
}

export default CreateArtistDto;
