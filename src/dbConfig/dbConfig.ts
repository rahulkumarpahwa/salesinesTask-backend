import mongoose from "mongoose";

export const connect = async () => {
  try {
    mongoose.connect(process.env.MONGO_URL ? process.env.MONGO_URL : "");
    const connection = mongoose.connection;
    connection.on("connected", () => console.log("Database Connected!"));
    connection.on("error", (err) => {
      console.log(`MongoDB error : ${err}`);
      process.exit();
    });
  } catch (error) {}
};
