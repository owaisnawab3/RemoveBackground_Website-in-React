import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router-dom'
import Upload from './page/Upload'
import SignUp from './page/SignUp'
import Login from './page/Login.jsx'
import RootLayout from './RootLayout.jsx'


const router = createBrowserRouter ([
  {
   element: <RootLayout/>,
   children: [
  {
    path: '/',
    element: <App/>
  },

  {
    path: 'upload',
    element: <Upload/>
  },
  {
    path: 'users/sign_up',
    element: <SignUp/>
  },
  {
    path: 'users/sign_in',
    element: <Login/>
  }
 ]
}
])

createRoot(document.getElementById('root')).render(

  <StrictMode>
    {/* <App /> */}
    <RouterProvider router={router}/>
  </StrictMode>
)
