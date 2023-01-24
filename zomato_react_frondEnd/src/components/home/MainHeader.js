// import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../common/Header";
import { useNavigate } from "react-router-dom";

function MainHeader() {
  let navigate = useNavigate();
  let [locationList, setLocationList] = useState([]);
  let [locationId, setLocationId] = useState("");
  let [restaurantInputText, setRestauarantInputText] = useState("");
  let [searchList, setSearchList] = useState([]);

  let getLocationList = async () => {
    let url = "http://localhost:5003/api/location";
    let { data } = await axios.get(url);
    setLocationList(data.location);
  };

  let getSelectedValue = (event) => {
    let { value } = event.target;
    setLocationId(value);
  };

  let searchForRestaurant = async (e) => {
    let { value } = e.target;
    setRestauarantInputText(value);
    // console.log(value);
    if (value !== "") {
      let url = "http://localhost:5003/api/search-restaurant";
      let { data } = await axios.post(url, {
        restaurant: value,
        loc_id: locationId,
      });
      setSearchList(data.result);
    }
  };
  useEffect(() => {
    console.log("location id change");
    setRestauarantInputText("");
    setSearchList([]);
  }, [locationId]); //on update

  useEffect(() => {
    getLocationList();
  }, []); // on load i.e once we want to run it
  return (
    <>
      <section className="row main-section align-content-start">
        <Header />
        <section className="col-12 d-flex flex-column align-items-center justify-content-center">
          <p className="brand-name fw-bold my-lg-2 mb-0">e!</p>
          <p className="h1 text-white my-3 text-center">
            Find the best restaurants, cafés, and bars
          </p>
          <div className="search w-50 d-flex mt-3">
            <select
              type="text"
              className="form-select mb-3 mb-lg-0 w-50 me-lg-3 py-2 px-3"
              placeholder="Please type a location"
              onChange={getSelectedValue}
            >
              <option value="">--- Select Location ---</option>
              {locationList.map((location, index) => {
                return (
                  <option key={index} value={location.location_id}>
                    {location.name}, {location.city}
                  </option>
                );
              })}
            </select>
            <div className="w-75 input-group relative">
              <span className="input-group-text bg-white">
                <i className="fa fa-search text-primary"></i>
              </span>
              <input
                type="text"
                className="form-control py-2 px-3"
                placeholder="Search for restaurants"
                value={restaurantInputText}
                disabled={locationId === "" ? true : false}
                onChange={searchForRestaurant}
              />
              <ul className="list-group absolute bottom-0 w-100">
                {searchList.map((restaurant) => {
                  return (
                    <li
                      key={restaurant._id}
                      className="list-group-item"
                      onClick={() =>
                        navigate("/restaurant/"+restaurant._id)
                      }
                    >
                      {restaurant.name}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </section>
      </section>
    </>
  );
}

export default MainHeader;
