import { styled } from "@stitches/react";

export const StyledInput = styled("input", {
  padding: "0.5em",
  border: "1px solid #D4D4D8",
  borderRadius: "6px",
  // Not my favourite way of doing this, but padding doesn't add to width
  width: "calc(100% - 1em)",
  fontSize: "1rem",
  marginBottom: "0.5em",
});

export const StyledSelect = styled("select", {
  padding: "0.5em",
  border: "1px solid #D4D4D8",
  backgroundColor: "#fafafa",
  borderRadius: "6px",
  // Not my favourite way of doing this, but padding doesn't add to width
  width: "calc(100% - 1em)",
  fontSize: "1rem",
  marginBottom: "0.5em",
});

export default StyledInput;
