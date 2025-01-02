import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { Role } from '../decorators/decorator-role';

export class CreateAuthUserDto {
  @ApiProperty({
    description: 'email for user ',
    example: 'email12@example.com',
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'password of the user',
    example: 'Password2@@A',
  })
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long.' })
  @MaxLength(20, { message: 'Password must not exceed 20 characters.' })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/, {
    message:
      'Password must contain at least one letter, one number, and be between 8 and 20 characters.',
  })
  password: string;

  @ApiProperty({
    description: 'Role of the user',
    example: 'admin',
  })
  @IsEnum(Role)
  role: string;
}
