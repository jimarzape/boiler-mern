const mongoose = require("mongoose");

const MONGODB = process.env.MONGODB || "";

const connectDB = () => {
  return mongoose.connect(MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export const closeDB = async () => {
  try {
    await mongoose.connection.close();
    console.log("Database connection closed.");
  } catch (error) {
    console.error("Error closing database connection:", error);
  }
};

export default connectDB;
