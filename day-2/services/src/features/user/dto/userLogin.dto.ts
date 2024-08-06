import { IsNotEmpty, IsString, IsNumber, IsEmail } from 'class-validator';

export class LogInDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
