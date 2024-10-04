
import { BrowserRouter,Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Navbar from "./Navbar"
import Appointment from './Pages/Appointment';
import About from './Pages/About';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard'
import { useContext, useEffect } from 'react';
import { AppContext } from './ContextApi';
import ProtectedRoute from './ProtectedRoute';
import Overview from './adminComponents/Overview';
import Appointments from './adminComponents/Appointments';
import Doctors from './adminComponents/Doctors';
import Products from './adminComponents/Products';
import Support from './adminComponents/Support';
import Departments from './adminComponents/Departments';
import AddAdmin from './adminComponents/AddAdmin';
function App() {
   const {setRole,userRole,isAuthenticated}=useContext(AppContext);
    

  return (
    <>
  <BrowserRouter>
   
    <Routes>
      <Route path='/' element={<><Navbar/> <Home/></>}></Route>
      <Route path='/appointment' element={<><Navbar/><Appointment/> </>}></Route>
      <Route path='/about' element={<><Navbar/> <About/> </>}></Route>
      <Route path='/register' element={<><Navbar/><Register/></>}></Route>
      <Route path='/login' element={<><Navbar/><Login/></>}></Route>
      <Route path='/dashboard' element={<ProtectedRoute requiredRole={"Admin"} Children={Dashboard}/>}>
            <Route path="overview" element={<Overview/>}></Route>
            <Route path="appointments" element={<Appointments/>}></Route>
            <Route path="doctors" element={<Doctors/>}></Route>
            <Route path="departments" element={<Departments/>}></Route>
            <Route path="products" element={<Products/>}></Route>
            <Route path="support" element={<Support/>}></Route>
            <Route path="add/admin" element={<AddAdmin/>}></Route>

      </Route>
    </Routes>
   </BrowserRouter>
  </>
  )
}

export default App
