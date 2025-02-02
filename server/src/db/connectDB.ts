import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("Connected Successfully to DB");
  } catch (error) {
    console.log(error);
  }
};

export default connectToDB;
