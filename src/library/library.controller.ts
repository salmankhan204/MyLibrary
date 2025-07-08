import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common';
import { LibraryService } from './library.service';

@Controller('libraries')
export class LibraryController {
  constructor(private readonly libraryService: LibraryService) {}

  // Create a new library
  @Post('add')
  async createLibrary(@Body() body: { name: string; location: string }) {
    return this.libraryService.createLibrary(body);
  }

  // Get a library by ID with its books populated
  @Get(':id')
  async getLibrary(@Param('id') id: string) {
    return this.libraryService.getLibraryWithBooks(id);
  }

  // Get all libraries with their books populated
  @Get()
  async getAllLibraries() {
    return this.libraryService.getAllLibraries();
  }

  // Add a book to a library's books array
  @Put(':libraryId/add-book/:bookId')
  async addBookToLibrary(
    @Param('libraryId') libraryId: string,
    @Param('bookId') bookId: string,
  ) {
    return this.libraryService.addBookToLibrary(libraryId, bookId);
  }
}

