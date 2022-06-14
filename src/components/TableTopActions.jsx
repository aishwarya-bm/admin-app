import { useAdmin } from "../context/admin";

export function TableTopActions() {
  const { state, dispatch } = useAdmin();
  return (
    <section className="actions-top">
      <input
        type="text"
        value={state.searchText}
        onChange={e =>
             dispatch({ type: "SET_SEARCH", payload: e.target.value })}
        placeholder="Search by name, email or role..."
      />
      <button onClick={() => dispatch({ type: "SET_SEARCH", payload: "" })}>clear search</button>
      <button>Delete selected</button>
    </section>
  );
}
