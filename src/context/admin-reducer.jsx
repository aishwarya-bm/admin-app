export const adminReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "SET_SEARCH":
      return {
        ...state,
        searchText: payload,
        searchedUsers: state.users.filter(
          user =>
            user.name.toLowerCase().includes(payload.toLowerCase()) ||
            user.email.toLowerCase().includes(payload.toLowerCase()) ||
            user.role.toLowerCase().includes(payload.toLowerCase())
        ),
      };
    case "SET_INITIAL_USERS_DATA":
      return {
        ...state,
        users: payload.map(d => ({ ...d, edit: false, isSelected: false })),
        searchedUsers: state.users,
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
      return {
        ...state,
        users: state.users.map((u, idx) =>
          idx >= state.indexOfFirst - 1 && idx < state.indexOfLast ? { ...u, isSelected: payload } : u
        ),
        searchedUsers: state.searchedUsers.map(u =>
          state.users.find(s => s.id === u.id) ? { ...u, isSelected: payload } : u
        ),
      };

    case "DELETE_BULK_ALL":
      const selectedUsersCopy = state.users.slice(state.indexOfFirst - 1, state.indexOfLast);
      return {
        ...state,
        users: state.users.filter(
          (u, idx) => !(idx >= state.indexOfFirst - 1 && idx < state.indexOfLast && u.isSelected)
        ),
        searchedUsers: state.searchedUsers.filter(user =>
          selectedUsersCopy.find(s => s.id === user.id && s.isSelected) ? false : true
        ),
      };

    case "DELETE_BULK_SEARCH":
      const searchResultsCopy = state.searchedUsers.slice(state.indexOfFirst - 1, state.indexOfLast);
      return {
        ...state,
        users: state.users.filter(user =>
          searchResultsCopy.find(s => s.id === user.id && s.isSelected) ? false : true
        ),
        searchedUsers: state.searchedUsers.filter(
          (u, idx) => !(idx >= state.indexOfFirst - 1 && idx < state.indexOfLast && u.isSelected)
        ),
      };
    default:
      return state;
  }
};
