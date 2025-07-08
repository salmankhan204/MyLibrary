import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from './books.schema';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private bookModel: Model<Book>) {}

  async createBook(bookData: {
    title: string;
    author: string;
    libraryId: string;
  }) {
    const newBook = new this.bookModel({
      title: bookData.title,
      author: bookData.author,
      library: bookData.libraryId,
    });

    return newBook.save();
  }

  async findAllBooksWithLibrary() {
    return this.bookModel.find().populate('library');
  }
}
