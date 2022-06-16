import { faAngleLeft, faAnglesLeft, faAngleRight, faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ROWS_PER_PAGE } from "../constants/pagination";
import { useAdmin } from "../context/admin-context";
import {
  setFirstPageIdx,
  setLastPageIdx,
  setNextPageIdx,
  setPreviousPageIdx,
  setSelectedPageIndex,
} from "../utils/admin-util";
export function Pagination() {
  const { dispatch, state } = useAdmin();
  const { currentPage, indexOfFirst, searchedUsers, searchText, users } = state;
  const totalUsers = searchText ? searchedUsers?.length : users?.length;
  const totalPages = Math.ceil(totalUsers / ROWS_PER_PAGE);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);

  return (
    <div className="pagination">
      <button
        className="page-number"
        disabled={currentPage === 1}
        onClick={() => {
          setFirstPageIdx(totalUsers, dispatch);
        }}>
        <FontAwesomeIcon icon={faAnglesLeft} />
      </button>
      <button
        className="page-number"
        disabled={currentPage === 1}
        onClick={() => {
          setPreviousPageIdx(totalUsers, currentPage, indexOfFirst, dispatch);
        }}>
        <FontAwesomeIcon icon={faAngleLeft} />
      </button>
      {pageNumbers.map(number => (
        <button
          key={"page" + number}
          onClick={() => {
            setSelectedPageIndex(number, totalUsers, dispatch);
          }}
          className={number === currentPage ? "current-pagenumber" : "page-number"}>
          {number}
        </button>
      ))}
      <button
        className="page-number"
        disabled={currentPage === totalPages}
        onClick={() => {
          setNextPageIdx(totalUsers, state, dispatch);
        }}>
        <FontAwesomeIcon icon={faAngleRight} />
      </button>
      <button
        className="page-number"
        disabled={currentPage === totalPages}
        onClick={() => {
          setLastPageIdx(totalPages, totalUsers, dispatch);
        }}>
        <FontAwesomeIcon icon={faAnglesRight} />
      </button>
    </div>
  );
}
