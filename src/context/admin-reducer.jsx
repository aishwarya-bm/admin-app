export const adminReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "SET_SEARCH":
      return {
        ...state,
        searchText: payload,
      };
    case "SET_INITIAL_USERS_DATA":
      return {
        ...state,
        users: payload.map(d => ({ ...d, edit: false, isSelected: false })),
      };

    case "SET_EDITABLE":
      return {
        ...state,
        users: state.users.map(u => (u.id === payload ? { ...u, edit: true } : u)),
      };

    case "EDIT_INLINE":
      return {
        ...state,
        users: state.users.map(d => (d.id === payload.id ? { ...payload, edit: false } : d)),
      };

    case "CANCEL_EDIT":
      return {
        ...state,
        users: state.users.map(u => (u.id === payload ? { ...u, edit: false } : u)),
      };

    case "DELETE_INLINE":
      return {
        ...state,
        users: state.users.filter(d => d.id !== payload),
      };

    case "SET_CURRENTPAGE":
      return {
        ...state,
        currentPage: payload.number,
        indexOfFirst: payload.firstIndex,
        indexOfLast: payload.lastIndex,
      };

    case "SELECT_ROW":
      return {
        ...state,
        users: state.users.map(u => (u.id === payload.id ? { ...u, isSelected: payload.checked } : u)),
        searchedUsers: state.searchedUsers.map(u => (u.id === payload.id ? { ...u, isSelected: payload.checked } : u)),
      };

    case "SELECT_BULK_SEARCHED":
      const start = state.indexOfFirst - 1,
        end = state.indexOfLast - 1;
      return {
        ...state,
        searchedUsers: state.searchedUsers.map((u, idx) =>
          idx >= start && idx <= end ? { ...u, isSelected: payload } : u
        ),
        users: state.users.map(u => (state.searchedUsers.find(s => s.id === u.id) ? { ...u, isSelected: payload } : u)),
      };

    case "SELECT_BULK_ALL":
      const start1 = state.indexOfFirst - 1,
        end1 = state.indexOfLast - 1;
      return {
        ...state,
        users: state.users.map((u, idx) => (idx >= start1 && idx <= end1 ? { ...u, isSelected: payload } : u)),
        searchedUsers: state.searchedUsers.map(u =>
          state.users.find(s => s.id === u.id) ? { ...u, isSelected: payload } : u
        ),
      };

    case "DELETE_BULK_ALL":
      const start2 = state.indexOfFirst - 1,
        end2 = state.indexOfLast - 1;
      return {
        ...state,
        users: state.users.filter((u, idx) => !(idx >= start2 && idx <= end2 && u.isSelected)),
      };

    case "DELETE_BULK_SEARCH":
      const start3 = state.indexOfFirst - 1,
        end3 = state.indexOfLast - 1;
      const searchResultsCopy = state.searchedUsers.slice(start3, end3 + 1);

      return {
        ...state,
        users: state.users.filter(user => (searchResultsCopy.find(s => s.id === user.id) ? false : true)),
        searchedUsers: state.searchedUsers.filter((u, idx) => !(idx >= start3 && idx <= end3 && u.isSelected)),
      };
    default:
      return state;
  }
};
