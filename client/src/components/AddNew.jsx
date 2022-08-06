

import { Typography } from "@mui/material";
import axios from "axios";
import { useState,useEffect } from "react";
import { Navigate } from "react-router-dom";
import styled from "styled-components";

const TheList = styled.div`
    flex: 4;
    margin: 20px;
`
const UserForm = styled.form`
    display: flex;
    flex-wrap: wrap;
`
const UserItem = styled.div`
    width: 400px;
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    margin-right: 20px;
    label {
        margin-bottom: 10px;
        font-size: 14px;
        font-weight: 600;
        color: rgb(151, 150, 150);
    }
    input {
        height: 20px;
        padding: 10px;
        border: 1px solid gray;
        border-radius: 5px;
    }
    select{
        height: 40px;
        border-radius: 5px;
    }
`
const UserRadio = styled.div`
    input {
        margin-top: 15px;
    }
    label{
        margin: 10px;
        font-size: 18px;
        color: #555;
    }
`
const UserButton = styled.button`
    width: 200px;
    border: none;
    background-color: #1876F2;
    color: white;
    padding: 7px 10px;
    font-weight: 600;
    border-radius: 10px;
    margin-top: 30px;
    cursor: pointer;
`
const AddNew = () => {
    const [type,setType]=useState(1)
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [userSignup, setUserSignup] = useState({
        email: "",
        password: "",
        gender:"",
        mobile:"",
        fullname:"",
        designation:"",
        dob:"",

      });

    const handleSubmit=(e)=>{
        e.preventDefault();
        setFormErrors(validate(userSignup));
        setIsSubmit(true);
    }

    const handleChange=(e)=>{
        const name=e.target.name;
        const value=e.target.value;
        setUserSignup({...userSignup,[name]:value})
    }
    useEffect(() => {
        console.log(formErrors);
        console.log(userSignup);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
          // setNewRecord({...userSingup,id:new Date().getTime().toString()})
          axios
            .post("http://localhost:5001/api/auth/register",userSignup)
            .then((res) => {
              console.log(res);
              // localStorage.setItem("token",JSON.stringify(res.data))
              alert("New user has been created successfully")
              Navigate('/')
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }, [formErrors]);
    const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
        const nameRegex = /^[a-z ,.'-]+$/i;
        const phoneRegex= /^[6-9]\d{9}$/i
        if (!values.fullname) errors.fullname = "fullname is required";
        if (!values.email) errors.email = "Email is required";
        else if (!regex.test(values.email))
          errors.email = "This is not a valid Email";
        if (!values.password) errors.password = "password is required";
        else if (values.password.length < 4)
          errors.password = "Password must be 4 letters";
          if(!values.mobile) errors.mobile = "Phone number can't be empty"
          else if(!phoneRegex.test(values.mobile)) errors.mobile="Phone number is not valid"   
       return errors;
      };
  return (
    <TheList>
            <h1>Add New User</h1>
            <UserForm onSubmit={handleSubmit}>
              
                <UserItem>
                    <label>Full Name</label>
                    <input type="text"
                    name="fullname"
                    value={userSignup.fullname} 
                    onChange={handleChange}
                    placeholder="John Smith" />
                    <Typography sx={{color:"red"}} variant="caption" display="block" gutterBottom>{formErrors.fullname}</Typography>
                </UserItem>
                <UserItem>
                    <label>Email</label>
                    <input 
                    name="email"
                    value={userSignup.email} 
                    onChange={handleChange}
                    type="email"
                     placeholder="john@gmail.com" />
                     <Typography sx={{color:"red"}} variant="caption" display="block" gutterBottom>{formErrors.email}</Typography>
                </UserItem>
                <UserItem>
                    <label>Password</label>
                    <input 
                    name="password"
                    value={userSignup.password} 
                    onChange={handleChange}
                    type="password" 
                    placeholder="password" />
                    <Typography sx={{color:"red"}} variant="caption" display="block" gutterBottom>{formErrors.password}</Typography>
                </UserItem>
                <UserItem>
                    <label>Phone</label>
                    <input 
                    type="text" 
                    name="mobile"
                    value={userSignup.mobile} 
                    onChange={handleChange}
                    placeholder="+91 123 456 78" />
                    <Typography sx={{color:"red"}} variant="caption" display="block" gutterBottom>{formErrors.mobile}</Typography>
                </UserItem>
                <UserItem>
                    <label>Gender</label>
                    <UserRadio>
                        <input type="radio" name="gender" id="male" value="male" onChange={handleChange} />
                        <label for="male">Male</label>
                        <input type="radio" name="gender" id="female" value="female" onChange={handleChange} />
                        <label for="female" >Female</label>
                        <input type="radio" name="gender" id="other" value="other" onChange={handleChange} />
                        <label for="other">Other</label>
                    </UserRadio>
                </UserItem>
                <UserItem>
                    <label>Designation</label>
                    <select className="newUserSelect" 
                    value={userSignup.designation}
                    onChange={handleChange}
                     name="accountType"
                      id="active">
                        <option value="Admin">Admin</option>
                        <option value="Manager">Manager</option>
                        <option value="HR">HR</option>
                        <option value="Developer">Developer</option>
                    </select>
                </UserItem>
                <UserItem>
                    <label>Date of birth</label>
                    <input 
                    name="dob"
                    value={userSignup.dob} 
                    onChange={handleChange}
                    type="date"/>
                </UserItem>
                <UserButton type="submit">Create</UserButton>
            </UserForm>
        </TheList>
  )
}

export default AddNew