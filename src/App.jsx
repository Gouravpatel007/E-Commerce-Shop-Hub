import React from 'react';
import {Link, Route, Routes, useLocation}from "react-router-dom";
import Home from './components/Home';
import  LoginPage  from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import Details from './components/Details';
import Create from './components/Create';
import Edit from './components/Edit';
// import { AiOutlineHome } from "react-icons/ai";
   

  const App = () => {
    const {search,pathname} = useLocation();

    return (
      <div className='h-screen w-screen flex'>
        
        {(pathname != "/" || search.length > 0) && (
            <Link to="/" className='absolute left-[17%] top-[3%] text-red-300'>Home</Link>
        )}
        
      <Routes>
          <Route path="/" element={<Home />}/>
          
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route path="/create" element={<Create />}/>
          <Route path="/details/:id" element={<Details />}/>
          <Route path="/edit/:id" element={<Edit />}/>
      </Routes>
      </div>
    )
  }

  export default App;
