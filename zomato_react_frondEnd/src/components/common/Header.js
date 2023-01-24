import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import jwtDecode from "jwt-decode";
import { useState } from "react";

function Header(props) {
  let getUserLoginData = () => {
    //read data from localstorage
    let token = localStorage.getItem("authToken");
    if (token === null) {
      return false;
    } else {
      try {
        //decode jwt token
        let decodedToken = jwtDecode(token);
        return decodedToken
        // return true;
      } catch (error) {
        // remove a token from local storage
        localStorage.removeItem("authToken")
        return false;
      }
    }
  };
  let [user, setUser] = useState(getUserLoginData());
  let onSuccess = (credentialResponse) => {
    let token = credentialResponse.credential;
    localStorage.setItem("authToken", token);
    //store the data using localstorage 5mb to 10mb
    alert("login success");
    window.location.assign("/");
  };
  let onError = () => {
    console.log("Login Failed");
  };
  
  let logout = () =>{
    let doLogout = window.confirm("are you sure to logout")
    if(doLogout === true) { 
    localStorage.removeItem("authToken")
    window.location.assign("/")
    }else{
      return false
    }
    
    
  }

  return (
    <>
      <GoogleOAuthProvider clientId="639332774503-eso6rnka9d9usbb25mlvhogl499ibhst.apps.googleusercontent.com">
        <div
          className="modal fade"
          id="google-login"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Login
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <GoogleLogin onSuccess={onSuccess} onError={onError} />
              </div>
            </div>
          </div>
        </div>

        <div className={`row ${props.bg} justify-content-center`}>
          <div className="col-11 d-flex justify-content-between align-items-center py-2">
            { props.bg ?<p className="m-0 brand">e!</p>:<p></p>}
            <div>
              {user === false ? (
                <button
                className="btn btn-outline-light"
                data-bs-toggle="modal"
                data-bs-target="#google-login"
              >
                Login
              </button>
              ):(
                <>
                <span className="fw-bold text-white "> welcome ,{user.name}</span>
                <button className="btn btn-outline-light btn-sm ms-3" onClick={logout} >
                Logout
              </button>
                </>
              )}
              
              {/* <button className="btn btn-outline-light">
              <i className="fa fa-search" aria-hidden="true"></i>Create a
              Account
            </button> */}
            </div>
          </div>
        </div>
      </GoogleOAuthProvider>
    </>
  );
}

export default Header;
