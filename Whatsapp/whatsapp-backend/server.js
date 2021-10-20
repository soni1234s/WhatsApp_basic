//importing modules
import Express from 'express'
import  Mongoose  from 'mongoose'
import Messages from './dbMessages.js';
import Pusher from 'pusher';
import cors from "cors";

//app config
const app = Express();
const port = process.env.port || 4000
const pusher = new Pusher({
    appId: "1280774",
    key: "a350eb562a2d7b262725",
    secret: "12e5e1c692813409ec4d",
    cluster: "eu",
    useTLS: true
  });


//middlewares  
app.use(Express.json())
app.use(cors())

//connect database
const connection_url = 'mongodb+srv://admin:mgkXSN5awSAMuwPO@cluster0.est62.mongodb.net/whatsappdb?retryWrites=true&w=majority'
Mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("connection successfull!")
}).catch((err) => {
    console.log(err)
})

const db = Mongoose.connection

db.once("open", () => {
    console.log("DB connected!");

    const msgCollection = db.collection("messagecontents");
    const changeStream = msgCollection.watch();

    changeStream.on("change", (change) => {
        console.log("change occured!..", change);

        if(change.operationType === "insert"){
            const messageDetails = change.fullDocument;
            pusher.trigger("Messages", "inserted", {
                name: messageDetails.name,
                message: messageDetails.message,
                timeStamp: messageDetails.time,
                reciever: messageDetails.reciever
            });
        }else{
            console.log("Error trigrring!")
        }
    })
})

//endpoints
app.get("/", (req, res) => {
   res.send("hello wolrd")
})

app.post("/messages/new", (req, res) => {

    const dbMessage = req.body
    
    Messages.create(dbMessage, (err, data) => {
            if(err){
                res.send(err)
            }else{
                console.log(data)
                res.send(data)
            }
    })

})

app.get("/messages/sync", (req, res) => {
    Messages.find((err, data)=>{
        if(err)res.send(err)
        else{
            console.log(data)
            res.send(data)
        }
    })
})


//listening..
app.listen(port, () => {
    console.log(`Listening at ${port}`)
})