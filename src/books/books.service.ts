import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from './books.schema';
import { CreateBookDto } from './books.dto';
import { Library } from 'src/library/library.schema';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name) private bookModel: Model<Book>,
    @InjectModel(Library.name) private libraryModel: Model<Library>,
  ) {}

  async createBook(createBookDto: CreateBookDto) {
    const { libraryId } = createBookDto;

    const library = await this.libraryModel.findById(libraryId);
    if (!library) {
      throw new NotFoundException('Library with given ID not found');
    }

    const newBook = new this.bookModel(createBookDto);
    return newBook.save();
  }

  async findAllBooksWithLibrary() {
    return this.bookModel.find().populate('library');
  }
}
