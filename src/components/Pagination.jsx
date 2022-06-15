import { faAngleLeft, faAnglesLeft, faAngleRight, faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ROWS_PER_PAGE } from "../constants/pagination";
import { useAdmin } from "../context/admin-context";
export function Pagination() {
  const {
    dispatch,
    state: { currentPage, indexOfFirst, indexOfLast, searchedUsers },
  } = useAdmin();
  const totalUsers = searchedUsers?.length;
  const totalPages = Math.ceil(totalUsers / ROWS_PER_PAGE);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);

  return (
    <div className="pagination">
      <button
        className="page-number"
        disabled={currentPage === 1}
        onClick={() => {
          let lastIndex = ROWS_PER_PAGE <= totalUsers ? ROWS_PER_PAGE : totalUsers;
          let firstIndex =  1;
          dispatch({ type: "SET_CURRENTPAGE", payload: { number: 1, firstIndex, lastIndex } });
        }}>
        <FontAwesomeIcon icon={faAnglesLeft} />
      </button>
      <button
        className="page-number"
        disabled={currentPage === 1}
        onClick={() => {
          let lastIndex =
            (currentPage - 1) * ROWS_PER_PAGE <= totalUsers ? (currentPage - 1) * ROWS_PER_PAGE : totalUsers;
          let firstIndex = indexOfFirst - ROWS_PER_PAGE;
          dispatch({ type: "SET_CURRENTPAGE", payload: { number: currentPage-1, firstIndex, lastIndex } });
        }}>
        <FontAwesomeIcon icon={faAngleLeft} />
      </button>
      {pageNumbers.map(number => (
        <button
          key={"page" + number}
          onClick={() => {
            let lastIndex = number * ROWS_PER_PAGE <= totalUsers ? number * ROWS_PER_PAGE : totalUsers;
            let firstIndex = (number - 1) * ROWS_PER_PAGE + 1;
            dispatch({ type: "SET_CURRENTPAGE", payload: { number, firstIndex, lastIndex } });
          }}
          className={number === currentPage ? "current-pagenumber" : "page-number"}>
          {number}
        </button>
      ))}
      <button
        className="page-number"
        disabled={currentPage === totalPages}
        onClick={() => {
          let lastIndex = indexOfLast + ROWS_PER_PAGE <= totalUsers ? indexOfLast + ROWS_PER_PAGE : totalUsers;
          let firstIndex = indexOfFirst + ROWS_PER_PAGE;
          dispatch({ type: "SET_CURRENTPAGE", payload: { number: currentPage + 1, firstIndex, lastIndex } });
        }}>
        <FontAwesomeIcon icon={faAngleRight} />
      </button>
      <button
        className="page-number"
        disabled={currentPage === totalPages}
        onClick={() => {
          let lastIndex = totalPages * ROWS_PER_PAGE <= totalUsers ? totalPages * ROWS_PER_PAGE : totalUsers;
          let firstIndex = (totalPages - 1) * ROWS_PER_PAGE + 1;
          dispatch({ type: "SET_CURRENTPAGE", payload: { number:totalPages, firstIndex, lastIndex } });
        }}>
        <FontAwesomeIcon icon={faAnglesRight} />
      </button>
    </div>
  );
}
