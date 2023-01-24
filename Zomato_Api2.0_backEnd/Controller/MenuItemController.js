const menuItemModel = require("../Model/menuItemModel")

module.exports.getMenuItemsByID = async (request,response)=>{
    let {rest_id} = request.params;
    try {
        let result = await menuItemModel.find({restaurantId:rest_id})   
        response.send({
            status:true,
            menuItems:result
        })    
    } catch (error) {
        response.status(500).send({
            status:false,
            message:"Invalid ID",
            error:error.message
        })
    }
    
}