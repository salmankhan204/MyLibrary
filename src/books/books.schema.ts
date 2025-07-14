
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type BookDocument = Book & Document;

@Schema()
export class Book {
  @Prop({ required: true })
  title: string;

  @Prop()
  author: string;

  // @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Library', required: true })
  // libraryId: string;

  // @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Library' })
  // library?: any;
}

export const BookSchema = SchemaFactory.createForClass(Book);
