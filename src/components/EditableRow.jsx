import React, { useState } from "react";
import { useAdmin } from "../context/admin-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";


export function EditableRow({ editData }) {
  const [editUser, setEditUser] = useState(editData);
  const { dispatch } = useAdmin();

  const handleChange = e => {
    setEditUser({ ...editUser, [e.target.name]: e.target.value });
  };
  return (
    <>
      <td>
        <input type="text" value={editUser.name} name="name" onChange={e => handleChange(e)} />
      </td>
      <td>
        <input type="text" value={editUser.email} name="email" onChange={e => handleChange(e)} />
      </td>
      <td>
        <input type="text" value={editUser.role} name="role" onChange={e => handleChange(e)} />
      </td>
      <td className="table-inline-actions">
        <button
          className="btn-icon"
          onClick={() => {
            dispatch({ type: "EDIT_INLINE", payload: { ...editData, ...editUser } });
          }}>
          <FontAwesomeIcon icon={faCheck} />
        </button>
        <button className="btn-icon" onClick={() => dispatch({ type: "CANCEL_EDIT", payload: editData.id })}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </td>
    </>
  );
}
