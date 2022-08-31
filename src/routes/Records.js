// Meow meow meow meow
import { styled } from "@stitches/react";
import { RequireAuth, useAuth } from "../hooks/useAuth";
import React, { useEffect } from "react";
import "./Records.css";
import RecordTable from "../components/RecordTable";
import Modal from "react-modal";
import useFetch from "../hooks/useFetch";
import { useParams } from "react-router-dom";
import Button from "../uikit/Button";
import Input from "../uikit/Input"

const modalStyle = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export function Records() {
  const { zoneName } = useParams();
  const [zone, setZone] = React.useState();
  const [showModal, setShowModal] = React.useState(false);
  const [openRecord, setOpenRecord] = React.useState({});
  const [updateSignal, setUpdateSignal] = React.useState(0);

  const auth = useAuth();

  function setAndOpenRecord(record) {
    setOpenRecord(record);
    setShowModal(true);
  }

  function saveRecord() {
    let updatedName = openRecord.name;
    if (!updatedName.endsWith(".")) {
      updatedName += ".";
    }
    const record = { ...openRecord, name: updatedName };
    console.log(record);
    if (record.name !== openRecord.name && openRecord.name !== "") {
      fetch(`/api/v1/zones/${zoneName}/${record.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${auth.token}`,
          "Content-Type": "application/json",
        },
      }).then((res) => {
        if (res.status === 200) {
        } else {
          alert("Error updating record");
        }
      });
    }
    fetch(`/api/v1/zones/${zoneName}/${record.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${auth.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(record),
    }).then((res) => {
      if (res.status === 200) {
        setShowModal(false);
        setUpdateSignal(updateSignal + 1);
      } else {
        alert("Error updating record");
      }
    });
  }

  function deleteRecord(id) {
    fetch(`/api/v1/zones/${zoneName}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${auth.token}`,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status === 200) {
        setUpdateSignal(updateSignal + 1);
      } else {
        alert("Error deleting record");
      }
    });
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
          setZone(data);
        });
      } else {
        alert("Error loading zones");
      }
    });
  }, [zoneName, auth.token, updateSignal]);
  console.log(zone);

  return (
    <RequireAuth>
      <main class="records-table-container">
        <h1>DNS Records for {zoneName}</h1>
        {zone && (
          <RecordTable
            records={zone}
            setAndOpenRecord={setAndOpenRecord}
            deleteRecord={deleteRecord}
          ></RecordTable>
        )}
        <Modal
          isOpen={showModal}
          onRequestClose={() => setShowModal(false)}
          style={modalStyle}
        >
          <table className="modal-table">
            <thead>
              <tr>
                <th style={{ width: "24em" }}>Name</th>
                <th style={{ width: "8em" }}>Content</th>
                <th style={{ width: "6em" }}>TTL</th>
              </tr>
            </thead>
            <tbody>
              <tr>
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
                  <Input
                    rows={1}
                    onChange={(e) =>
                      setOpenRecord({
                        ...openRecord,
                        ttl: parseInt(e.target.value),
                      })
                    }
                    type="number"
                    defaultValue={openRecord.ttl}
                  ></Input>
                </td>
              </tr>
            </tbody>
          </table>
          <div style={{ display: "flex" }}>
            <Button secondary onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button primary onClick={() => saveRecord()}>
              Save
            </Button>
          </div>
        </Modal>
      </main>
    </RequireAuth>
  );
}

export default Records;
