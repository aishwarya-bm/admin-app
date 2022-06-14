export function ReadOnlyRow({ currentUser }) {
  const { id, name, email, role } = currentUser;
  return (
    <>
      <td>{name}</td>
      <td>{email}</td>
      <td>{role}</td>
      <td className="table-inline-actions">
        <button
          onClick={() => {
            // editUser(users, id, setUsers);
          }}>
          edit
        </button>
        <button
        //  onClick={() => deleteUser(users, id, setUsers)}
        >
          delete
        </button>
      </td>
    </>
  );
}
