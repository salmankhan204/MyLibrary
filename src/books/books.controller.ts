import { Controller, Post, Body, Get } from '@nestjs/common';
import { BooksService } from './books.service';


@Controller('books')
export class BooksController {
  constructor(private readonly bookService: BooksService) {}

  // Create a book with reference to a library
  @Post()
  async createBook(
    @Body()
    body: {
      title: string;
      author: string;
      libraryId: string;
    },
  ) {
    return this.bookService.createBook(body);
  }

  // Get all books with populated library info
  @Get()
  async getBooks() {
    return this.bookService.findAllBooksWithLibrary();
  }
}
