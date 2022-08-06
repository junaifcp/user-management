import React, { useContext } from 'react'

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';
import {Search,SearchIconWrapper,StyledInputBase,Logout} from './styles'
import { AuthContext } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
  const navigate=useNavigate()
  const {user}=useContext(AuthContext)
  const logout=()=>{
    localStorage.clear("user")
    navigate('/login')
  }
  return (
    <>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="error">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            USER MANAGEMENT
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          {user&&<Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Logout variant='h6'>
              Welcome,   {user?.fullname}&nbsp;|
            </Logout>
            <Logout variant='h6' onClick={logout}>
                LOGOUT
            </Logout>
          </Box>}
          {!user&&<Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Logout variant='h6' onClick={logout}>
                REGISTER
            </Logout>
          </Box> }
          

          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
            //   aria-controls={mobileMenuId}
              aria-haspopup="true"
            //   onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
    </>
  )
}

export default Navbar