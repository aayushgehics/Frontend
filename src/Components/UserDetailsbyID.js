import { Button, Form } from 'antd';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import "./Details.css"
import loginimage from './Loginimage.png';
import {Input} from 'antd';
import axios from 'axios';
import Select from '@mui/material/Select';
import { MenuItem } from '@mui/material';
export const UserDetailsbyID = () => {
   const[searchParam] = useSearchParams();
   const[allProjects , setProject] = useState()
  useEffect(()=>{
    axios.get("http://localhost:8080/Employee/Project")
   .then(res=>{
    setProject(res.data.projects)
   })
  },[])
   const oldusername =searchParam.get("username")
   const projects= searchParam.getAll("projects")
   const [newUserDetails , setUser] = useState({
    newUsername:oldusername
   })
   
   const[newProjects , setProjects] = useState({
    projects:projects
   })
   const onchangeProjects = (event) =>{
    
    newProjects.projects=event.target.value
    setProjects(newProjects)
   }
   onchange=(event)=>
   {
    
    newUserDetails[event.target.name]=event.target.value
    setUser(newUserDetails);
   }

   const navigate = useNavigate()
   const handelSubmit=(event)=>{
    event.preventDefault();
    if(newUserDetails.newUsername.length<=0 || newProjects.projects.length<=0)
    {
     alert("Fields cannot be empty") 
    }
    else
    {
    axios.post("http://localhost:8080/Employee/Update?oldusername="+oldusername+"&username="+newUserDetails.newUsername+"&projects="+newProjects.projects)
    .then(res=>{
        if(res.data.Status==="200")
        {
            navigate('/dashboard')
        }
        else
        {
          alert("Sorry cannot edit the user at the moment");
        }
    })
   }
  }
   return (
    <Form className='EditForm'>
        <img src={loginimage} alt="user" className="LoginImage" height="70%" width="55%" style={{float:"right",paddingTop:"12vh"}}/>
        <div className='dip'>
            <h2 style={{fontWeight:"lighter"}}>User Update</h2>
            <label>Username : </label>
            <Input className='Inputt' placeholder='Username'  type="text" name="newUsername" defaultValue={oldusername} onChange={onchange} /><br/>
            {/* <Input className='Inputt' key={key} placeholder='Projects'  type="text" name="projects" defaultValue={projects} onChange={onchangeProjects}/><br/> */}
        <label>Projects : </label>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          style={{width:"25vh",height:"4vh",marginTop:"2%"}}
          onChange={onchangeProjects}
          defaultValue=""
        >
          {allProjects?.map(data=>{
            return(
              <MenuItem value={data}>{data}</MenuItem>
            )
          })}

                 </Select>
    
            <Button onClick={handelSubmit}>Update</Button>
            <p><Link to="/dashboard">Cancel</Link></p>
        </div>
    </Form>
  )
}
