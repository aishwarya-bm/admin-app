import { useAdmin } from "../context/admin";

export function ReadOnlyRow({ currentUser }) {
  const { id, name, email, role } = currentUser;
  const { dispatch } = useAdmin();
  return (
    <>
      <td>{name}</td>
      <td>{email}</td>
      <td>{role}</td>
      <td className="table-inline-actions">
        <button
          onClick={() => {
            dispatch({ type: "SET_EDITABLE", payload: id });
          }}>
          edit
        </button>
        <button onClick={() => dispatch({ type: "DELETE_INLINE", payload: id })}>delete</button>
      </td>
    </>
  );
}
