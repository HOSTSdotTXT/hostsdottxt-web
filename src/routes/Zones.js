import { RequireAuth, useAuth } from '../hooks/useAuth'
import { useErrorModal } from '../hooks/useErrorModal'
import useFetch from '../hooks/useFetch'
import { styled } from '@stitches/react'
import { Link } from 'react-router-dom'

const Container = styled('main', {
  maxWidth: '800px',
  margin: 'auto',
  padding: '12px',
})

const Card = styled('div', {
  padding: '16px 48px',
  borderRadius: '8px',
  flexBasis: '100%',
  border: '1px solid #D4D4D8',
  backgroundColor: '#F4F4F5',
  transition: 'box-shadow 0.2s',
  '&:hover': {
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
  },
})

const LinkStyled = styled(Link, {
  textDecoration: 'none',
  color: 'inherit',
})

export default function Zones() {
  const auth = useAuth()
  const errorModal = useErrorModal()
  let { data, loading, error } = useFetch('/api/v1/zones', {
    headers: {
      Authorization: auth.token,
    },
  })

  if (loading) {
    return (
      <RequireAuth>
        <Container>
          <div style={{ padding: '0px 32px' }}>
            <h1>Available Zones</h1>
            <h2>Loading zones...</h2>
          </div>
        </Container>
      </RequireAuth>
    )
  }
  if (error) {
    errorModal.show(error)
  }

  return (
    <RequireAuth>
      <Container>
        <div style={{ padding: '0px 32px' }}>
          <h1>Available Zones</h1>
          <div style={{ display: 'flex' }}>
            {data.map((zone) => {
              return (
                <LinkStyled to={'/zones/' + zone.id}>
                  <Card>{zone.id}</Card>
                </LinkStyled>
              )
            })}
          </div>
        </div>
      </Container>
    </RequireAuth>
  )
}
