import React from 'react'
import { isExpired } from 'react-jwt'
import { Navigate, useLocation } from 'react-router-dom'

let ErrorModalContext = React.createContext()

export function ErrorModalProvider({ children }) {
  let [showModal, setShowModal] = React.useState(false)

  let show = (message) => {
    setShowModal(true);
  }
  let hide = () => {
    setShowModal(false);
  }

  let value = { show, hide };

  return <ErrorModalContext.Provider value={value}>{children} {showModal ? <ErrorModal /> : null }</ErrorModalContext.Provider>
}

export function useErrorModal() {
  return React.useContext(ErrorModalContext)
}

const modalStyle = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
}

function ErrorModal({ content }) {
  return (
    <Modal
      isOpen={showModal}
      onRequestClose={() => setShowModal(false)}
      style={modalStyle}
    >
      LIGMAAAAAAAA
    </Modal>
  )
}
