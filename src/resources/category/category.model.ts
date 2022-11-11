import { Schema, model } from 'mongoose';
import Category from '@/resources/category/category.interface';

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required!'],
      trim: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

export default model<Category>('Category', CategorySchema);
