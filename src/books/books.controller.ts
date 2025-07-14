import { Controller, Post, Body, Get, Param } from '@nestjs/common';

import { ApiTags, ApiBody, ApiOperation } from '@nestjs/swagger';
import { BooksService } from './books.service';
import { CreateBookDto } from './books.dto';

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
  @ApiOperation({ summary: 'Get all books' })
  getBooks() {
    return this.bookService.findAllBooks();
  }
  
  @Get('library/:id')
  getBooksByLibrary(@Param('id') libraryId: string) {
    return this.bookService.findAllBooksWithLibrary(libraryId);
  }
}
