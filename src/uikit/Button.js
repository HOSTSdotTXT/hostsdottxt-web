import { styled } from "@stitches/react";

export const Button = styled("button", {
  display: "block",
  // Making the button wider makes it look less cramped
  padding: "0.5rem 1rem",
  fontSize: "1rem",
  margin: "0.2rem",
  border: "none",
  borderRadius: "6px",
  color: "#fafafa",
  transition: "background-color 0.1s ease-out",

  variants: {
    primary: {
      true: {
        backgroundColor: "#3b82f6",
        "&:hover": {
          backgroundColor: "#93c5fd",
        },
      },
    },
    secondary: {
      true: {
        backgroundColor: "#a1a1aa",
        "&:hover": {
          backgroundColor: "#d4d4d8",
        },
      },
    },
  },
});

export default Button;
