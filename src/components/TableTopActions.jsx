import { useEffect } from "react";
import { useAdmin } from "../context/admin";
import { setIndexes } from "../utils/test-util";

export function TableTopActions() {
  const { state, dispatch } = useAdmin();
  const { searchText } = state;
  useEffect(() => {
    if(searchText)
    setIndexes(state, dispatch);
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
      <button>Delete selected</button>
    </section>
  );
}
