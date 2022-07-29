import {useEffect, useState} from "react";
import React from "react";
import {
  useNavigate,
  useLocation,
} from "react-router-dom";
import Button from "../uikit/Button.js";
import Input from "../uikit/Input.js";
import {useAuth} from "../hooks/useAuth";
import {useFeatures} from "../hooks/useFeatures";
import {isExpired} from "react-jwt";
import {styled} from "@stitches/react";
import {debounce} from "lodash";

const Flex = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  // If ever we decide to move the title out of the login card itself
  flexDirection: "column",
});

const LoginCard = styled("div", {
  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  borderRadius: "12px",
  padding: "1em",
  border: "1px solid #D4D4D8",
  backgroundColor: "#F4F4F5",
  width: "360px",
});

const Title = styled("h1", {
  textAlign: "center",
  fontSize: "3em",
  fontWeight: "300",
  margin: "1rem 0",
});

const Subtitle = styled("h1", {
  textAlign: "center",
  fontSize: "2.5em",
  margin: "1rem 0",
  fontWeight: 300,
});

const StyledLabel = styled("label", {
  display: "block",
  paddingBottom: "0.25em",
  fontSize: "0.9em",
});

const AlignRight = styled("div", {
  display: "flex",
  alignItems: "right",
  justifyContent: "right",
});

function Login(props) {
  let auth = useAuth();
  let navigate = useNavigate();
  let location = useLocation();
  let features = useFeatures();
  const [totpRequired, setTotpRequired] = useState(false);

  let from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (auth.token && !isExpired(auth.token)) {
      navigate(from, {replace: true});
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
            navigate(from, {replace: true});
          });
        });
      } else {
        alert("Invalid email or password");
      }
    });
  };

  const checkTotpRequired = debounce((e) => {
    if (!features.totp) {
      return;
    }
    fetch("/api/v1/users/totp?email=" + e.target.value).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          console.debug(data.totp);
          setTotpRequired(data.totp);
        });
      }
    });
  }, 200);

  function onKeyPress(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  }

  return (
    <Flex>
      <Title>HOSTSdotTXT</Title>
      <LoginCard>
        <Subtitle>Log In</Subtitle>
        <StyledLabel htmlFor="email">Email</StyledLabel>
        <Input id="email" type="email" onChange={checkTotpRequired}></Input>
        <StyledLabel htmlFor="password">Password</StyledLabel>
        <Input id="password" type="password" onKeyUp={onKeyPress}></Input>
        {features.totp && (
          <>
            <StyledLabel htmlFor="totp">TOTP Code</StyledLabel>
            <Input
              id="totp"
              disabled={!totpRequired}
              placeholder={totpRequired ? "" : "Not Required"}
            ></Input>
          </>
        )}
        <AlignRight>
          {/* <Button secondary>Cancel</Button> */}
          <Button onClick={handleSubmit} primary>
            Log In {"\u2794"}
          </Button>
        </AlignRight>
      </LoginCard>
    </Flex>
  );
}
export default Login;
