import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React,{useState,useEffect, useContext} from "react";
import {useNavigate} from 'react-router-dom'
import { AuthContext } from '../context/authContext';
import {loginCall} from '../utils/apiCalls'
import img2 from '../assets/img2.png'
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        User Management
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

const Login = () => {
      const {loading,error,dispatch}=useContext(AuthContext)
      const navigate=useNavigate()
      const [login,setLogin]=useState({fullname:'',password:''})
      const [formError,setFormError]=useState({})
      const [isSubmit,setIsSubmit]=useState(false)
      const handleSubmit=async(e)=>{
        e.preventDefault()
              console.log('entered handle submit');
              setFormError(validator(login));
              setIsSubmit(true)
              if(Object.keys(formError).length===0&&isSubmit){
                console.log("indie login call");
               loginCall(login,dispatch)
               navigate('/')
              }
      }
      const handleChange=(e)=>{  
        const {name,value}=e.target;
        setLogin({...login,[name]:value})
      }
      const validator=(values)=>{
        const errors={}
        const regex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
        if(!values.email) errors.email="Please enter your email";
        else if(!regex.test(values.email)) errors.email="This is not a valid Email"
        if(!values.password) errors.password="password is required";
        else if(values.password.length<4) errors.password="Password must be 4 letters"
        return errors
      }   
  return (
    <>
     <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${img2})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                value={login.email}
                onChange={handleChange}
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
               <Typography sx={{color:'red'}}>{formError.email}</Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                value={login.password}
                onChange={handleChange}
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Typography sx={{color:'red'}}>{formError.password}</Typography>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {loading?"Loading...":"Sign In"}
              </Button>
              {error&&<span style={{color:'red'}}>{error.message}</span>}
              <Grid container>
                
                <Grid item onClick={()=>navigate('/register')} sx={{cursor:"pointer"}}>
                  <Link variant="body2">
                    {"Don't have an account? Sign Up"}
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
  )
}

export default Login