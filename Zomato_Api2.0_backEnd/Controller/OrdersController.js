const ordersModel = require("../Model/OrdersModel");

module.exports.saveNewOrders = async (request,response) =>{
    let data = request.body;
    //mongoose way to add a signle record
    try {
        let newOrder = new ordersModel({
            order_id:data.order_id,
            name:data.name,
            mobile:data.mobile,
            email:data.email,
            order_list:data.order_list,
            payment_id:data.payment_id,
            payment_status:data.payment_status,
            
        })
        await newOrder.save() 
        response.status(200).send({
            status:true,
            message:"Congradulations,order palaced successfully"
        })
    } catch (error) {
        response.status(500).send({
            status:false,
            message:"Invalid Entry",
            error:error.message
        })
    }
    
}

