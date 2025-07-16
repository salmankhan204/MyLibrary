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
    const newBook = new this.bookModel(createBookDto);
    return newBook.save();
  }

  //  async findAllBooks(libraryId?: string, page = 1, limit = 10) {
  //   const skip = (page - 1) * limit;

  //   if (libraryId) {
  //     const library = await this.libraryModel.findById(libraryId);

  //     if (!library) {
  //       throw new NotFoundException('Library not found');
  //     }

  //     const total = library.books.length;

  //     const books = await this.bookModel
  //       .find({ _id: { $in: library.books } })
  //       .skip(skip)
  //       .limit(limit);

  //     return {
  //       data: books.map((book) => ({
  //         _id: book._id,
  //         title: book.title,
  //         author: book.author,
  //         library: {
  //           name: library.name,
  //           location: library.location,
  //         },
  //       })),
  //       total,
  //       page,
  //       limit,
  //       lastPage: Math.ceil(total / limit),
  //     };
  //   }

  //   const total = await this.bookModel.countDocuments();

  //   const books = await this.bookModel.find().skip(skip).limit(limit);

  //   return {
  //     data: books.map((book) => ({
  //       _id: book._id,
  //       title: book.title,
  //       author: book.author,
  //     })),
  //     total,
  //     page,
  //     limit,
  //     lastPage: Math.ceil(total / limit),
  //   };
  // }
  async findAllBooks(libraryId?: string, page = 1, limit = 5) {
    const skip = (page - 1) * limit;

    const books = await this.bookModel.find().skip(skip).limit(limit);
    const total = await this.bookModel.countDocuments();

    return {
      data: books.map((book) => ({
        _id: book._id,
        title: book.title,
        author: book.author,
      })),
      total,
      page,
      limit,
      lastPage: Math.ceil(total / limit),
    };
  }
}
