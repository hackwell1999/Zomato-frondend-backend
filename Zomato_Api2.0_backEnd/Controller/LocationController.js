//import location model

const locationModel = require("../Model/locationModel");


module.exports.getLocationList= async (request,response)=>{
    let result = await locationModel.find()  //we can use method of mongoDB in this find(). eg) find({location_id: 1})
    
    response.send({
        status:true,
        location:result
    })
}