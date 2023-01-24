import FilterOption from "./FilterOption";
import Header from "../common/Header";
import RestaurantList from "./RestaurantList";
import { useState,useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";


function QuickSearch() {
  
  let [locationList,setLocationList] = useState([])
  let [restaurantList,setRestaurantList] = useState([])
  let {meal_id} = useParams();
  let [filterData,setFilterData] = useState({
    mealtype:meal_id
  })

  let [pageCount,setPageCount] =useState(0)

  

  let getLocationList =async()=>{
    let url = "http://localhost:5003/api/location";
    let {data} =await axios.get(url)
    // console.log(data.location)
    setLocationList(data.location)
  }

  let filter = async() =>{
    let url = "http://localhost:5003/api/filter"
    
    let {data} = await axios.post(url,filterData)
    // console.log(data.restaurant);
    if(data.status === true){
      setRestaurantList(data.result);
      setPageCount(data.pageCount)
      console.log(data.pageCount);
    }else{
      setRestaurantList([])
    }
    
  }

  let getFilterResult =(event,type)=>{
    let value = event.target.value
    let _filterData = {...filterData}
    console.log(value);
    

    switch (type) {
      case "sort":
        _filterData['sort'] = value;
        break;
      case "cost for two":
        value=value.split("-")
        _filterData["l_cost"]=Number(value[0])
        _filterData["h_cost"]=Number(value[1])
        break;
        case "page":
          _filterData["page"]=value
          break;
      default:
        break;
    }
    setFilterData(_filterData)
  }

  useEffect(()=>{
    getLocationList()
  },[]) //mounting -- only once

  useEffect(()=>{
    filter()
  },[filterData])  //updating -- run on state update

  return (
    <>
      <Header bg="bg-danger"/>
      <div className="row">
        <div className="col-12 px-5 pt-4">
          <p className="h3">Find Your Favourite Places</p>
        </div>
        {/* <!-- food item --> */}
        <div className="col-12 d-flex flex-wrap px-lg-5 px-md-5 pt-4">
          <FilterOption locationList={locationList} getFilterResult={getFilterResult} />
          <RestaurantList restaurantList={restaurantList} getFilterResult={getFilterResult} pageCount={pageCount}/>
        </div>
      </div>
    </>
  );
}

export default QuickSearch;
