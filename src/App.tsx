import { Routes, Route, useNavigate } from 'react-router-dom'
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Player from './Pages/Player/Player';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { auth } from './controllers/controllers';

export const App = () => {

   const navigate = useNavigate();

   useEffect(() => {
      onAuthStateChanged(auth, async (user) => {
         if(user){
            navigate('/')
         } else {
            navigate('/login')
         }
      })
   },[])
   
   return (
      <>
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/player/:id" element={<Player />} />
         </Routes>
      </>
   );
};

export default App;