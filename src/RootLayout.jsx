import React from 'react'
import { Outlet } from 'react-router'
import DynamicFavicon from './components/DynamicFavicon'

function RootLayout() {
  return (
    <>
        <DynamicFavicon/>
        <Outlet/>
    </>
  )
}

export default RootLayout