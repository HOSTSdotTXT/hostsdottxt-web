import { styled } from '@stitches/react'

export default function IconButton({ icon, action, children }) {
  const UnstyledButton = styled('button', {
    'background-color': 'initial',
    border: 'none',
    'padding-top': '3px',
  })

  return <UnstyledButton onClick={() => action()}>{children}</UnstyledButton>
}
