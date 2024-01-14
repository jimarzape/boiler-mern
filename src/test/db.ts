import mongoose from "mongoose";

export async function connectDBForTesting() {
  try {
    const dbUri =
      "mongodb+srv://adaca:vPAfJCItkfDHLmXu@cluster0.4shhif6.mongodb.net?retryWrites=true&w=majority";
    const dbName = "adaca";
    await mongoose.connect(dbUri, {
      dbName,
      autoCreate: true,
    });
  } catch (error) {
    console.log("DB connect error");
  }
}

export async function disconnectDBForTesting() {
  try {
    await mongoose.connection.close();
  } catch (error) {
    console.log("DB disconnect error");
  }
}
