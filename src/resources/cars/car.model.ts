import { Schema, model } from 'mongoose';
import Car from './cars.interface';

const CarSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required!'],
      trim: true,
    },
    model: {
      type: String,
      required: [true, 'Model is required!'],
      trim: true,
    },
    color: {
      type: String,
      required: [true, 'Color is required!'],
      trim: true,
    },
    registrationNumber: {
      type: String,
      required: [true, 'RegistrationNumber is required!'],
      trim: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Category is required!'],
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

export default model<Car>('Car', CarSchema);
