import * as mongoose from 'mongoose';

export interface Product extends mongoose.Document {
  _id: string;
  title: string;
  description: string;
  price: number;
}
