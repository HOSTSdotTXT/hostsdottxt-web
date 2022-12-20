import './App.css'
import { useAuth } from './hooks/useAuth'
import { useFeatures } from './hooks/useFeatures'
import Home from './routes/Home'
import Login from './routes/Login'
import Records from './routes/Records'
import SignUp from './routes/SignUp.js'
import Zones from './routes/Zones'
import Button from './uikit/Button'
import { animated, easings, useSpring } from '@react-spring/web'
import { styled } from '@stitches/react'
import { useEffect, useState } from 'react'
import { Oval } from 'react-loading-icons'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Link, useNavigate } from 'react-router-dom'

const MessageBar = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0px',
  fontSize: '1.5em',
  fontWeight: 'bold',
  background:
    'repeating-linear-gradient(-45deg, #ffff00, #ffff00 20px, #000000 20px, #000000 40px)',
  width: '100%',
})
const MessageBox = styled('div', {
  fontSize: '1.5em',
  padding: '0px 2em',
  fontWeight: 'bold',
  backgroundColor: '#ffff00',
})
const DnBox = styled('div', {
  color: '#424242',
  fontSize: '1.1em',
  padding: '0.6em 0.75em',
})

function ButtonRow() {
  let auth = useAuth()
  let navigate = useNavigate()

  return (
    <div style={{ display: 'flex' }}>
      {auth.isAuthenticated() ? (
        <>
          {/* TODO: This should go to a profile page once one exists */}
          <DnBox onClick={() => navigate('/zones')}>{auth.getDn()}</DnBox>
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
  let features = useFeatures()

  return (
    <div className="App">
      <LoadingScreen paused={features == null} />
      <MessageBar>
        <MessageBox>
          This software is in public alpha. Please don't use it for anything
          critical
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

function LoadingScreen({ paused }) {
  let [display, setDisplay] = useState(true)
  const spring = useSpring({
    to: { opacity: 0 },
    from: { opacity: 1 },
    delay: 100,
    reset: true,
    pause: paused,
    onRest: () => setDisplay(false),
    config: { duration: 250 },
  })

  const style = {
    zIndex: '9999',
    position: 'absolute',
    backgroundColor: '#ffffff',
    width: '100vw',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
  }

  return (
    <animated.div
      style={{ display: display ? 'flex' : 'none', ...style, ...spring }}
    >
      <div>
        <div style={{ display: 'block' }}>
          <div>
            <Oval style={{ transform: 'scale(2)' }} stroke="#3b82f6" />
          </div>
          <div
            style={{
              padding: '1em 0px 0px 1em',
              fontSize: '2em',
              color: '#6969dd',
            }}
          >
            Loading...
          </div>
        </div>
      </div>
    </animated.div>
  )
}

export default App
