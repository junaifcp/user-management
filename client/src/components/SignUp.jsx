import React, { useState,useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import img1 from '../assets/img1.png'
import {
  FormControl,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        User Management
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();
const SignUp = () => {
    const navigate=useNavigate()
  const [userSignup, setUserSignup] = useState({
    fullname: "",
    email: "",
    password: "",
    gender: "",
    designation: "",
    dob: "",
    cPassword: "",
    mobile:""
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserSignup({ ...userSignup, [name]: value });
  };
  const handleSubmit = () => {
    // e.preventDefault();
    setFormErrors(validate(userSignup));
    setIsSubmit(true);
  };
  useEffect(() => {
    console.log(formErrors);
    console.log(userSignup);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      // setNewRecord({...userSingup,id:new Date().getTime().toString()})
      axios
        .post("http://localhost:5001/api/auth/register",{...userSignup})
        .then((res) => {
          console.log(res);
          // localStorage.setItem("token",JSON.stringify(res.data))
          navigate("/login");
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
    const mobileRegex=/^([+]\d{2})?\d{10}$/i

    if (!values.fullname) errors.fullname = "Fullname is required";
    else if (!nameRegex.test(values.fullname))
      errors.username = "Name is not valid one";
    if (!values.email) errors.email = "Email is required";
    else if (!regex.test(values.email))
      errors.email = "This is not a valid Email";
    if (!values.password) errors.password = "password is required";
    else if (values.password.length < 4)
      errors.password = "Password must be 4 letters";
    if (!values.cPassword) errors.cPassword = "password is not matching";
    if (values.password!==values.cPassword) errors.cPassword = "password is not matching";
    if(!values.mobile) errors.mobile="Mobile number can't be empty"
     else if(values.mobile.length<10) errors.mobile="Mobile number is not valid"
     else if(!mobileRegex.test(values.mobile)) errors.mobile="Mobile number is not valid"
    return errors;
  };
  return (
    <>
      <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: `url(${img1})`,
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={4}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <Box component="form" noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  value={userSignup.fullname}
                  onChange={handleChange}
                  label="Full Name"
                  name="fullname"
                  autoComplete="Full Name"
                  autoFocus
                />
                 <Typography sx={{ color: "red" }}>{formErrors.fullname}</Typography>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  value={userSignup.email}
                  onChange={handleChange}
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                 <Typography sx={{ color: "red" }}>{formErrors.email}</Typography>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  value={userSignup.dob}
                  onChange={handleChange}
                  type="date"
                  id="email"
                  label="Date of birth"
                  name="dob"
                  autoComplete="date of birth"
                  autoFocus
                />
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">
                    Gender
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="gender"
                  >
                    <Box sx={{ display: "flex" }}>
                      <FormControlLabel
                        value="female"
                        control={<Radio />}
                        label="Female"
                        onChange={handleChange}
                      />
                      <FormControlLabel
                        value="male"
                        control={<Radio />}
                        label="Male"
                        onChange={handleChange}
                      />
                      <FormControlLabel
                        value="other"
                        control={<Radio />}
                        label="Other"
                        onChange={handleChange}
                      />
                    </Box>
                  </RadioGroup>
                </FormControl>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  value={userSignup.mobile}
                  onChange={handleChange}
                  id="mobile"
                  label="Mobile Number"
                  name="mobile"
                  autoComplete="Mobile number"
                  placeholder="999 888 777 5"
                  autoFocus
                />
                <Typography sx={{ color: "red" }}>{formErrors.mobile}</Typography>
                <FormControl
                  variant="standard"
                  sx={{ m: 1, minWidth: 120 }}
                  fullWidth
                >
                  <InputLabel id="demo-simple-select-standard-label">
                    Designation
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    label="Select account type"
                    name="designation"
                    value={userSignup.designation}
                    displayEmpty
                    onChange={handleChange}
                  >
                    <MenuItem value="" disabled>
                      <em>Select type</em>
                    </MenuItem>
                    <MenuItem value={"Manager"}>Manager</MenuItem>
                    <MenuItem value={"HR"}>HR</MenuItem>
                    <MenuItem value={"Developer"}>Developer</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  value={userSignup.password}
                  onChange={handleChange}
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <Typography sx={{ color: "red" }}>{formErrors.password}</Typography>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  value={userSignup.cPassword}
                  onChange={handleChange}
                  name="cPassword"
                  label="Confirm Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <Typography sx={{ color: "red" }}>{formErrors.cPassword}</Typography>
                <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Accept terms and conditions"
              />
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleSubmit}
                >
                  Sign up
                </Button>
                <Grid container>
                  <Grid item onClick={()=>navigate('/login')} sx={{cursor:"pointer"}}>
                    <Link variant="body2">
                      {"Already have an account? Sign In"}
                    </Link>
                  </Grid>
                </Grid>
                <Copyright sx={{ mt: 5 }} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
};

export default SignUp;
