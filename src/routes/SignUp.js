import { useAuth } from '../hooks/useAuth.js'
import { useErrorModal } from '../hooks/useErrorModal.js'
import { useFeatures } from '../hooks/useFeatures.js'
import Button from '../uikit/Button.js'
import Input from '../uikit/Input.js'
import { styled } from '@stitches/react'
import { debounce } from 'lodash'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

export const Flex = styled('div', {
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center',
})

export const LoginCard = styled('div', {
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  borderRadius: '12px',
  padding: '1em',
  marginTop: '10vh',
  border: '1px solid #D4D4D8',
  backgroundColor: '#F4F4F5',
  width: '360px',
  textAlign: 'left',
})

export const Title = styled('h1', {
  textAlign: 'center',
  fontSize: '3em',
  margin: '1rem 0',
  fontWeight: '300',
})

export const Subtitle = styled('h1', {
  textAlign: 'center',
  fontSize: '2.5em',
  margin: '1rem 0',
  fontWeight: 300,
})

export const StyledLabel = styled('label', {
  display: 'block',
  paddingBottom: '0.25em',
  fontSize: '0.9em',
})

export const AlignRight = styled('div', {
  display: 'flex',
  alignItems: 'right',
  justifyContent: 'right',
})

export function SignUp() {
  const [passwordsMatch, setPasswordsMatch] = useState(true)
  const [emailValid, setEmailValid] = useState(true)
  const auth = useAuth()
  const features = useFeatures()
  const navigate = useNavigate()
  const errorModal = useErrorModal()
  let location = useLocation()

  let from = location.state?.from?.pathname || '/zones'

  useEffect(() => {
    if (auth.isAuthenticated()) {
      navigate(from, { replace: true })
    }
  }, [auth, from, navigate])

  const checkPasswordsMatch = debounce((e) => {
    const password = document.getElementById('password').value
    const passwordConfirm = document.getElementById('passwordConfirm').value

    if (password === '' || passwordConfirm === '') {
      return
    }
    if (password !== passwordConfirm) {
      console.debug("passwords don't match")
      setPasswordsMatch(false)
    } else {
      console.debug('passwords match')
      setPasswordsMatch(true)
    }
  }, 200)

  const checkEmailValid = debounce((e) => {
    const email = e.target.value

    if (email === '') {
      return
    }

    const re = /.{1,64}@.{1,64}\..{1,64}/i
    if (!re.test(email)) {
      console.debug('email is invalid')
      setEmailValid(false)
    } else {
      console.debug('email is valid')
      setEmailValid(true)
    }
  }, 200)

  const handleSubmit = () => {
    fetch('/api/v1/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: document.getElementById('email').value.trim(),
        password: document.getElementById('password').value.trim(),
      })
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          auth.signin(data.token, () => {
            navigate('/')
          })
        })
      } else {
        res
          .json()
          .then((data) => {
            errorModal.show(data.error)
          })
          .catch((err) => {
            errorModal.show('Something went wrong :(')
          })
      }
    })
  }

  if (!features || !features.signup) {
    return (
      <Flex>
        <LoginCard>
          <Subtitle>Sign Up</Subtitle>
          <center>
            <p>Sorry, but sign-ups are currently disabled.</p>
            <p>
              If you have an account, you can <Link to="/login">sign in.</Link>
            </p>
          </center>
        </LoginCard>
      </Flex>
    )
  }

  return (
    <Flex>
      <LoginCard>
        <Subtitle>Sign Up</Subtitle>
        <StyledLabel for="email">
          Email{' '}
          {!emailValid && (
            <span style={{ color: 'red' }}>(!) email appears invalid</span>
          )}
        </StyledLabel>
        <Input id="email" onChange={checkEmailValid} type="email"></Input>
        <StyledLabel for="password">Password</StyledLabel>
        <Input
          id="password"
          onChange={checkPasswordsMatch}
          type="password"
        ></Input>
        <StyledLabel for="passwordConfirm">
          Password (Confirm){' '}
          {!passwordsMatch && (
            <span style={{ color: 'red' }}>(!) passwords don't match</span>
          )}
        </StyledLabel>
        <Input
          id="passwordConfirm"
          onChange={checkPasswordsMatch}
          type="password"
        ></Input>
        <AlignRight>
          <Button
            style={{ width: '100%', marginTop: '16px' }}
            onClick={handleSubmit}
            primary
          >
            Sign Up {'\u2794'}
          </Button>
        </AlignRight>
        <center>
          <p>
            If you have an account, you can <Link to="/login">sign in.</Link>
          </p>
        </center>
      </LoginCard>
    </Flex>
  )
}

export default SignUp;
