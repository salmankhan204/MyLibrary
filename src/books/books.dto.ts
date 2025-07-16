import { IsNotEmpty, IsString, IsMongoId } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty({ example: 'The Great Gatsby' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'F. Scott Fitzgerald' })
  @IsString()
  author: string;
}


export class FindBooksQueryDto {
  @ApiPropertyOptional({ description: 'Library ID to filter books', type: String })
  libraryId?: string;

  @ApiPropertyOptional({ description: 'Page number for pagination', type: Number, example: 1 })
  page?: number;

  @ApiPropertyOptional({ description: 'Number of items per page', type: Number, example: 5 })
  limit?: number;
}
