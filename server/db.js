import mongoose from "mongoose"

export const conn = async () => {
    const uri = process.env.MONGO_URI
    if(!uri){
        throw new Error("missing ")
    }

    await mongoose.connect(uri)
    console.log("MongoDB connected!")
}
