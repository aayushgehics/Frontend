import React, {useState } from 'react'
import axios from 'axios'
import { styled } from '@mui/material/styles';
import './Dashboard.css'
import { Wave } from 'react-animated-text'
import { Table , TableHead ,TableRow, TableBody ,Menu,MenuItem, TableCell ,tableCellClasses, TableContainer,Button, Input } from '@mui/material'
import { useNavigate } from 'react-router';
import { createSearchParams } from 'react-router-dom';
const api = axios.create({
    baseURL:"http://localhost:8080/Employee"
  })
  
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "black",
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
export const Dashboard = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const[isLoading , setLoading] = useState(true)
  const [details , setDetails] = useState({
    username:[],
    projects:[]
  })
  const[userIndex,setUser] = useState();
  var i=0;
  var j=0;
 
  const navigate = useNavigate();
    api.get("/Display").then(res=>
    {
      console.log('2')
      details.username = Object.keys(res.data.user);
      details.projects = Object.values(res.data.user);
      setDetails(details)
      console.log(details)
      setLoading(false)
    }) 
    if(isLoading)
    {
      return(
        <h1 style={{fontWeight:"lighter" , letterSpacing:"1vh",textAlign:"center" ,marginTop:"15%"}}>
        <Wave
        text="LOADING DATA"
        effect="stretch"
        effectChange="2"
      />
      </h1>
      )
    }
    function handelSubmit(event){
      event.preventDefault();
      if(userIndex>=details.username.length || userIndex<0)
      {
        alert("Cannot find user with given index")
      }
      else
      {
        navigate({
          pathname:`/userdetails/${userIndex}`,
          search:createSearchParams({  
            id:userIndex+1,
            username:details.username[userIndex],
            projects:details.projects[userIndex],
          }).toString()
        });
      }
    }
    function handelDelete(event){
      event.preventDefault()
      if(userIndex>=details.username.length || userIndex<0)
      {
        alert("Cannot find user with given index")
      }
      else
      {
        axios.get("http://localhost:8080/Employee/Delete?username="+details.username[userIndex])
        .then(res=>{
          if(res.data.Status==="200")
          {
            window.location.reload(true);
          }
          else
          {
            alert("server error occured");
          }
        })
      }
    }
    function handelChange(event){
      event.preventDefault()
      var value =(event.target.value)
      --value;
      console.log(value)
      setUser(value)
    }
    return (
    <div >
       <h1 style={{
        textAlign:"center",
        fontWeight:"lighter",
         letterSpacing:"1vh",
      }} >List of users
      <Button
        variant="contained"
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        style={{
          float:"right"
        }}
      >
        Options
      </Button>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        onClose={handleClose}
        open={Boolean(anchorEl)}
      >
        <MenuItem>
        <Input placeholder='Index of User'
        name="userIndex"
        style={{
          width:"100%"
        }}
        onChange={handelChange}
        >
        </Input>
        </MenuItem>
        <MenuItem>
        <Button variant="outlined" color='error' style={{color:"red",fontSize:"1.5vh" , width:"25vh",float:"right",marginTop:"1%"}} onClick={handelDelete}>Delete User</Button>
      </MenuItem>
      <MenuItem>
      <Button variant="outlined" style={{color:"black",backgroundColor:"rgb(110, 245, 252)",fontSize:"1.5vh" , width:"25vh",float:"right",marginTop:"1%"}} onClick={handelSubmit}>Update User</Button>
      </MenuItem>
      <MenuItem><Button variant="outlined" style={{color:"black",backgroundColor:"rgb(110, 245, 252)",fontSize:"65%" , width:"25vh",float:"right",marginTop:"1%"}} onClick={()=>navigate("/adduser")}>Add User</Button></MenuItem>
        <MenuItem onClick={()=>navigate("/")}>Logout</MenuItem>
      </Menu>
      </h1>
      <TableContainer style={{borderRadius:"2%"}}>
        <Table>
          <TableHead>
            <StyledTableRow >
              <StyledTableCell width={"1%"} style={{fontSize:"120%"}} >Sr.Number</StyledTableCell>
              <StyledTableCell align='right' style={{fontSize:"120%"}}>Username</StyledTableCell>
              <StyledTableCell align='right' style={{fontSize:"120%"}} width={"50%"}>Projects</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {
               details.username.map(data=>{
                return(
                  <StyledTableRow hover={true} >
                  <StyledTableCell >{++i}</StyledTableCell>
                  <StyledTableCell align='right' style={{fontSize:"100%"}} >{data}</StyledTableCell>
                  <StyledTableCell align='right' style={{fontSize:"100%"}} >{details.projects[j++].join("\t,\t")}</StyledTableCell>
                  </StyledTableRow>
                )
              })
            }
            
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
