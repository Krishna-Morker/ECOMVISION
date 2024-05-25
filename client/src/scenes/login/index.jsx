import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../../assets/app_logo.png";
import home from "../../assets/home.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../../utils/APIRoutes";
import { FaGoogle } from "react-icons/fa";
import {host} from "../../utils/APIRoutes"
import  Cookie from 'js-cookie';
import "./index.css";

export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ username: "", password: "" });
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
       // console.log("current",currentUser)
       // console.log(response,"response")
        const response = await axios.get(`${host}/login/sucess`, {withCredentials: true});
        console.log(response,"response");
        if(response.data.sta==1){
          if(response.data.user) 
          {
              navigate("/dashboard");
          }
        }
  
    } catch (error) {
      console.log(error)
      navigate("/login")
    }

    };

    
    fetchData();
  }, []);


  useEffect(() => {
    const ch = async () => {
      let h=Cookie.get('jwt');
      
      
   const response=await axios.get(`${host}/check/${h}`,{withCredentials:true});
   console.log(response?.data,"login")
   if(response?.data?.chk==true){
  
    navigate("/dashboard");
   }
  }
  ch();
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    const { username, password } = values;
    if (username === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    }
    return true;
  };

  const simulateGoogleSignIn= async ()=>{
    window.open(`${host}/api/auth/google`,"_self");

 }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      },{withCredentials: true});
      if (data?.status === false) {
        toast.error(data?.msg, toastOptions);
      }
      if (data?.status === true) {
        navigate("/dashboard");
      }
    }
  };

  return (
    <>
    <div className="container">
      <div class="image-container">
        <img src={home} alt="login" />
      </div>
      <div className="form-container">
      <FormContainer>
        <form action="" onSubmit={(event) => handleSubmit(event)}>
        
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>ECOMVISION</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
            min="3"
          />
         
             <div class="input-container" id="password">
                     <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
            
          />
                    <Link to="/forgotpassword">Forgot?</Link>     
                </div>  
          <button type="submit">Log In</button>
          <div class="separator" id="password">or</div>
                <div class="google">
                <FaGoogle size={30}/>
                {/* <button type="button" class="google-signin-btn" onClick={simulateGoogleSignIn}>Sign in with Google</button> */}
                </div>
                
          <span className="create-one">
            Don't have an account ? <Link to="/register">Create One.</Link>
          </span>
        </form>
        
      
      </FormContainer>
      </div>
      <ToastContainer />
      </div>
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 50vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #c5e6fb;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: black;
      text-transform: uppercase;
    }
  }
}
.navb{
  background-color: black;
  padding: 20px;
  position:sticky;
  width:100vw;
  display: flex;
  gap:2rem;
  justify-content: flex-end;
}
.link-na{
  text-decoration: none;
  color: white;
  font-weight: bold;
  font-size: 15px; 
  margin-top: 8px;
  &:hover{
    color: #10b981;
    cursor: pointer;
    transition: 0.3s;
  }
}
  .input-container {
    padding-left: 10px;
    margin: 0px;
    border: solid 2px white;
    border-radius: 0.4rem;
    background-color: white;
}
#password{
    display: flex;
}
#password > input{
    flex: 1;
}
#password > a{
    text-decoration: none;
    margin-top: 7px;
    padding-top: 3px;
    padding-right: 15px;
    padding-left: 8px;
    color: rgb(114, 113, 113);
    font-size: 14px;
    border-left: 0.1px solid rgb(101, 100, 100);
    height:25px;
}
#password > i{
    padding-top:12px;
}
.separator {
  text-align: center;
  margin: 2px 0;
  color: black;
  position: relative;
  font-weight: 600;
}
.separator::before, .separator::after {
  content: "";
  display: inline-block;
  height: 1px;
  background-color:rgb(169, 209, 249);
  width: 39%;
}
.separator::before {
  margin-right: 10px;
}
.separator::after {
  margin-left: 10px;
}
.google-signin-btn {
  color: white;
  padding: 10px 0px 10px 0px;
  border: none;
  border-radius: 3px;
  font-weight: 500;
  background-color: transparent;
  margin-right: 0%;
}
.google-signin-btn:hover{
  background-color: rgb(10, 19, 139);
}
.google:hover{
  background-color: rgb(10, 19, 139);
}
.google{
  display: flex;
  gap: 1.5rem;
  border-radius: 15px;
  padding: 10px;
  width: 80%;
  border: 1px solid rgb(80, 80, 251);
  background-color: rgb(10, 19, 139);
  background-color: rgb(80, 80, 251);
  margin: auto;
  margin-bottom:10px;
}

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: rgba(0, 0, 0, 0);
    border-radius: 2rem;
    padding: 5rem;
  }
  input {
    background-color: white;
    padding: 1rem;
    border: none;
    border-radius: 0.4rem;
    color: black;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: black;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;
