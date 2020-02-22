import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Card from './card';
dotenv.config();

const connectionString = `mongodb+srv://admin:${process.env.MONGODB_PASSWORD}@cluster0-sxhxo.mongodb.net/test?retryWrites=true&w=majority`;
const connectDb = () => {
  return mongoose.connect(
    connectionString,
    { useNewUrlParser: true }
  );
};
const models = {
  Card
};
export { connectDb };
export default models;