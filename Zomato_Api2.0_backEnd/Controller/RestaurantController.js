const { request } = require("http");
const menuItemModel = require("../Model/menuItemModel");
const restaurantModel = require("../Model/restaurantModel");

module.exports.getRestaurantListByLocationID = async (request, response) => {
  let { loc_id } = request.params;
  try {
    let result = await restaurantModel.find(
      { location_id: loc_id },
      { name: 1, locality: 1, city: 1, image: 1 }
    );
    if (result.length === 0) {
      response.send({
        status: false,
        message: "The location you have entered is not avialable",
      });
    } else {
      response.send({
        status: true,
        restaurant: result,
      });
    }
  } catch (error) {
    response.status(500).send({
      status: false,
      message: "Invalid ID",
      error: error.message,
    });
  }
};

module.exports.getRestaurantListByID = async (request, response) => {
  let { rest_id } = request.params;
  try {
    let result = await restaurantModel.findById(rest_id); //here we use findById because it is only for id,if we use find method then the code will be  find({_id:id})
    response.send({
      status: true,
      restaurant: result,
    });
  } catch (error) {
    response.status(500).send({
      status: false,
      message: "Invalid ID",
      error: error.message,
    });
  }
};
module.exports.filter = async (request, response) => {
  let {
    mealtype,
    location,
    l_cost,
    h_cost,
    sort,
    cuisine,
    page,
    itemsPerPage,
  } = request.body;

  sort = sort ? sort : 1;
  page = page ? page : 1;
  itemsPerPage = itemsPerPage ? itemsPerPage : 2;

  let staringIndex = page * itemsPerPage - itemsPerPage; //0
  let lastIndex = page * itemsPerPage; // 2

  const filterData = {};

  if (mealtype !== undefined) filterData["mealtype_id"] = mealtype;
  if (location !== undefined) filterData["location_id"] = location;
  if (l_cost !== undefined && h_cost !== undefined)
    filterData["min_price"] = { $gt: l_cost, $lt: h_cost };
  if (cuisine !== undefined) filterData["cuisine_id"] = { $in: cuisine };
  console.log(filterData);

  try {
    let result = await restaurantModel
      .find(filterData, {
        name: 1,
        city: 1,
        locality: 1,
        min_price: 1,
        image: 1,
        cuisine_id: 1,
        cuisine: 1,
      })
      .sort({
        min_price: sort,
      });
    //high to low DESC order -1
    //low to high ASC order 1
    const filterResult = result.slice(staringIndex, lastIndex);
    if (result.length === 0) {
      response.send({
        status: false,
        message: "The restaurants is not available",
      });
    } else {
      response.status(200).send({
        status: true,
        result: filterResult,
        pageCount: Math.ceil(result.length / 2), //gives a round number
      });
    }
  } catch (error) {
    response.status(500).send({
      status: false,
      message: "Invalid ID",
      error: error.message,
    });
  }
};

module.exports.getMenuItems = async (request, response) => {
  let { rest_id } = request.params;
  try {
    let result = await menuItemModel.find({ restaurantId: rest_id });
    response.status(200).send({
      status: true,
      menu_item: result,
    });
  } catch (error) {
    response.status(500).send({
      status: false,
      message: "Invalid Id",
      error: error.message,
    });
  }
};

module.exports.searchRestaurant = async (request, response) => {
  let { restaurant, loc_id } = request.body;

  let result = await restaurantModel.find({
    name: { $regex: restaurant + ".*", $options: "i" },
    location_id: Number(loc_id),
  });
  response.send({
    status: true,
    result,
  });
};
