import React from 'react'
import { isExpired, decodeToken } from 'react-jwt'
import { Navigate, useLocation } from 'react-router-dom'

let AuthContext = React.createContext()

export function AuthProvider({ children }) {
  let [token, setToken] = React.useState(localStorage.getItem('token'))

  let signin = (token, callback) => {
    setToken(token)
    localStorage.setItem('token', token)
    callback()
  }

  let signout = (callback) => {
    setToken(null)
    localStorage.removeItem('token')
    callback()
  }

  let isAuthenticated = () => {
    return token != null && !isExpired(token)
  }

  let getDn = () => {
    if (isAuthenticated()) {
      return decodeToken(token)["dn"]
    }
    return ""
  }

  let value = { token, signin, signout, isAuthenticated, getDn }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return React.useContext(AuthContext)
}

export function RequireAuth({ children }) {
  let auth = useAuth()
  let location = useLocation()

  if (!auth.token || isExpired(auth.token)) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}
