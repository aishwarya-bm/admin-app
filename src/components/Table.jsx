import { useAdmin } from "../context/admin-context";
import { filterBySearch, getAllSelected } from "../utils/admin-util";
import { EditableRow } from "./EditableRow";
import { ReadOnlyRow } from "./ReadOnlyRow";
export function Table() {
  const { state, dispatch } = useAdmin();

  let users = filterBySearch(state).slice(state.indexOfFirst - 1, state.indexOfLast);
  return (
    <section className="table-container">
      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={getAllSelected(state)}
                onChange={e => {
                  if (state.searchText) dispatch({ type: "SELECT_BULK_SEARCHED", payload: e.target.checked });
                  else dispatch({ type: "SELECT_BULK_ALL", payload: e.target.checked });
                }}
              />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users?.map((user, idx) => {
              return (
                <tr key={idx} className={user.isSelected && "row-selected"}>
                  <td>
                    <input
                      type="checkbox"
                      checked={user.isSelected}
                      onChange={e => {
                        dispatch({ type: "SELECT_ROW", payload: { checked: e.target.checked, id: user.id } });
                      }}
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
