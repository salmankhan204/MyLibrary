import { IsNotEmpty, IsString, IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty({ example: 'The Great Gatsby' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'F. Scott Fitzgerald' })
  @IsString()
  author: string;

  // @ApiProperty({ example: '64b75d76e7cc79c74a3e9f1d', description: 'MongoDB ObjectId of the library' })
  // @IsMongoId()
  // libraryId: string;
}
