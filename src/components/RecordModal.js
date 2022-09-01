import { AlignRight } from '../routes/SignUp'
import Button from '../uikit/Button'
import Input, { StyledSelect } from '../uikit/Input'
import Modal from 'react-modal'

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

export default function RecordModal(props) {
  const { showModal, setShowModal, openRecord, setOpenRecord, saveRecord } =
    props
  return (
    <Modal
      isOpen={showModal}
      onRequestClose={() => setShowModal(false)}
      style={modalStyle}
    >
      <table className="modal-table">
        <thead>
          <tr>
            <th style={{ width: '6em' }}>Type</th>
            <th style={{ width: '18em' }}>Name</th>
            <th style={{ width: '24em' }}>Content</th>
            <th style={{ width: '9em' }}>TTL</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <StyledSelect
                onChange={(e) =>
                  setOpenRecord({
                    ...openRecord,
                    type: e.target.value,
                  })
                }
                defaultValue="A"
              >
                <option value="A">A</option>
                <option value="AAAA">AAAA</option>
                <option value="CNAME">CNAME</option>
                <option value="MX">MX</option>
                <option value="TXT">TXT</option>
              </StyledSelect>
            </td>
            <td>
              <Input
                rows={1}
                onChange={(e) =>
                  setOpenRecord({
                    ...openRecord,
                    name: e.target.value,
                  })
                }
                defaultValue={openRecord.name}
              ></Input>
            </td>
            <td>
              <Input
                rows={1}
                onChange={(e) =>
                  setOpenRecord({
                    ...openRecord,
                    content: e.target.value,
                  })
                }
                defaultValue={openRecord.content}
              ></Input>
            </td>
            <td>
              <StyledSelect
                onChange={(e) =>
                  setOpenRecord({
                    ...openRecord,
                    ttl: parseInt(e.target.value),
                  })
                }
                defaultValue={openRecord.ttl}
              >
                <option value="60">1 minute</option>
                <option value="300">5 minutes</option>
                <option value="600">10 minutes</option>
                <option value="1800">30 minutes</option>
                <option value="3600">1 hour</option>
                <option value="10800">3 hours</option>
                <option value="21600">6 hours</option>
                <option value="43200">12 hours</option>
                <option value="86400">1 day</option>
                <option value="172800">2 days</option>
                <option value="604800">1 week</option>
              </StyledSelect>
            </td>
          </tr>
        </tbody>
      </table>
      <AlignRight>
        <Button secondary onClick={() => setShowModal(false)}>
          Cancel
        </Button>
        <Button primary onClick={() => saveRecord()}>
          Save
        </Button>
      </AlignRight>
    </Modal>
  )
}
