import Category from '@/resources/category/category.interface';
import { Document } from 'mongoose';

export default interface Car extends Document {
  name: string;
  model: string;
  color: string;
  registrationNumber: string;
  category: Category;
}
