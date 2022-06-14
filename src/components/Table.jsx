import { useAdmin } from "../context/admin";
import { EditableRow } from "./EditableRow";
import { ReadOnlyRow } from "./ReadOnlyRow";
export function Table() {
  const { filteredUsers } = useAdmin();

  return (
    <section className="table-container">
      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                defaultValue={false}
                //   checked={}
                onChange={e => {}}
              />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers &&
            filteredUsers?.map((user, idx) => {
              return (
                <tr key={idx}>
                  <td>
                    <input
                      type="checkbox"
                      defaultValue={user.isSelected}
                      //   checked={user.isSelected}
                      onChange={() => {}}
                    />
                  </td>
                  {user.edit ? <EditableRow editData={user} /> : <ReadOnlyRow currentUser={user} />}
                </tr>
              );
            })}
          <tr></tr>
        </tbody>
      </table>
    </section>
  );
}
