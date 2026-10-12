import './App.css'
import { Suspense, lazy } from 'react'
import Loading from './loading/Loading'
import Navbar from './components/Navbar'

const MainConponents = lazy(() => import('./components/Home'))

function App() {


  return (
    <>
     <Suspense fallback={<Loading/>}>
      <Navbar/>
      <MainConponents/>
    </Suspense>

    </>
  )
}

export default App
