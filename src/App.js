import './App.css'
import { useAuth } from './hooks/useAuth'
import Home from './routes/Home'
import Login from './routes/Login'
import Records from './routes/Records'
import SignUp from './routes/SignUp.js'
import Zones from './routes/Zones'
import Button from './uikit/Button'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Link } from 'react-router-dom'

function ButtonRow() {
  let auth = useAuth()

  return (
    <div style={{ display: 'flex' }}>
      {auth.isAuthenticated() ? (
        <>
          <Button
            className="LoginButton"
            primary
            onClick={() => (document.location = '/zones')}
          >
            Zones
          </Button>
          <Button
            className="LoginButton"
            secondary
            onClick={() => auth.signout(() => {})}
          >
            Log Out
          </Button>
        </>
      ) : (
        <>
          <Button
            className="LoginButton"
            primary
            onClick={() => (document.location = '/login')}
          >
            Login
          </Button>
          <Button
            className="LoginButton"
            secondary
            onClick={() => (document.location = '/signup')}
          >
            Sign Up
          </Button>
        </>
      )}
    </div>
  )
}
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <header>
          <Link to="/">
            <h1>
              HOSTS<b>dot</b>TXT
            </h1>
          </Link>
          <ButtonRow />
        </header>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/zones" element={<Zones />} />
          <Route path="/zones/:zoneName" element={<Records />} />
          <Route path="/" exact element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
