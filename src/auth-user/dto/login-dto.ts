import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'email for login ',
    example: 'email12@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'password',
    example: 'password',
  })
  password: string;
}
