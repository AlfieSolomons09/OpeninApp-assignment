import mongoose from "mongoose";

// to connect to mongoDB database
export const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "assignmentAPI",
    })
        .then(() => console.log("Databse connected"))
        .catch((e) => console.log(e))
}