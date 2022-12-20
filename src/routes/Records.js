// Meow meow meow meow
import RecordModal from '../components/RecordModal'
import RecordTable from '../components/RecordTable'
import { RequireAuth, useAuth } from '../hooks/useAuth'
import { useErrorModal } from '../hooks/useErrorModal'
import './Records.css'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

export function Records() {
  const { zoneName } = useParams()
  const [zone, setZone] = React.useState()
  const [showModal, setShowModal] = React.useState(false)
  const [openRecord, setOpenRecord] = React.useState({})
  const [originalRecord, setOriginalRecord] = React.useState({})
  const [updateSignal, setUpdateSignal] = React.useState(0)

  const auth = useAuth()
  const errorModal = useErrorModal()

  function setAndOpenRecord(record) {
    setOpenRecord(record)
    setOriginalRecord(record)
    setShowModal(true)
  }

  function saveRecord() {
    let updatedName = openRecord.name
    if (!updatedName.endsWith('.')) {
      updatedName += '.'
    }
    if (!updatedName.endsWith(zoneName)) {
      updatedName += zoneName
    }
    const record = { ...openRecord, name: updatedName }
    if (record.name !== originalRecord.name && originalRecord.name !== '') {
      fetch(`/api/v1/zones/${zoneName}/${record.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${auth.token}`,
          'Content-Type': 'application/json',
        },
      }).then((res) => {
        if (res.status === 200) {
        } else {
          res
            .json()
            .then((data) => {
              errorModal.show(data.error)
            })
            .catch((err) => {
              errorModal.show('Unknown error updating record')
            })
        }
      })
    }
    if (record.id != null) {
      fetch(`/api/v1/zones/${zoneName}/${record.id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${auth.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(record),
      }).then((res) => {
        if (res.status === 200) {
          setShowModal(false)
          setUpdateSignal(updateSignal + 1)
          setOpenRecord({})
          setOriginalRecord({})
        } else {
          res
            .json()
            .then((data) => {
              errorModal.show(data.error)
            })
            .catch((err) => {
              errorModal.show('Unknown error updating record')
            })
        }
      })
    } else {
      fetch(`/api/v1/zones/${zoneName}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${auth.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(record),
      }).then((res) => {
        if (res.status === 200) {
          setShowModal(false)
          setUpdateSignal(updateSignal + 1)
          setOpenRecord({})
          setOriginalRecord({})
        } else {
          res
            .json()
            .then((data) => {
              errorModal.show(data.error)
            })
            .catch((err) => {
              errorModal.show('Unknown error creating record')
            })
        }
      })
    }
  }

  function deleteRecord(id) {
    fetch(`/api/v1/zones/${zoneName}/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${auth.token}`,
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      if (res.status === 200) {
        setUpdateSignal(updateSignal + 1)
      } else {
        res
          .json()
          .then((data) => {
            errorModal.show(data.error)
          })
          .catch((err) => {
            errorModal.show('Unknown error deleting record')
          })
      }
    })
  }

  // Load zone data on page load
  useEffect(() => {
    fetch(`/api/v1/zones/${zoneName}`, {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          setZone(data)
        })
      } else {
        res
          .json()
          .then((data) => {
            errorModal.show(data.error)
          })
          .catch((err) => {
            errorModal.show('Unknown error loading zone')
          })
      }
    })
  }, [zoneName, auth.token, updateSignal])

  return (
    <RequireAuth>
      <main className="records-table-container">
        <h1>
          DNS Records for <b>{zoneName}</b>
        </h1>
        {zone && (
          <RecordTable
            zoneName={zoneName}
            records={zone}
            setAndOpenRecord={setAndOpenRecord}
            deleteRecord={deleteRecord}
          ></RecordTable>
        )}
        <RecordModal
          showModal={showModal}
          setShowModal={setShowModal}
          openRecord={openRecord}
          setOpenRecord={setOpenRecord}
          saveRecord={saveRecord}
        />
      </main>
    </RequireAuth>
  )
}

export default Records
