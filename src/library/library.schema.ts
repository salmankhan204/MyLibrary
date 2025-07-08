import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Library extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  location: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Book' }] })
  books: Types.ObjectId[]; 
}

export const LibrarySchema = SchemaFactory.createForClass(Library);
