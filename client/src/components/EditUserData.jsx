import React, { useState, useEffect } from "react";
// import { CalendarToday, LocationSearching, MailOutline, PermIdentity, PhoneAndroid,Publish } from "@material-ui/icons";
import {
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@mui/icons-material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import CastForEducationIcon from "@mui/icons-material/CastForEducation";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import LanguageIcon from "@mui/icons-material/Language";
import WcIcon from "@mui/icons-material/Wc";
import {
  ItemContainer,
  ItemTitleContainer,
  ItemAddButton,
  ItemShowImg,
  ItemUploadImg,
  ItemUpdateButton,
  ItemUpload,
  ShowUser,
  UpdateUser,
  ShowUserTop,
  ShowUserBottom,
  ShowTopTitle,
  FontWeight,
  UserShowTitle,
  UserShowInfo,
  UpdateTitle,
  UpdateForm,
  UpdateItem,
  UpdateRight,
  UserRadio,
  MyPublish,
  UserContainer,
} from "./styled";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import useFetch from "../hooks/useFetch";
import axios from "axios";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
const EditUserData = () => {
  const navigate = useNavigate();
  let { email } = useParams();
  // const [data,setData]=useState()
  const { data, loading, err } = useFetch(
    `http://localhost:5001/api/users/${email}`
  );
  console.log("calling");
  const [edit, setEdit] = useState({
    fullname: data?.fullname||"",
    email: data?.email||"",
    mobile: data?.mobile||"",
    designation: data?.designation||"",
    dob: data?.dob||"",
  });
  const [formErrors,setFormErrors]=useState({})
  const [newRecord,setNewRecord]=useState({})
  const [isSubmit,setIsSubmit]=useState(false)
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
        console.log("no err")
      axios
        .put(`http://localhost:5001/api/users/${data._id}`,edit)
        .then((res) => {
          console.log(res);
          // localStorage.setItem("token",JSON.stringify(res.data))
          alert("User details has been updated successfully")
          navigate(`/`)
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [formErrors]);
  const handleChange=(e)=>{
    const name=e.target.name;
const value=e.target.value;
    setEdit({...edit,[name]:value})
   }
 const buttonSubmit=(e)=>{
    e.preventDefault();
    setFormErrors(validate(edit))
    setIsSubmit(true)
   }
const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
    const nameRegex = /^[a-z ,.'-]+$/i;
    if (!values.fullname) errors.fullname = "Name is required";
    else if (!nameRegex.test(values.username))
      errors.username = "Name is not valid one";
    if (!values.email) errors.email = "Email is required";
    else if (!regex.test(values.email))
      errors.email = "This is not a valid Email";
   if(!values.mobile) errors.mobile="Please add phone number"
   else if(values.mobile.length<10||values.mobile.length>13) errors.mobile="Phone number is not valid"
    return errors;
  };
  return (
    <>
      <ItemContainer>
        <ItemTitleContainer>
          <h1>User Details</h1>
          <Link to="/users/addNew">
            <ItemAddButton>Create</ItemAddButton>
          </Link>
        </ItemTitleContainer>
        {loading?"Loading please waite...":
        <UserContainer>
          <ShowUser>
            <ShowUserTop>
              <ShowTopTitle>
                <FontWeight bolder>{data?.fullname}</FontWeight>
                <FontWeight>{data?.email}</FontWeight>
              </ShowTopTitle>
            </ShowUserTop>
            <ShowUserBottom>
              <UserShowTitle>User Details</UserShowTitle>
              <UserShowInfo>
                <PermIdentity className="showIcon" />
                <span className="showInfoTitle">{data?.fullname}</span>
              </UserShowInfo>
              <UserShowInfo>
                <CalendarTodayIcon className="showIcon" />
                <span className="showInfoTitle">{data?.dob?.slice(0, 10)}</span>
              </UserShowInfo>
              <UserShowTitle>Contact Details</UserShowTitle>

              <UserShowInfo>
                <PhoneAndroid className="showIcon" />
                <span className="showInfoTitle">{data?.mobile}</span>
              </UserShowInfo>

              <UserShowInfo>
                <MailOutline className="showIcon" />
                <span className="showInfoTitle">{data?.email}</span>
              </UserShowInfo>
              <UserShowInfo>
                <WcIcon className="showIcon" />
                <span className="showInfoTitle">{data?.dob?.slice(0, 10)}</span>
              </UserShowInfo>
              <UserShowTitle>Designation</UserShowTitle>
              <UserShowInfo>
                <WorkOutlineOutlinedIcon className="showIcon" />
                <span className="showInfoTitle">{data?.designation}</span>
              </UserShowInfo>
            </ShowUserBottom>
          </ShowUser>
          <UpdateUser>
            <UpdateTitle>Edit Details</UpdateTitle>
            <UpdateForm>
              <div>
                <UpdateItem>
                  <label>Full Name</label>
                  <input
                    type="text"
                    placeholder={data?.fullname || "Jacob mathew"}
                    name="fullname"
                    value={edit?.fullname}
                    onChange={handleChange}
                  />
                  <Typography sx={{color:"red"}} variant="caption" display="block" gutterBottom>{formErrors.fullname}</Typography>
                </UpdateItem>
                <UpdateItem>
                  <label>Email</label>
                  <input
                    type="text"
                    placeholder={data?.email || "example@gmail.com"}
                    name="email"
                    value={edit.email}
                    onChange={handleChange}
                  />
                  <Typography sx={{color:"red"}} variant="caption" display="block" gutterBottom>{formErrors.email}</Typography>
                </UpdateItem>
                <UpdateItem>
                  <label>Phone</label>
                  <input
                    type="text"
                    placeholder={data?.mobile || "987 987 786 4"}
                    name="mobile"
                    value={edit.mobile}
                    onChange={handleChange}
                  />
                  <Typography sx={{color:"red"}} variant="caption" display="block" gutterBottom>{formErrors.mobile}</Typography>
                </UpdateItem>
              </div>
              <div>
                <UpdateItem>
                  <label>Designation</label>
                  <select
                    className="newUserSelect"
                    value={edit?.designation}
                    onChange={handleChange}
                    name="designation"
                    id="active"
                  >
                    <option value="1">Manager</option>
                    <option value="2">HR</option>
                    <option value="3">Senior Developer</option>
                    <option value="4">Junior Developer</option>
                  </select>
                </UpdateItem>
                <UpdateItem>
                  <label>Date of birth</label>
                  <input
                    type="date"
                    // placeholder={data?.phone||"987 987 786 4"}
                    name="dob"
                    value={edit?.dob}
                    onChange={handleChange}
                  />
                  {/* <Typography sx={{color:"red"}} variant="caption" display="block" gutterBottom>{formErrors.}</Typography> */}
                </UpdateItem>

                <UpdateItem >
                  <ItemUpdateButton type="button" onClick={buttonSubmit}>Update</ItemUpdateButton>
                </UpdateItem>
              </div>
            </UpdateForm>
          </UpdateUser>
        </UserContainer>}
      </ItemContainer>
    </>
  );
};
export default EditUserData;