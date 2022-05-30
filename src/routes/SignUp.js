import {styled} from "@stitches/react";
import Button from "../uikit/Button.js";
import Input from "../uikit/Input.js"

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
  fontWeight: 400
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

export function SignUp() {
  return (
    <Flex>
      <LoginCard>
        <Title>FDNS</Title>
        <StyledLabel for="email">Email</StyledLabel>
        <Input id="email" type="email"></Input>
        <StyledLabel for="displayName">Display Name</StyledLabel>
        <Input id="displayName"></Input>
        <StyledLabel for="password">Password</StyledLabel>
        <Input id="password" type="password"></Input>
        <StyledLabel for="passwordConfirm">Password (Confirm)</StyledLabel>
        <Input id="passwordConfirm" type="password"></Input>
        <AlignRight>
        <Button style={{borderRadius: "0", backgroundColor: "inherit", padding: "0.5rem", border: "inherit", cursor: "pointer", fontSize: "0.9rem", fontWeight: 500}}>Sign Up -&gt;</Button>
        </AlignRight>
      </LoginCard>
    </Flex>
  );
}

export default SignUp;
