// ---------- src/user/dto/create-user.dto.ts ----------
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;

  @IsString()
  name!: string;

  @IsString()
  department!: string;
}
