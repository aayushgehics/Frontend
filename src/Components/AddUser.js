import React,{useState}from 'react'
import './Login.css'
import loginimage from './Loginimage.png';
import { Input,Button,Form } from 'antd';
import axios from 'axios';
import {Link , useNavigate} from 'react-router-dom';

export const AddUser = () => {
const code = "200"
const[userDetails , setUser]= useState({username:"",password:"",project:""})
const[isEnabled , setValue]=useState(true);

onchange=(event)=>
{
    userDetails[event.target.name]=event.target.value;
    setUser(userDetails);
    if(userDetails.username.length>=1&&userDetails.password.length>=1&&userDetails.project.length>=1)
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
const navigate = useNavigate();
onsubmit=()=>
{
  if(userDetails.username===""||userDetails.password===""||userDetails.project==="")
  {
    alert("fill the fields");
  }
  else
  {api.post("/Register?username="+userDetails.username+"&password="+userDetails.password+"&project="+userDetails.project)
  .then(data=>
    {
      console.log(typeof(data.data.success));
      console.log(data.data.success);
      if(data.data.success===code)
      {
        navigate("/dashboard")
      }
      else
      {
        console.log("false")
      }
    })}
}

return (
    <body className="LoginForm">
    <img src={loginimage} alt="user" className="LoginImage" height="70%" width="55%" style={{float:"right",paddingTop:"12vh"}}/>

    <Form  method="post" className="Auth-Form" id="form-1" onSubmit={onsubmit}>
    <div className="dip">
        <h2 style={{fontWeight:"lighter" , letterSpacing:"1vh"}}>Add USer</h2>
      <Input placeholder='Username' type="text" name="username"  onChange={onchange} /><br/>
      <Input placeholder='Password' type="password" name="password" onChange={onchange}/><br/>
      <Input placeholder='Project' type="text" name="project" onChange={onchange}/><br/>
      <Button onClick={onsubmit} disabled={isEnabled}>Register</Button>
    
       <p style={{marginTop:"3%"}}><Link to="/dashboard">Cancel</Link></p> 
    </div>
   
    </Form>
    </body>
  )
}
