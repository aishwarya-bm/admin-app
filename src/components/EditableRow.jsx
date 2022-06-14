import React, { useState } from "react";

export function EditableRow({editData}) {
  const [editUser, setEditUser] = useState(editData);

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
          onClick={() => {
            // saveUser(editUser, editData.id, users, setUsers);
          }}>
          save
        </button>
        <button 
        // onClick={() => cancelEditUser(users, editUser.id, setUsers)}
        >cancel</button>
      </td>
    </>
  );
}
