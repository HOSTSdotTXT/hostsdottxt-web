import './App.css'
import { useAuth } from './hooks/useAuth'
import Home from './routes/Home'
import Login from './routes/Login'
import Records from './routes/Records'
import SignUp from './routes/SignUp.js'
import Zones from './routes/Zones'
import Button from './uikit/Button'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Link, useNavigate } from 'react-router-dom'
import { styled } from '@stitches/react'

const MessageBar = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0px',
  fontSize: '1.5em',
  fontWeight: 'bold',
  background: 'repeating-linear-gradient(-45deg, #ffff00, #ffff00 20px, #000000 20px, #000000 40px)',
  width: '100%',
});
const MessageBox = styled('div', {
  fontSize: '1.5em',
  padding: '0px 2em',
  fontWeight: 'bold',
  backgroundColor: '#ffff00',
})

function ButtonRow() {
  let auth = useAuth()
  let navigate = useNavigate()

  return (
    <div style={{ display: 'flex' }}>
      {auth.isAuthenticated() ? (
        <>
          <Button
            className="LoginButton"
            primary
            onClick={() => navigate('/zones')}
          >
            Zones
          </Button>
          <Button
            className="LoginButton"
            secondary
            onClick={() => auth.signout(() => navigate('/'))}
          >
            Log Out
          </Button>
        </>
      ) : (
        <>
          <Button
            className="LoginButton"
            primary
            onClick={() => navigate('/login')}
          >
            Login
          </Button>
          <Button
            className="LoginButton"
            secondary
            onClick={() => navigate('/signup')}
          >
            Sign Up
          </Button>
        </>
      )}
    </div>
  )
}
function App() {
  let auth = useAuth()

  return (
    <div className="App">
    <MessageBar>
      <MessageBox>
        This software is in public alpha. Please don't use it for anything critical
      </MessageBox>
    </MessageBar>
      <BrowserRouter>
        <header>
          <Link to={auth.isAuthenticated() ? '/zones' : '/'}>
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
