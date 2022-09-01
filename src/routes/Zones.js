import { RequireAuth, useAuth } from '../hooks/useAuth'
import { useErrorModal } from '../hooks/useErrorModal'
import useFetch from '../hooks/useFetch'
import Button from '../uikit/Button'
import StyledInput from '../uikit/Input'
import { AlignRight } from './SignUp'
import { styled } from '@stitches/react'
import { useState } from 'react'
import Modal from 'react-modal'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Card = styled('div', {
  padding: '18px 36px',
  margin: '12px',
  borderRadius: '8px',
  fontSize: '1.2em',
  flexBasis: '100%',
  border: '1px solid #a4a4a8',
  backgroundColor: '#F4F4F5',
  transition: 'box-shadow 0.2s',
  '&:hover': {
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
  },
})

const StyledLink = styled(Link, {
  textDecoration: 'none',
  color: 'inherit',
  width: '50%',
})

const ZoneContainer = styled('div', {
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  maxWidth: '800px',
  flexWrap: 'wrap',
  margin: '0 auto',
})

export default function Zones() {
  const auth = useAuth()
  const errorModal = useErrorModal()
  const [showZoneCreateModal, setShowZoneCreateModal] = useState(false)

  let { data, loading, error } = useFetch('/api/v1/zones', {
    headers: {
      Authorization: auth.token,
    },
  })

  if (loading) {
    return (
      <RequireAuth>
        <div style={{ padding: '0px 32px' }}>
          <h1>Available Zones</h1>
          <h2>Loading zones...</h2>
        </div>
      </RequireAuth>
    )
  }
  if (error) {
    errorModal.show(error)
  }

  return (
    <RequireAuth>
      <div style={{ padding: '0px 32px' }}>
        <h1>Available Zones</h1>
        <ZoneContainer>
          {data.map((zone) => {
            return (
              <StyledLink to={'/zones/' + zone.id}>
                <Card>{zone.id}</Card>
              </StyledLink>
            )
          })}
          <div style={{ width: '100%' }}>
            <Card onClick={() => setShowZoneCreateModal(true)}>Add Zone</Card>
          </div>
        </ZoneContainer>
        <CreateZoneModal
          showZoneCreateModal={showZoneCreateModal}
          setShowZoneCreateModal={setShowZoneCreateModal}
        />
      </div>
    </RequireAuth>
  )
}

function CreateZoneModal({ showZoneCreateModal, setShowZoneCreateModal }) {
  const [zoneName, setZoneName] = useState('')
  const errorModal = useErrorModal()
  const auth = useAuth()
  const navigate = useNavigate()

  const addZone = () => {
    fetch(`/api/v1/zones/${zoneName}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    }).then((res) => {
      if (res.status === 200) {
        setShowZoneCreateModal(false)
        navigate(`/zones/${zoneName}`)
      } else {
        res
          .json()
          .then((data) => {
            errorModal.show(
              data.error + (data.message ? ` (${data.message})` : '')
            )
          })
          .catch((err) => {
            errorModal.show('Unknown error creating zone')
          })
      }
    })
  }

  const modalStyle = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      padding: '2em',
      transform: 'translate(-50%, -50%)',
    },
  }

  return (
    <Modal
      isOpen={showZoneCreateModal}
      onRequestClose={() => setShowZoneCreateModal(false)}
      style={modalStyle}
    >
      <h2 style={{ fontWeight: '500', marginTop: '0px' }}>Add Zone</h2>
      <StyledInput
        style={{ width: '24em' }}
        onChange={(e) => setZoneName(e.target.value)}
      ></StyledInput>
      <AlignRight>
        <Button
          style={{ marginTop: '1em' }}
          secondary
          onClick={() => setShowZoneCreateModal(false)}
        >
          Cancel
        </Button>
        <Button style={{ marginTop: '1em' }} primary onClick={() => addZone()}>
          Confirm
        </Button>
      </AlignRight>
    </Modal>
  )
}
