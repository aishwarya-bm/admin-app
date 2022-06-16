import { useEffect } from "react";
import { useAdmin } from "../context/admin-context";
import { getDeleteButtonStatus, onClearSearch, onDeleteBulk, onSearchChange, setIndexes } from "../utils/admin-util";

export function TableTopActions() {
  const { state, dispatch } = useAdmin();
  const { searchText } = state;
  useEffect(() => {
    if (searchText) setIndexes(state, dispatch);
  }, [searchText]);

  return (
    <section className="actions-top">
      <input
        type="text"
        value={state.searchText}
        onChange={e => onSearchChange(e, state, dispatch)}
        placeholder="Search by name, email or role..."
      />
      <button
        onClick={() => {
          if (searchText) onClearSearch(state, dispatch);
        }}>
        clear
      </button>
      <button
        className="btn-delete"
        disabled={getDeleteButtonStatus(state)}
        onClick={() => onDeleteBulk(state, dispatch)}>
        Delete selected
      </button>
    </section>
  );
}
