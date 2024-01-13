import './App.css'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { Outlet } from 'react-router-dom'
import authService from './appwrite/auth'
import { login,logout } from './store/authSlice'  //reducers

function App() {
  const[loading,setLoading] = useState(true); //So that website loads when we visit it
  const dispatch = useDispatch();

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData) => {     
      if(userData)          //if user exists then theres userData
      {
        dispatch(login({userData}))   //Then dispatch login func with userData recieved
      }
      else
      {
        dispatch(logout())            //Else dispatch logout
      }
    })
    .finally( ()=>setLoading(false) )   //finally we close the loading screen
  },[])

  return !loading ? (   //If not loading then display our components
     <div className='min-h-screen flex flex-wrap content-between bg-gray-400' >
        <div className='w-full block'>
          <Header />
            <main>
              TODO:<Outlet />
            </main>
          <Footer />
        </div>
    </div>
    ) : null
}

export default App