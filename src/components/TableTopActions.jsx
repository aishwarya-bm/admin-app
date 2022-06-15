import { useEffect } from "react";
import { useAdmin } from "../context/admin-context";
import { getDeleteButtonStatus, setIndexes } from "../utils/admin-util";

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
        onChange={e => {
          dispatch({ type: "SET_SEARCH", payload: e.target.value });
        }}
        placeholder="Search by name, email or role..."
      />
      <button
        disabled={getDeleteButtonStatus(state)}
        onClick={() => {
          if (searchText) dispatch({ type: "DELETE_BULK_SEARCH" });
          else dispatch({ type: "DELETE_BULK_ALL" });
        }}>
        Delete selected
      </button>
    </section>
  );
}
