import { ApiProperty } from "@nestjs/swagger";

export class CreateAuthUserDto {
    
        @ApiProperty({
          description: 'email for user ',
          example: 'email12@example.com',
        })
      email: string;
    
        @ApiProperty({
          description: 'password of the user',
          example: 'Password2@@A',
        })
      password: string;
    
        @ApiProperty({
          description: 'Role of the user',
          example: 'admin',
        })
      role: string;
}
