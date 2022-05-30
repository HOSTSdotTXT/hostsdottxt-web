import { useEffect, useState } from "react";
import React from "react";
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
  Navigate,
  Outlet,
} from "react-router-dom";
import Button from "../uikit/Button.js";
import Input from "../uikit/Input.js"
import { useAuth } from "../hooks/useAuth";
import { isExpired } from "react-jwt";
import { styled } from "@stitches/react";

const Flex = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
});

const LoginCard = styled("div", {
  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  borderRadius: "4px",
  padding: "1em",
  border: "1px solid #D4D4D8",
  backgroundColor: "#F4F4F5",
});

const Title = styled("h1", {
  textAlign: "center",
  fontSize: "6em",
  margin: "1rem 0",
  fontWeight: 300,
});

const Subtitle = styled("h1", {
  textAlign: "center",
  fontSize: "2.5em",
  margin: "1rem 0",
  fontWeight: 300
});

const StyledLabel = styled("label", {
  display: "block",
  paddingBottom: "0.25em",
  fontSize: "0.9em",
});


const AlignRight = styled("div", {
  "display": "flex",
  "alignItems": "right",
  "justifyContent": "right"
})

function Login(props) {
  let auth = useAuth();
  let navigate = useNavigate();
  let location = useLocation();

  let from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (auth.token && !isExpired(auth.token)) {
      navigate(from, { replace: true });
    }
  }, [auth.token, from, navigate]);

  const handleSubmit = () => {
    fetch("/api/v1/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: document.getElementById("email").value.trim(),
        password: document.getElementById("password").value.trim(),
      }),
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          auth.signin(data.token, () => {
            navigate(from, { replace: true });
          });
        });
      } else {
        alert("Invalid email or password");
      }
    });
  };

  
  function onKeyPress(e) {
    if (e.key == "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  }

  return (
    <Flex>
      <LoginCard>
        <Title>FDNS</Title>
        <Subtitle>Log In</Subtitle>
        <StyledLabel for="email">Email</StyledLabel>
        <Input id="email" type="email"></Input>
        <StyledLabel for="password">Password</StyledLabel>
        <Input id="password" type="password" onKeyUp={onKeyPress}></Input>
        <AlignRight>
          { /* <Button secondary>Cancel</Button> */}
          <Button onClick={handleSubmit} primary>Log In {'\u2794'}</Button>
        </AlignRight>
      </LoginCard>
    </Flex>
  );
}
export default Login;
