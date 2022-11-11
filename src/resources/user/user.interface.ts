import { Document } from 'mongoose';

export default interface User extends Document {
  email: string;
  firstName: string;
  lastName: string;
  password: string;

  isValidPassword(password: string): Promise<Error | boolean>;
  createPasswordResetToken(): string;
}
