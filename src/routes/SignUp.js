import { styled } from "@stitches/react";
import Button from "../uikit/Button.js";
import Input from "../uikit/Input.js";
import { debounce } from "lodash";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth.js";
import { useNavigate } from "react-router-dom";
import { useFeatures } from "../hooks/useFeatures.js";

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
  borderRadius: "4px",
  padding: "1em",
  border: "1px solid #D4D4D8",
  backgroundColor: "#F4F4F5",
  width: "360px",
});

const Title = styled("h1", {
  textAlign: "center",
  fontSize: "3em",
  margin: "1rem 0",
  fontWeight: "300",
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

export function SignUp() {
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const auth = useAuth();
  const features = useFeatures();
  const navigate = useNavigate();

  const checkPasswordsMatch = debounce((e) => {
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("passwordConfirm").value;

    if (password === "" || passwordConfirm === "") {
      return;
    }
    if (password !== passwordConfirm) {
      console.debug("passwords don't match");
      setPasswordsMatch(false);
    } else {
      console.debug("passwords match");
      setPasswordsMatch(true);
    }
  }, 200);

  const checkEmailValid = debounce((e) => {
    const email = e.target.value;

    if (email === "") {
      return;
    }

    const re = /.{1,64}@.{1,64}\..{1,64}/i;
    if (!re.test(email)) {
      console.debug("email is invalid");
      setEmailValid(false);
    } else {
      console.debug("email is valid");
      setEmailValid(true);
    }
  }, 200);

  const handleSubmit = () => {
    fetch("/api/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: document.getElementById("email").value.trim(),
        password: document.getElementById("password").value.trim(),
        display_name:
          document.getElementById("displayName").value.trim() ?? null,
      }),
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          auth.signin(data.token, () => {
            navigate("/");
          });
        });
      } else {
        alert("Something went wrong!");
      }
    });
  };

  if (!features.signup) {
    return (
      <Flex>
        <Title>HOSTSdotTXT</Title>
        <LoginCard>
          <Subtitle>Sign Up</Subtitle>
          <center><p>Sorry, but sign-ups are currently disabled.</p></center>
        </LoginCard>
      </Flex>
    );
  }

  return (
    <Flex>
      <Title>HOSTSdotTXT</Title>
      <LoginCard>
        <Subtitle>Sign Up</Subtitle>
        <StyledLabel for="email">
          Email{" "}
          {!emailValid && (
            <span style={{ color: "red" }}>(!) email appears invalid</span>
          )}
        </StyledLabel>
        <Input id="email" onChange={checkEmailValid} type="email"></Input>
        <StyledLabel for="displayName">Display Name</StyledLabel>
        <Input id="displayName"></Input>
        <StyledLabel for="password">Password</StyledLabel>
        <Input
          id="password"
          onChange={checkPasswordsMatch}
          type="password"
        ></Input>
        <StyledLabel for="passwordConfirm">
          Password (Confirm){" "}
          {!passwordsMatch && (
            <span style={{ color: "red" }}>(!) passwords don't match</span>
          )}
        </StyledLabel>
        <Input
          id="passwordConfirm"
          onChange={checkPasswordsMatch}
          type="password"
        ></Input>
        <AlignRight>
          {/* <Button secondary>Cancel</Button> */}
          <Button onClick={handleSubmit} primary>
            Sign Up {"\u2794"}
          </Button>
        </AlignRight>
      </LoginCard>
    </Flex>
  );
}

export default SignUp;
