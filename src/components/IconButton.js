import { styled } from "@stitches/react";

function IconButton() {
  const UnstyledButton = styled("button", {
    "background-color": "initial",
    border: "none",
    "padding-top": "3px",
  });

  return <UnstyledButton></UnstyledButton>;
}
