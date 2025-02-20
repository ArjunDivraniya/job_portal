import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import SignUp from './components/auth/SignUp.jsx'
import Login from './components/auth/Login.jsx'
import Home from './components/Home.jsx'
import Jobs from './components/Jobs.jsx'
import Browse from './components/Browse.jsx'
import Profile from './components/Profile.jsx'

const appRouter = createBrowserRouter([
{
  path:'/',
  element:<Home />
},

{
  path:'login',
  element:<Login />
},

{
  path:'/signup',
  element:<SignUp />
},{

  path: "/jobs",
  element:<Jobs />
},{

    path: "/browse",
    element:<Browse />
  },{

    path: "/profile",
    element:<Profile />
  }

])

function App() {

  return (
    <>
    <RouterProvider router = {appRouter} />
 
    </>
  )
}

export default App
