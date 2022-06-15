import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAdmin } from "../context/admin-context";

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
          className="btn-icon"
          onClick={() => {
            dispatch({ type: "SET_EDITABLE", payload: id });
          }}>
          <FontAwesomeIcon icon={faPen} />
        </button>
        <button className="btn-icon" onClick={() => dispatch({ type: "DELETE_INLINE", payload: id })}>
          <FontAwesomeIcon icon={faTrash} onClick={() => dispatch({ type: "DELETE_INLINE", payload: id })} />
        </button>
      </td>
    </>
  );
}
