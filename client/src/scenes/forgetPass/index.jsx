import React ,{ useState, useEffect }from 'react'
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { host } from '../../utils/APIRoutes';
import axios from 'axios';

export default function Forgotpass() {
  const [values, setValues] = useState({email: "" });
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
      const { email } = values;
      console.log(email);
      const response  = await axios.post(`${host}/api/auth/forgot-password`, {
       email,
      },{withCredentials: true});
      if(response.data.sta==false){
        alert('Email is not valid');
      }
      if(response.data.sta==true){
        alert('Password Change Link is Successfully sent to your Email');
        navigate("/login");
      }
     
    }
  
    const handleChange = (event) => {
      setValues({ ...values, [event.target.name]: event.target.value });
    };
  return (
    <FormContainer>
    <div class="container">
        <h2>Forgot Password</h2>
        <p>Lost your password? Please enter your email address. You will receive a link to create a new password via email.</p>
        <form id="forgotPasswordForm" onSubmit={(event) => handleSubmit(event)}>
            <label for="email">Email</label>
            <input type="email" id="email" name="email"  onChange={(e) => handleChange(e)}  required/>
            <button type="submit" >Reset Password</button>
            
        </form>
        <div class="bottom">
            <Link class="RememberPassword"
        to="/login"> Remember your password? </Link>
        </div>
        
    </div>
     </FormContainer>
  );
}


const FormContainer = styled.div`
font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
.container {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 150%;
  height: 500px;
  max-width: 500px; /* Adjust the maximum width as needed */
  position: relative;
 
}
form{
  margin-top: 2em;
}
label {
  display: block;
  margin-bottom: 8px;
  color: rgb(146, 144, 144);
  font-size: medium
}

input {
  width: 94%;
  height: 30px;
  padding: 8px;
  margin-bottom: 40px;
  border: 1px solid black;
  border-radius: 5px;
}

button {
  background-color: rgb(228, 240, 252);
  color: rgb(83, 160, 248);
  font-size: 100%;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  height: 40px;
  
}
button:hover{
  background-color: rgb(184, 218, 252);
}

/* Responsive styles */
@media only screen and (max-width: 280px) {
  .container {
      max-width: 100%;
      padding: 10px;
  }
}
h2{
  font-weight: 100;
} 

.bottom{
  width: 90%;
  position: absolute;
  bottom: 0;
  border: 1px solid white;
  border-top: 1px dashed black;
  padding-bottom: 15px;
  padding-top: 15px;
}
.RememberPassword{
  text-decoration: none;
  color: rgb(83, 160, 248);
 
}
`;
