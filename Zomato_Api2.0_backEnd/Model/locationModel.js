//import mongoose

const mongoose = require("mongoose");
//Import schema
const Schema = mongoose.Schema;
//create schema
const locationSchema = new Schema({
    name:{type:String},
    city_id:{type:Number},
    location_id:{type:Number},
    city:{type:String},
    country_name:{type:String}
})
//create model

const locationModel = mongoose.model("location",locationSchema,"locations")  //the 1st parameter is modelName , the 2nd is schemaName and the 3rd one is collection name.
//Note: If the model name and the collection name are both same then we can avoid the 3rd parameter
//eg)  const locationModel = mongoose.model("location",locationSchema)

//export it

module.exports = locationModel;