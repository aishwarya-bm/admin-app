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
    default:
      return state;
  }
};
