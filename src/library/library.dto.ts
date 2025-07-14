import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLibraryDto {
  @ApiProperty({ example: 'Dummy Library' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Dummy Location' })
  @IsString()
  @IsNotEmpty()
  location: string;
}
