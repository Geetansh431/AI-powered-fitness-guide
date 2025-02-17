import mongoose from "mongoose";

export const connectDB = async()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URL);
        console.log("DataBase Connected : " + conn.connection.host);
    }
    catch(error){
        console.log("Connection failed : " + error);
    }
}