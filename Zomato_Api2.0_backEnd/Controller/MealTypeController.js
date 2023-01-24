
const mealTypeModel = require("../Model/mealTypeModel");

module.exports.getMealTypesList= async (request,response)=>{
    let result = await mealTypeModel.find()
    response.send({
        status:true,
        mealtype:result
    })
}

