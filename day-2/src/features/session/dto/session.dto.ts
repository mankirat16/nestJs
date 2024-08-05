import { IsNotEmpty, IsString, IsNumber, IsBoolean } from 'class-validator';
import { User } from 'src/domain/user/user.entity';
export class SessionDto {
  @IsNotEmpty()
  @IsNumber()
  uuid: string;

  @IsNotEmpty()
  @IsString()
  sessionId: string;

  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsBoolean()
  isActive: boolean;
}
