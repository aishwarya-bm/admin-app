import { Table } from "../components/Table";
import { TableTopActions } from "../components/TableTopActions";
import { Pagination } from "../components/Pagination";

export function MainPage() {
  return (
      <main>
        <TableTopActions/>
        <Table/>
        <Pagination />
      </main>
  );
}
