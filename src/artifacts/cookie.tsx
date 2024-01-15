import {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from 'universal-cookie';
// import LoginService from "./LoginService"

const Login = () => {

    // const [passwordType, setPasswordType] = useState("password");
    const [userDetail, setUserDetail] = useState({ username: "", password: "" });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
  
    // const changePasswordType = (e) => {
    //   e.preventDefault();
    //   if (passwordType === "password") {
    //     setPasswordType("text");
    //   } else {
    //     setPasswordType("password");
    //   }
    // };
  
    const handleUserDetails = (e) => {
      const { name, value } = e.target;
      setUserDetail((prevUserDetail) => ({ ...prevUserDetail, [name]: value }));
    };

     // decode jwt and get the data
 const parseJwt = (token) => {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
};
  
    const userLogin = (e) => {
      e.preventDefault();
      setIsLoading(true);
      const cookie = new Cookies();
      cookie.remove("vas-user");
      userDetail.username = userDetail.username.trim();
      userDetail.password = userDetail.password.trim();
      LoginService
      .login(userDetail)
      .then((response) => {

          if (response !== undefined) {
            setIsLoading(false);
            handleResponseSetData(response.data);
          }
        })
        .catch((error) => {
          setIsLoading(false);
          errorNotify(error.message);
        });
    };
  
    const handleResponseSetData = (data) => {
      const { flag, message, result } = data;
      if (flag) {
        
        setIsLoading(false);
        const cookie = new Cookies();
        const { accessToken, authenticated , user} = result;
        const { appReference, firstName, lastName, userType, groupNames } = parseJwt(accessToken);
        cookie.set("vas-user", {
          accessToken,
          authenticated,
          appReference,
          firstName,
          lastName,
          userType,
          groupNames,
          user
        });
        navigate("/dashboard");
      } else {
          if (message === "require password change") {
            errorNotify(message);
            navigate("/change-password", {state:{username: result}});
          }else{
            errorNotify(message);
          }
      }
    };
  
    const errorNotify = (message) =>
      toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
  


  return (
    <section className='login-section  container-fluid bg-dark p-0 m-0'>
      <div className='row mt-3 justify-content-center align-items-center'>
        <div className='col-md-8 col-sm-12'>
          <div class="three portal-name d-flex justify-content-center align-items-center">
            <h1>VAS Portal</h1>
          </div>
        </div>
      </div>
      <div className='row d-flex justify-content-center align-items-center' style={{padding: "100px 0px"}}>
          <div className='col-lg-3 col-md-6 col-sm-6 col-sm-12'>
          <div  className='login-container' style={{border: "1px solid white", padding: "20px 25px"}}>  
                <div className='form-container'>
                    <form className='py-5 px-3' onSubmit={userLogin}>
                        <h3 className='display-6 mb-3'>Sign in</h3>
                        <div className='form-group'>
                            <label className='label'>Username</label>
                            <input
                                type='text' 
                                placeholder='username'
                                style={loginPageStyle.loginInput}
                                name={"username"}
                                value={userDetail.username}
                                onChange={handleUserDetails}
                                autoComplete="off"
                                required
                                />
                        </div>
                        <div className='form-group'>
                            <label className='label'>Password</label>
                            <input 
                                type='password' 
                                placeholder='password'
                                style={loginPageStyle.loginInput}
                                name={"password"}
                                value={userDetail.password}
                                onChange={handleUserDetails}
                                autoComplete="off"
                                required
                                />
                            
                        </div>
                        <div>
                            <button className={`btn btn-success bg-success d-flex align-items-center justify-content-center ${isLoading ? "disabled" : ""}`} style={loginPageStyle.loginButton}>
                                Sign in
                                {isLoading && (
                        <ClipLoader
                          color={"#ffffff"}
                          size={20}
                          aria-label="Loading Spinner"
                          data-testid="loader"
                        />
                      )}
                            </button>
                        </div>
                    </form>
                    <div className='divider text-center'>OR</div>
                    <p className='text-end mt-5'>Forgot password? <Link to='/forgot-password'>get it</Link></p>
                </div>
            </div>
          </div>
        </div>
    </section>
  )
}

export default Login

const loginPageStyle = {
   
  loginInput: {
      padding: "15px 10px",
      width: "100%",
      marginBottom: "20px",
  },
  loginButton: {
    width: "100%",
    marginTop: "20px",
    padding: "20px 25px",
    fontWeight: "bolder",
    fontSize: "1rem",
    textTransform: "uppercase",
    letterSpacing: "5px"
  }
}