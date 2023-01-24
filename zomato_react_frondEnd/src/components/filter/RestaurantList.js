import { useNavigate } from "react-router-dom";

function RestaurantList(props) {
  let { restaurantList,getFilterResult,pageCount } = props;
  let navigate = useNavigate();


  return (
    <>
      {/* <!-- search result --> */}

      <div className="col-12 col-lg-8 col-md-7">
        {restaurantList.length === 0 ? (
          <div className="col-12 food-shadow p-4 mb-4">No Restaurant Found</div>
        ) : (
          <>
            {restaurantList.map((restaurant, index) => {
              return (
                <div
                  onClick={() => {
                    navigate("/restaurant/" + restaurant._id);
                  }}
                  key={index}
                  className="col-12 food-shadow p-4 mb-4"
                >
                  <div className="d-flex align-items-center">
                    <img
                      src={"/images/" + restaurant.image}
                      className="food-item"
                      alt="foodImage"
                    />
                    <div className="ms-5">
                      <p className="h4 fw-bold">{restaurant.name}</p>
                      <span className="fw-bold text-muted">FORT</span>
                      <p className="m-0 text-muted">
                        <i
                          className="fa fa-map-marker fa-2x text-danger"
                          aria-hidden="true"
                        ></i>
                        {restaurant.locality},{restaurant.city}
                      </p>
                    </div>
                  </div>
                  <hr />
                  <div className="d-flex">
                    <div>
                      <p className="m-0">CUISINES:</p>
                      <p className="m-0">COST FOR TWO:</p>
                    </div>
                    <div className="ms-5">
                      <p className="m-0 fw-bold">
                        {restaurant.cuisine.reduce((pValue, cValue) => {
                          let value =
                            pValue === ""
                              ? cValue.name
                              : pValue + ", " + cValue.name;
                          return value;
                        }, "")}
                      </p>
                      <p className="m-0 fw-bold">
                        <i className="fa fa-inr" aria-hidden="true"></i>
                        {restaurant.min_price}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="my-4 btn-main d-flex justify-content-center mx-0">
              {Array(pageCount)
                .fill(1)
                .map((v, i) => {
                  return (
                    <button
                      className="btn btn-clr btn-danger  ms-2"
                      onClick={(event) => getFilterResult(event, "page")}
                      value={i + 1}
                      key={i}
                    >
                      {i + 1}
                    </button>
                  );
                })}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default RestaurantList;
