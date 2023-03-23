import { IsString, IsDecimal, isNumber, IsInt } from 'class-validator';

export class CreateArtistDto {
  @IsString()
  public name: string;

  @IsDecimal()
  public rate: number;

  @IsInt()
  public streams: number;
}

export default CreateArtistDto;
