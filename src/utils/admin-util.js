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

const setFirstPageIdx = (totalUsers, dispatch) => {
  let lastIndex = ROWS_PER_PAGE <= totalUsers ? ROWS_PER_PAGE : totalUsers;
  let firstIndex = 1;
  dispatch({ type: "SET_CURRENTPAGE", payload: { number: 1, firstIndex, lastIndex } });
};

const setPreviousPageIdx = (totalUsers, currentPage, indexOfFirst, dispatch) => {
  let lastIndex = (currentPage - 1) * ROWS_PER_PAGE <= totalUsers ? (currentPage - 1) * ROWS_PER_PAGE : totalUsers;
  let firstIndex = indexOfFirst - ROWS_PER_PAGE;
  dispatch({ type: "SET_CURRENTPAGE", payload: { number: currentPage - 1, firstIndex, lastIndex } });
};

const setNextPageIdx = (totalUsers, state, dispatch) => {
  let lastIndex = state.indexOfLast + ROWS_PER_PAGE <= totalUsers ? state.indexOfLast + ROWS_PER_PAGE : totalUsers;
  let firstIndex = state.indexOfFirst + ROWS_PER_PAGE;
  dispatch({ type: "SET_CURRENTPAGE", payload: { number: state.currentPage + 1, firstIndex, lastIndex } });
};

const setLastPageIdx = (totalPages, totalUsers, dispatch) => {
  let lastIndex = totalPages * ROWS_PER_PAGE <= totalUsers ? totalPages * ROWS_PER_PAGE : totalUsers;
  let firstIndex = (totalPages - 1) * ROWS_PER_PAGE + 1;
  dispatch({ type: "SET_CURRENTPAGE", payload: { number: totalPages, firstIndex, lastIndex } });
};

const setSelectedPageIndex = (number,totalUsers, dispatch) =>{
  let lastIndex = number * ROWS_PER_PAGE <= totalUsers ? number * ROWS_PER_PAGE : totalUsers;
  let firstIndex = (number - 1) * ROWS_PER_PAGE + 1;
  dispatch({ type: "SET_CURRENTPAGE", payload: { number, firstIndex, lastIndex } });
}

export {
  filterBySearch,
  getAllSelected,
  getDeleteButtonStatus,
  setIndexes,
  onSearchChange,
  onClearSearch,
  onDeleteBulk,
  setFirstPageIdx,
  setLastPageIdx,
  setNextPageIdx,
  setPreviousPageIdx,
  setSelectedPageIndex
};
