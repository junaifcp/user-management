
import { useContext } from 'react';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import { AuthContext } from './context/authContext';
import AddUser from './pages/AddUser';
import EditUser from './pages/EditUser';
import Home from './pages/Home';
import Register from './pages/Register';
import UserLogin from './pages/UserLogin';
function App() {
  const {user}=useContext(AuthContext)
  return (
    <>
     <Router>
      <Routes>
        <Route exact path='/' element={user?<Home/>:<Register/>}/>
        <Route path='/edit-user/:email' element={<EditUser/>}/>
        <Route path='/login' element={<UserLogin/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/users/addNew' element={<AddUser/>}/>
     </Routes>
     </Router>
    </>
  );
}
export default App;
