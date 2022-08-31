// Meow meow meow meow
import { RequireAuth, useAuth } from "../hooks/useAuth";
import React, { useEffect } from "react";
import "./Records.css";
import RecordTable from "../components/RecordTable";
import RecordModal from "../components/RecordModal";
import { useParams } from "react-router-dom";

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
        <RecordModal
          showModal={showModal}
          setShowModal={setShowModal}
          openRecord={openRecord}
          setOpenRecord={setOpenRecord}
          saveRecord={saveRecord}
        />
      </main>
    </RequireAuth>
  );
}

export default Records;
