import React from 'react'
import { useEffect } from 'react';
import { useLocation } from 'react-router';

function DynamicFavicon() {

const location = useLocation();

useEffect(() => {

    const favicon = document.querySelector("link[rel='icon']")

    if(!favicon) return;

    if (
        location.pathname === '/users/sign_in' ||
        location.pathname === '/users/sign_up'
    ) {
        favicon.href = '/favicon-auth.jpg'
    } else{
        favicon.href = '/favicon-home.png'
    }

},[location.pathname])

  return null;
}

export default DynamicFavicon