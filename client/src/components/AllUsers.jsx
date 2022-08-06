import styled from 'styled-components'
import { DataGrid, GridColDef} from '@mui/x-data-grid';
import { Box } from '@mui/system';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link, useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import axios from 'axios';
import { useState,useEffect } from 'react';
const UsersContainer=styled.div`
    flex: 5;
`
const EditButton = styled.button`
    border: none;
    border-radius: 10px;
    padding: 5px 10px;
    background-color: ${props => props.primary ? "DarkMagenta" : "SeaGreen"};
    color: white;
    cursor: pointer;
    margin-right: 20px;
`
const MyDeleteOutline = styled(DeleteIcon)`
    color: red;
    cursor: pointer;
`

const AllUsers = () => {
    const navigate=useNavigate()
    const [disabled,setDisabled]=useState()
    const [block,setBlock]=useState(false)
    const [data,setData]=useState([])
    const handleDelete=(email)=>{
      console.log("object");
      axios.delete('http://localhost:5001/api/users/'+email)
      .then((res)=>{
        alert(res.data)
        window.location.reload()
      })  
    }
    const handleDisable=(email)=>{
      console.log("disabled cxalled")
      setDisabled(email)
      setBlock(!block)
    }
    useEffect(() => {
      axios.post('http://localhost:5001/api/users/'+disabled)
      .then((res)=>{
        console.log(res.data)
      })
    }, [disabled,block])
    
   useEffect(() => {
     const fetchData=async()=>{
      console.log("object");
      axios.get('http://localhost:5001/api/users')
      .then((res)=>{
        setData(res.data)
      })
    }
    fetchData()
  },[block])
  // const {data,loading,error}=useFetch('http://localhost:5001/api/users')
    
    const row=data.map((user,i)=>{
        const obj={
         id:i+1,
         fullname:user.fullname,
         email:user.email,
         gender:user.gender,
         mobile:user.mobile,
         designation:user.designation,
         dob:user.dob.slice(0,10),
         desabled:user.desabled

        }
         return obj
       })
         const columns: GridColDef[] = [
           { field: 'id', headerName: 'ID', width: 50 },
           { field: 'fullname', headerName: 'User name', width: 130 },
           { field: 'email', headerName: 'Email', width: 170 },
           { field: 'gender', headerName: 'Gender', width: 120 },
           {field: 'designation', headerName: 'Designation',width: 120},
           {field: 'dob', headerName: 'DOB',width: 120},
           {field: 'mobile', headerName: 'Mobile',type:'number',width: 120},
           {field: 'action',
            headerName: 'Action',
            width: 150,
            renderCell: (params) => {
             return (
                 <>
                    <EditButton primary onClick={()=>{navigate(`/edit-user/${params.row.email}`)}}>Edit</EditButton>   
                    <MyDeleteOutline onClick={() => handleDelete(params.row.email)}/>
                 </>
             );
         },
           },
           {field: 'desabled',
            headerName: 'Disable/Enable',
            width: 150,
            renderCell: (params) => {
             return (
                 <>
                  {params.row.desabled?(
                    
                         <EditButton primary onClick={()=>handleDisable(params.row.email)}>Enable</EditButton>
                ):(
                    //   <Link to={"/users/" + params.row.username}>
                         <EditButton primary onClick={()=>handleDisable(params.row.email)}>Disable</EditButton>
                    //  {/* </Link> */}

                )}
                 </>
             );
         },
           }
          
         ];
         const rows = [...row];
    return (
        <UsersContainer>
     <Box style={{ height: 400, width: '70%',marginLeft:"15%"}}>
     <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[10]}
        checkboxSelection
      />
     
     </Box>
    </UsersContainer>
  )
}

export default AllUsers