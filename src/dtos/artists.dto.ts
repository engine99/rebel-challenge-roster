import { IsString, IsDecimal, isNumber, IsInt } from 'class-validator';

export default class CreateUserDto {
  @IsString()
  public name: string;

  @IsDecimal()
  public rate: number;

  @IsInt()
  public streams: number;
}
