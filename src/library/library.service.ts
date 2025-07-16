import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Library } from './library.schema';


@Injectable()
export class LibraryService {
  constructor(
    @InjectModel(Library.name) private libraryModel: Model<Library>,
  ) {}

  async createLibrary(data: { name: string; location: string }) {
    const library = new this.libraryModel(data);
    return library.save();
  }

  async getAllLibraries() {
    return this.libraryModel.find().populate('books');
  }

  async deleteLibrary(id: string) {
    const library = await this.libraryModel.findByIdAndDelete(id);
    if (!library) {
      throw new NotFoundException('Library not found');
    }
    return library;
  }

  async getSingleLibrary(id: string) {
    return this.libraryModel.findById(id).populate('books');
  }

  async getBookInLibrary(id: string, bookId: string) {
    const library = await this.libraryModel.findById(id).populate('books');
    if (!library) {
      throw new NotFoundException('Library not found');
    }
    return library.books.find((book) => book._id.toString() === bookId);
  }

  async addBookToLibrary(libraryId: string, bookId: string) {
    return this.libraryModel.findByIdAndUpdate(
      libraryId,
      { $push: { books: bookId } },
      { new: true },
    );
  }
}
