import { faAngleLeft, faAnglesLeft, faAngleRight, faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export function Pagination() {
  const pageNumbers = [1, 2, 3, 4, 5];
  return (
    <div className="pagination">
      <button
        className="page-number"
        // disabled={currentPage === 1}
        onClick={() => {
          //   paginate(1);
          //   setCurrentPage(1);
        }}>
        <FontAwesomeIcon icon={faAnglesLeft} />
      </button>
      <button
        className="page-number"
        // disabled={currentPage === 1}
        onClick={() => {
          //   paginate(currentPage - 1);
          //   setCurrentPage(currentPage - 1);
        }}>
        <FontAwesomeIcon icon={faAngleLeft} />
      </button>
      {pageNumbers.map(number => (
        <button
          key={"page" + number}
          onClick={() => {
            // paginate(number);
            // setCurrentPage(number);
          }}>
          {/* className={number === currentPage ? "current-pagenumber" : "page-number"} */}
          {number}
        </button>
      ))}
      <button
        className="page-number"
        // disabled={currentPage === lastPageNumber}
        onClick={() => {
          //   paginate(currentPage + 1);
          //   setCurrentPage(currentPage + 1);
        }}>
        <FontAwesomeIcon icon={faAngleRight} />
      </button>
      <button
        className="page-number"
        // disabled={currentPage === lastPageNumber}
        onClick={() => {
          //   paginate(lastPageNumber);
          //   setCurrentPage(lastPageNumber);
        }}>
        <FontAwesomeIcon icon={faAnglesRight} />
      </button>
    </div>
  );
}
