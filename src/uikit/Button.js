import { styled } from "@stitches/react";

export const Button = styled("button", {
  display: "block",
  padding: "0.5rem",
  fontSize: "1rem",
  margin: "0.2rem",
  border: "none",
  borderRadius: "4px",
  color: "#fafafa",
  transition: "background-color 0.2s ease-in-out",

  variants: {
    primary: {
      true: {
        backgroundColor: "#3b82f6",
        '&:hover': {
          backgroundColor: "#93c5fd",
        }
      }
    },
    secondary: {
      true: {
        backgroundColor: "#a1a1aa", 
        '&:hover': {
          backgroundColor: "#d4d4d8",
        }
      }
    }
  }
})

export default Button