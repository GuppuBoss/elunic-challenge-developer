import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateUserMessageDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  username: string;

  @IsNotEmpty()
  @IsString()
  message: string;

  @IsOptional()
  @IsEmail()
  @MaxLength(255)
  email?: string;
} 