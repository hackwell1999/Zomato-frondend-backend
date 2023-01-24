const express = require("express");
const apiRouter = require("./Routes/APIRouter");
const PORT = 5003;
const app = express();
const cors = require("cors")
const mongoose = require("mongoose");
// const mongodbUrl = "mongodb://127.0.0.1:27017/zomatoApi";
const mongodbUrl = "mongodb+srv://Zomato-user:zomato123@zomato.zix0w06.mongodb.net/zomatoApi?retryWrites=true&w=majority";

app.use(cors());
// to eligible to get post data
app.use(express.json()); //it will convert a string data to json data
app.use(express.urlencoded({extended:false}))  //we want only post data,because we set extended to set false.


app.use("/", apiRouter);

//creating connection with mongoDB
mongoose.connect(mongodbUrl).then(() => {
    console.log("server is connected successfullyn")
  app.listen(PORT, () => {
    console.log("server is started on ", PORT);
  });
}).catch((error)=>{
    console.log("Unable to connect the DB", error);
});
