import axios from 'axios';
import React,{useState} from 'react'
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import { host } from '../../utils/APIRoutes';
import { useNavigate } from "react-router-dom";

export default function Changepass({id}) {
    const [values, setValues] = useState({ password1: "", password2: "" });
    const params=useParams();
    const navigate = useNavigate();
    const handleChange1 =(e)=>{
        console.log(params);
        setValues({...values, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (CheckPassword()) {
          const { password1, password2 } = values;
          const response=await axios.post(`${host}/api/auth/reset-password`,{password1,params});
            console.log(response.data)
          if (response.data.sta === false) {
           alert('User does not Exist with these Email');
          }
          if (response.data.sta === true) {
            navigate("/login");
          }
        }
      };
    
    const CheckPassword = () => {
        const { password1, password2 } = values;
        let PasswordPattern = ".{6,}"
        if(password1.match(PasswordPattern))
    {
        if(password1!==password2){
            alert('Password must be same in both fields');
          
           return false;
        }else{
            alert('Password has been changed successfully');
            return true;
        }
    }else{
        alert('Password must contain at least 6 letters');
        
           return false;
    }
      };


  return (
    <>
    <FormContainer>
    <div class="container">
        <h2>Choose a new password</h2>
        <p>To secure your account, choose a strong password you haven’t used before and is at least 8 characters long for   </p>
        <form id="changePasswordForm" onSubmit={(event)=>handleSubmit(event)} action="" method="post">
            <label for="newPassword">New Password:</label>
            <input type="password" id="newPassword" name="password1" onChange={(e) => handleChange1(e)} required/>

            <label for="confirmPassword">Confirm Password:</label>
            <input type="password" id="confirmPassword" name="password2" onChange={(e) => handleChange1(e)} required/>
            
            <button type="submit">Submit</button>
            
        </form>
    </div>
    </FormContainer>
     <ToastContainer />
     </>
  )
};

const FormContainer = styled.div`
font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            p{
            margin-bottom: 40px;
        }
        .container {
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            width: 100%;
            max-width: 400px; /* Adjust the maximum width as needed */
        }

        label {
            display: block;
            margin-bottom: 8px;
        }
        h2{
            font-weight: 500;
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
            background-color: #007bff;
            color: #fff;
            padding: 10px;
            border: none;
            border-radius: 15px;
            cursor: pointer;
            width: 90%;
            margin-left: 4%;
            font-weight: 500;
            font-size: medium;
        }

        /* Responsive styles */
        @media only screen and (max-width: 280px) {
            .container {
                max-width: 100%;
                padding: 10px;
            }
        }
`;
