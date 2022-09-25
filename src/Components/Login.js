import React,{useState}from 'react'
// import './Login.css'
import loginimage from './Loginimage.png';
import { Input,Button,Form } from 'antd';
import axios from 'axios';
import {Link,useNavigate} from 'react-router-dom';
import Popup from 'reactjs-popup';

export const Login = () => {
const code = "200"
  const[isEnabled , setValue]=useState(true);
const[userDetails , setUser]= useState({username:"",password:""})
onchange=(event)=>
{
    userDetails[event.target.name]=event.target.value;
    setUser(userDetails);
    if(userDetails.username.length>=1&&userDetails.password.length>=1)
    {
      setValue(false);
    }
    else
    {
      setValue(true);
    }
}  
const api = axios.create({
  baseURL:"http://localhost:8080/Employee"
})

let navigate = useNavigate();
onsubmit=()=>
{ 
  
  console.log(userDetails);
  api.post("/Login?username="+userDetails.username+"&password="+userDetails.password)
  .then(data=>
    {
      console.log(data.data.success);
      if(data.data.success===code)
      {
        window.history.pushState(null,null,window.location.href)
        window.onpopstate = function () {
            window.history.go(1);
        };
        navigate("/dashboard")
      }
      else 
      {
        <Popup position="bottom center" trigger={<Button></Button>}>user invalid</Popup>
      }
    })
}

return (
    <body className="LoginForm">
    <img src={loginimage} alt="user" className="LoginImage" height="70%" width="55%" style={{float:"right",paddingTop:"12vh"}}/>

    <Form action="Login" method="post" className="Auth-Form" id="form-1" onSubmit={onsubmit}>
    <div className="dip">
        <h2 style={{fontWeight:"lighter" , letterSpacing:"1vh"}}>Login</h2>
      <Input placeholder='Username' type="text" name="username" onChange={onchange}/><br/>
      <Input placeholder='Password' type="password" name="password" onChange={onchange}/><br/>
  
      <Button onClick={onsubmit} disabled={isEnabled}>Login</Button>
       <p style={{marginTop:"3%"}}>Not a registered user <Link to="/register">Sign-up</Link></p> 
    </div>
   
    </Form>
    </body>
  )
}
