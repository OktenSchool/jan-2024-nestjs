import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'The name of the User',
    required: true,
  })
  public readonly name: string;

  @ApiProperty()
  public readonly email: string;

  @ApiProperty({
    example: 'password123#',
    description: 'The password should be at least 8 characters long',
    required: true,
  })
  public readonly password: string;

  @ApiProperty({
    example: 25,
    description: 'The age of the User',
    required: false,
  })
  public readonly age?: number;

  @ApiProperty({
    example: '1234567890',
    description: 'The phone number of the User',
    required: false,
    default: '1234567890',
  })
  public readonly phone?: string;
}
