import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Book extends Document {
  @Prop({ required: true })
  title: string;

  @Prop()
  author: string;

  @Prop({ type: Types.ObjectId, ref: 'Library' }) // Book belongs to one Library
  library: Types.ObjectId;
}

export const BookSchema = SchemaFactory.createForClass(Book);
