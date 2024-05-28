import React from "react";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";
import styled from "styled-components";
import  Cookie from 'js-cookie';
import axios from "axios";
import { logoutRoute,host } from "../../utils/APIRoutes";
export default function Logout() {
  const navigate = useNavigate();
  
  const handleClick = async () => {
   console.log("123");
    const response = await axios.get(`${host}/login/sucess`, { withCredentials: true });
    const data = await axios.get(`${logoutRoute}/${response.data.user._id}`,{withCredentials:true});
    if (data.status === 200) {
   
   Cookie.remove('jwt', { path: '/' });
      navigate("/login");
    }
  };
  return (
    <Button onClick={handleClick}>
      <BiPowerOff />
    </Button>
  );
}

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: white;
  border: none;
  cursor: pointer;
  svg {
    font-size: 1.3rem;
    color: black;
  }
`;
