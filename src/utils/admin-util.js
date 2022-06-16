import { ROWS_PER_PAGE } from "../constants/pagination";

const setIndexes = (state, dispatch) => {
  const indexOfFirst = state.searchedUsers.length ? 1 : 0;
  const indexOfLast =
    state.searchedUsers.length >= ROWS_PER_PAGE ? ROWS_PER_PAGE : state.searchedUsers.length % ROWS_PER_PAGE;
  dispatch({ type: "SET_CURRENTPAGE", payload: { number: 1, firstIndex: indexOfFirst, lastIndex: indexOfLast } });
};

const getAllSelected = state => {
  const start = state.indexOfFirst - 1,
    end = state.indexOfLast;
  const selected = state.searchText ? state.searchedUsers.slice(start, end) : state.users.slice(start, end);
  return selected.every(user => user.isSelected);
};

const getDeleteButtonStatus = state => {
  const start = state.indexOfFirst - 1,
    end = state.indexOfLast;
  const selected = state.searchText ? state.searchedUsers.slice(start, end) : state.users.slice(start, end);
  return !selected.some(user => user.isSelected);
};

const filterBySearch = state => {
  return state.searchText === ""
    ? state.users
    : state.users.filter(
        user =>
          user.name.toLowerCase().includes(state.searchText.toLowerCase()) ||
          user.email.toLowerCase().includes(state.searchText.toLowerCase()) ||
          user.role.toLowerCase().includes(state.searchText.toLowerCase())
      );
};

 const onSearchChange = (e, state, dispatch) => {
   dispatch({ type: "SET_SEARCH", payload: e.target.value });
   const lastIndex = state.users.length >= ROWS_PER_PAGE ? ROWS_PER_PAGE : state.users.length % ROWS_PER_PAGE;
   dispatch({ type: "SET_CURRENTPAGE", payload: { number: 1, firstIndex: 1, lastIndex } });
 };

 const onClearSearch = (state, dispatch) => {
   dispatch({ type: "SET_SEARCH", payload: "" });
   const lastIndex = state.users.length >= ROWS_PER_PAGE ? ROWS_PER_PAGE : state.users.length % ROWS_PER_PAGE;
   dispatch({ type: "SET_CURRENTPAGE", payload: { number: 1, firstIndex: 1, lastIndex } });
 };

 const onDeleteBulk = (state, dispatch) => {
   if (state.searchText) dispatch({ type: "DELETE_BULK_SEARCH" });
   else dispatch({ type: "DELETE_BULK_ALL" });
 };

export { filterBySearch, getAllSelected, getDeleteButtonStatus, setIndexes,onSearchChange,onClearSearch,onDeleteBulk };
