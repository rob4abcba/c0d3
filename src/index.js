import React from 'react'
import ReactDOM from 'react-dom'
import './css/index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

import { loadUserInfo } from './helpers/auth/actions'

const landingPage = document.querySelector( '#landingContainer' )
const reactContainer = document.querySelector( '#reactContainer' )
const isProbablyLoggedIn = localStorage.getItem( 'session_c0d3' )
const isRootURL = window.location.pathname === '/'
reactContainer.classList.add( 'hidden' )

if ( (isProbablyLoggedIn && isRootURL ) || !isRootURL) {
  landingPage.classList.add( 'hidden' )
}

loadUserInfo( () => {
  const userInfo = { ...window.userInfo }
    // TODO: Remove hack. Replace all instances of userName with username
  userInfo.userName = userInfo.username
  const { userName, id } = userInfo || {}
  const isLoggedIn = Boolean( userName ) && Boolean( id )

  if ( isLoggedIn ) {
    landingPage.classList.add( 'hidden' )
    reactContainer.classList.remove( 'hidden' )
    return ReactDOM.render( <App />, reactContainer )
  }

  if ( isRootURL ) {
    landingPage.classList.remove( 'hidden' )
    reactContainer.classList.add( 'hidden' )
  } else {
    landingPage.classList.add( 'hidden' )
    reactContainer.classList.remove( 'hidden' )
    return ReactDOM.render( <App />, reactContainer )
  }
} )

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()