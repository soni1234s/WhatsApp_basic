import mongoose from "mongoose";

//made schema
const whatsappSchema = mongoose.Schema({
    message: String,
    name : String,
    time: String,
    reciever: Boolean
})


//made collection
export default mongoose.model("messageContents", whatsappSchema)