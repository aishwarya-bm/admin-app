import { ROWS_PER_PAGE } from "../constants/pagination";

export const setIndexes = (state,dispatch) => {
 const indexOfFirst = state.searchedUsers.length ? 1 : 0;
 const indexOfLast =
    state.searchedUsers.length >= ROWS_PER_PAGE ? ROWS_PER_PAGE : state.searchedUsers.length % ROWS_PER_PAGE;

    dispatch({ type: "SET_CURRENTPAGE", payload: { number: 1, firstIndex: indexOfFirst , lastIndex:indexOfLast} });
};
