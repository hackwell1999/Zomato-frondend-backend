const {Schema,model}=require("mongoose");

const ObjectId = Schema.Types.ObjectId;
const menuItemSchema = new Schema({
    
name:{type:String},
description:{type:String},
ingridients:{type:Array},
restaurantId:{type:ObjectId},
image:{type:String},
qty:{type:Number},
price:{type:Number}
})

const menuItemModel = model("menuitem",menuItemSchema);
module.exports = menuItemModel;