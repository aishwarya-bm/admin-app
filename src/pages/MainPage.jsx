import { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "../components/Table";
import { TableTopActions } from "../components/TableTopActions";
import { Pagination } from "../components/Pagination";
import { ROWS_PER_PAGE } from "../constants/pagination";

export function MainPage() {
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = ROWS_PER_PAGE;

  const getAdminData = async () => {
    try {
      const { data } = await axios.get(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      setUsers(data.map(d => ({ ...d, edit: false, isSelected: false })));
    } catch (err) {
      console.log("Some error occured");
    }
  };

  useEffect(() => {
    getAdminData();
  }, []);

  return (
    <>
      <main>
        <TableTopActions />
        <Table users={users} />
        <Pagination />
      </main>
    </>
  );
}
