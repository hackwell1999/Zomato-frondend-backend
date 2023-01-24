const {Schema,model} = require("mongoose");

const mealTypeSchema = new Schema({
    
name:{type:String},
content:{type:String},
image:{type:String},
meal_type:{type:Number}
})

const mealTypeModel = model("mealtype",mealTypeSchema,"mealtypes")
module.exports = mealTypeModel;