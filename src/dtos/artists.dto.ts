import { IsString, IsInt, IsNumber } from 'class-validator';

export class CreateArtistDto {
  @IsString()
  public name: string;

  @IsNumber()
  public rate: number;

  @IsInt()
  public streams: number;
}

export default CreateArtistDto;
