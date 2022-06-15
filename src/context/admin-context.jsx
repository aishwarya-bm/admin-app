import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import { ROWS_PER_PAGE } from "../constants/pagination";
import { filterBySearch } from "../utils/admin-util";
import { adminReducer } from "./admin-reducer";

const AdminContext = createContext();

const AdminProvider = ({ children }) => {
  const [state, dispatch] = useReducer(adminReducer, {
    users: [],
    searchText: "",
    currentPage: 1,
    indexOfFirst: 1,
    indexOfLast: ROWS_PER_PAGE,
    searchedUsers: [],
  });
  const getAdminData = async () => {
    try {
      const { data } = await axios.get(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      dispatch({ type: "SET_INITIAL_USERS_DATA", payload: data });
    } catch (err) {
      console.log("Some error occured");
    }
  };
  state.searchedUsers = filterBySearch(state);
  useEffect(() => {
    getAdminData();
  }, []);

  return <AdminContext.Provider value={{ state, dispatch }}>{children}</AdminContext.Provider>;
};

const useAdmin = () => useContext(AdminContext);

export { AdminProvider, useAdmin };
