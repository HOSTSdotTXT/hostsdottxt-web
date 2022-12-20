import { useAuth } from '../hooks/useAuth'
import { useErrorModal } from '../hooks/useErrorModal'
import { useFeatures } from '../hooks/useFeatures'
import Button from '../uikit/Button.js'
import Input from '../uikit/Input.js'
import { AlignRight, Flex, LoginCard, StyledLabel, Subtitle } from './SignUp'
import { debounce } from 'lodash'
import { useEffect, useState } from 'react'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

function Login(props) {
  let auth = useAuth()
  let navigate = useNavigate()
  let location = useLocation()
  let features = useFeatures()
  const [totpRequired, setTotpRequired] = useState(false)
  const errorModal = useErrorModal()

  let from = location.state?.from?.pathname || '/zones'

  useEffect(() => {
    if (auth.isAuthenticated()) {
      navigate(from, { replace: true })
    }
  }, [auth, from, navigate])

  const handleSubmit = () => {
    fetch('/api/v1/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: document.getElementById('email').value.trim(),
        password: document.getElementById('password').value.trim(),
      }),
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          auth.signin(data.token, () => {
            navigate(from, { replace: true })
          })
        })
      } else {
        errorModal.show('Invalid email or password')
      }
    })
  }

  const checkTotpRequired = debounce((e) => {
    if (!features || !features.totp) {
      return
    }
    fetch('/api/v1/users/totp?email=' + e.target.value).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          console.debug(data.totp)
          setTotpRequired(data.totp)
        })
      }
    })
  }, 200)

  function onKeyPress(e) {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <Flex>
      <LoginCard>
        <Subtitle>Log In</Subtitle>
        <StyledLabel htmlFor="email">Email</StyledLabel>
        <Input id="email" type="email" onChange={checkTotpRequired}></Input>
        <StyledLabel htmlFor="password">Password</StyledLabel>
        <Input id="password" type="password" onKeyUp={onKeyPress}></Input>
        {features && features.totp && (
          <>
            <StyledLabel htmlFor="totp">TOTP Code</StyledLabel>
            <Input
              id="totp"
              disabled={!totpRequired}
              placeholder={totpRequired ? '' : 'Not Required'}
            ></Input>
          </>
        )}
        <AlignRight>
          {/* <Button secondary>Cancel</Button> */}
          <Button
            style={{ width: '100%', marginTop: '16px' }}
            onClick={handleSubmit}
            primary
          >
            Log In {'\u2794'}
          </Button>
        </AlignRight>
        <center>
          {(!features || features.signup) && (
            <p>
              Don't have an account? <Link to="/signup">Sign up!</Link>
            </p>
          )}
        </center>
      </LoginCard>
    </Flex>
  )
}
export default Login
