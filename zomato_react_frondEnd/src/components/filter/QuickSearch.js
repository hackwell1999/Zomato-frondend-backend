import FilterOption from "./FilterOption";
import Header from "../common/Header";
import RestaurantList from "./RestaurantList";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
// import { response } from "express";
// import { error } from "console";

function QuickSearch() {
  
  let [locationList, setLocationList] = useState([]);
  let [restaurantList, setRestaurantList] = useState([]);
  let [searchParams] = useSearchParams();
  let [filterData, setFilterData] = useState({});
  let [pageCount, setPageCount] = useState(0);
  
  let getLocationList = async () => {
    try {
      let url = "http://localhost:5003/api/location";
      let  response  = await axios.get(url);
      let { status, location } = response.data;
      // console.log(data.location)
      if (status) {
        setLocationList([...location]);
      } else {
        alert("looks like input is missing");
      }
    } catch (error) {
      alert(error);
    }
  };

  let filter = async (_filterData) => {
    _filterData = {..._filterData};
    let url = "http://localhost:5003/api/filter";

    if (searchParams.get("meal_type")){
      _filterData["meal_type"] = searchParams.get("meal_type");
    }
    try{
    let response = await axios.post(url, _filterData);
    // console.log(data.restaurant);
    let {result,pageCount}=response?.data;
      setRestaurantList(...[result]);
      setPageCount(pageCount);
      // console.log(data.pageCount);
    }catch (error){
      alert(error)
    }
  };

  let getFilterResult = (event, type) => {
    let {value} = event.target;
    let _filterData = { ...filterData };
    // console.log(value);

    switch (type) {
      case "sort":
        _filterData["sort"] = value;
        break;
      case "cost for two":
        value = value.split("-");
        _filterData["l_cost"] = Number(value[0]);
        _filterData["h_cost"] = Number(value[1]);
        break;
      case "page":
        _filterData["page"] = value;
        break;
      case "cuisine":
        let checked = event.target.checked;

        let cuisine =
        filterData.cuisine === undefined ? [] : [...filterData.cuisine];
        if (checked) {
          let isAvailable = cuisine.includes(Number(value));
          if (isAvailable === false) cuisine.push(Number(value));
        }else{
          let position = cuisine.indexOf(Number(value));
          cuisine.splice(position,1);
        }
        if (cuisine.length > 0){
          _filterData["cuisine"] = cuisine;
        }
        break;
      default:
        break;
    }
    setFilterData({...filterData,..._filterData});
  };

  useEffect(() => {
    getLocationList();
  }, []); //mounting -- only once

  useEffect(() => {
    filter(filterData);
  }, [filterData]); //updating -- run on state update

  return (
    <>
      <Header bg="bg-danger" />
      <div className="row">
        <div className="col-12 px-5 pt-4">
          <p className="h3">Find Your Favourite Places</p>
        </div>
        {/* <!-- food item --> */}
        <div className="col-12 d-flex flex-wrap px-lg-5 px-md-5 pt-4">
          <FilterOption
            locationList={locationList}
            getFilterResult={getFilterResult}
          />
          <RestaurantList
            restaurantList={restaurantList}
            getFilterResult={getFilterResult}
            pageCount={pageCount}
            

          />
        </div>
      </div>
    </>
  );
}

export default QuickSearch;
