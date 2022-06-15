import { ROWS_PER_PAGE } from "../constants/pagination";

export const setIndexes = (state, dispatch) => {
  const indexOfFirst = state.searchedUsers.length ? 1 : 0;
  const indexOfLast =
    state.searchedUsers.length >= ROWS_PER_PAGE ? ROWS_PER_PAGE : state.searchedUsers.length % ROWS_PER_PAGE;
  dispatch({ type: "SET_CURRENTPAGE", payload: { number: 1, firstIndex: indexOfFirst, lastIndex: indexOfLast } });
};

export const getAllSelected = state => {
  const start = state.indexOfFirst - 1,
    end = state.indexOfLast;
  const selected = state.searchText ? state.searchedUsers.slice(start, end) : state.users.slice(start, end);
  return selected.every(user => user.isSelected);
};

export const getDeleteButtonStatus = state => {
  const start = state.indexOfFirst - 1,
    end = state.indexOfLast;
  const selected = state.searchText ? state.searchedUsers.slice(start, end) : state.users.slice(start, end);
  return !selected.some(user => user.isSelected);
};
