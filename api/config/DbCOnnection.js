import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("Db is connected joyfully... ");
  } catch (error) {
    console.log(`Erro: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;


// mongoose
//   .connect(process.env.MONGO)
//   .then(() => {
//     console.log("Db connected successfuly!!");
//   })
//   .catch((err) => console.log(err));