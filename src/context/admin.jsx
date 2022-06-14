import axios from "axios";
import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { adminReducer } from "./admin-reducer";

const AdminContext = createContext();

const AdminProvider = ({ children }) => {
  const [state, dispatch] = useReducer(adminReducer, {
    users: [],
    searchText: "",
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

  useEffect(() => {
    getAdminData();
  }, []);

  const filterBySearch = searchText =>
    [...state.users].filter(
      user =>
        user.name.toLowerCase().includes(searchText.toLowerCase()) ||
        user.email.toLowerCase().includes(searchText.toLowerCase()) ||
        user.role.toLowerCase().includes(searchText.toLowerCase())
    );

  const filteredUsers = filterBySearch(state.searchText);
  return <AdminContext.Provider value={{ state, dispatch, filteredUsers }}>{children}</AdminContext.Provider>;
};

const useAdmin = () => useContext(AdminContext);

export { AdminProvider, useAdmin };
