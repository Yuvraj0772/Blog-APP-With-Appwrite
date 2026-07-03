import { useState,useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css'
import authService from './appwrite/auth';
import { Header, Footer } from './components';
import {login, logout} from './store/authSlice';

function App() {
  //console.log(import.meta.env.VITE_APPWRITE_URL);
  
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}));
      }
      else {
        dispatch(logout());
      }
    })
    .finally(() => {
      setLoading(false);
    })
  }, [dispatch]);

  return (
    <>
       <h1>React Mega Project</h1>
       return !loading ? (
        <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
          <div className='w-full block'>
            <Header />
            <main>
              // outlet
              
            </main>
            <Footer />
          </div>
        </div>
       ) : null
    </>
  )
}

export default App
