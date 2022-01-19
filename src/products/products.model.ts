import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Product title must be specified 🤷🏻‍♂️'],
  },
  description: {
    type: String,
    trim: true,
    default: 'Product description goes here... 📃',
  },
  price: {
    type: Number,
    min: 0,
    required: true,
  },
});
