import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Library } from './library.schema';

const array = [
  {
    name: 'Central Library',
    location: 'Downtown',
  },
  {
    name: 'Community Library',
    location: 'Uptown',
  }
]

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

  async getLibraryWithBooks(id: string) {
    return this.libraryModel.findById(id).populate('books');
  }

  async addBookToLibrary(libraryId: string, bookId: string) {
    return this.libraryModel.findByIdAndUpdate(
      libraryId,
      { $push: { books: bookId } },
      { new: true },
    );
  }
}
