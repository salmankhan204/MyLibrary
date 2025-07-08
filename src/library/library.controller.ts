import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common';
import { LibraryService } from './library.service';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { CreateLibraryDto } from './library.dto';

@ApiTags('Libraries')
@Controller('libraries')
export class LibraryController {
  constructor(private readonly libraryService: LibraryService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new library' })
  @ApiBody({ type: CreateLibraryDto })
  createLibrary(@Body() body: CreateLibraryDto) {
    return this.libraryService.createLibrary(body);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a library with its books' })
  getLibrary(@Param('id') id: string) {
    return this.libraryService.getLibraryWithBooks(id);
  }

  @Put(':libraryId/add-book/:bookId')
  @ApiOperation({ summary: 'Add a book to a library' })
  addBookToLibrary(
    @Param('libraryId') libraryId: string,
    @Param('bookId') bookId: string,
  ) {
    return this.libraryService.addBookToLibrary(libraryId, bookId);
  }

  @Get()
  async getAllLibraries() {
    return this.libraryService.getAllLibraries();
  }
}
