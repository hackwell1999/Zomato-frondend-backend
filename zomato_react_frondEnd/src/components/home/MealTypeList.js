import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function MealTypeList() {
  let [mealList, setMealList] = useState([]); // mealList => [] #1

  let getMenuListFromServer = async () => {
    let url = "http://localhost:5003/api/mealtype";
    let { data } = await axios.get(url); // #4
    setMealList(data.mealtype); //#5 [...data.meal_types] => recreate a memory
  };

  useEffect(() => {
    getMenuListFromServer(); // #3
  }, []); // when we use empty array in useEffect it will run only once on page load
  // use effect run's when there is a side effect (when state will change) in component

  let navigate = useNavigate();
  
  return (
    <>
      {/* #2 */}
      <section className="row justify-content-center">
        <section className="col-10 mt-3">
          <h3 className="fw-bold text-navy">Quick Searches</h3>
          <p className="text-secondary">Discover restaurants by Searches</p>
        </section>
        <section className="col-10">
          <section className="row py-2">
            <section className="col-12 px-0 d-flex justify-content-between flex-wrap">
              {mealList.map((meal, index) => {
                return (
                  <section
                    key={meal._id}
                    className="px-0 d-flex border border-1 quick-search-item"
                    onClick={()=>{navigate("/quick-search/"+meal.meal_type)}}
                  >
                    <img
                      src={"/images/" + meal.image}
                      alt=""
                      className="image-item"
                    />
                    <div className="pt-3 px-2">
                      <h4 className="text-navy">{meal.name}</h4>
                      <p className="small text-muted">{meal.content}</p>
                    </div>
                  </section>
                );
              })}
            </section>
          </section>
        </section>
      </section>
    </>
  );
}

export default MealTypeList;
