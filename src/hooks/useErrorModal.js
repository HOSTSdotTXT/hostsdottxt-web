import React from 'react'
import { isExpired } from 'react-jwt'
import Modal from 'react-modal'
import { Navigate, useLocation } from 'react-router-dom'

let ErrorModalContext = React.createContext()

export function ErrorModalProvider({ children }) {
  let [showModal, setShowModal] = React.useState(false)
  let [modalContent, setModalContent] = React.useState({})

  let show = (message) => {
    setModalContent(message)
    setShowModal(true)
  }
  let hide = () => {
    setShowModal(false)
  }

  let value = { show, hide }

  return (
    <ErrorModalContext.Provider value={value}>
      {showModal ? (
        <ErrorModal
          content={modalContent}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      ) : null}
      <>{children}</>
    </ErrorModalContext.Provider>
  )
}

export function useErrorModal() {
  return React.useContext(ErrorModalContext)
}

const modalStyle = {
  zIndex: '9999',
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
}

function ErrorModal({ content, showModal, setShowModal }) {
  return (
    <Modal
      isOpen={showModal}
      onRequestClose={() => setShowModal(false)}
      style={modalStyle}
    >
      {content}
    </Modal>
  )
}
