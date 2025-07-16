import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';

import { ApiTags, ApiBody, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { BooksService } from './books.service';
import { CreateBookDto, FindBooksQueryDto } from './books.dto';

@ApiTags('Books')
@Controller('books')
export class BooksController {
  constructor(private readonly bookService: BooksService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new book for a library' })
  @ApiBody({ type: CreateBookDto })
  createBook(@Body() body: CreateBookDto) {
    return this.bookService.createBook(body);
  }

  @Get()
  @ApiOperation({ summary: 'Get all books or filter by libraryId' })
  getBooks(
    @Query('page') page = 1,
    @Query('limit') limit = 5,
    @Query() query: FindBooksQueryDto,
  ) {
    return this.bookService.findAllBooks(query.libraryId, page, limit);
  }
}
