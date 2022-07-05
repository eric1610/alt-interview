import "./styles.css";

type PaginationType = {
  nextPageHandler: () => void;
  prevPageHandler: () => void;
  currPage: number;
  maxPages: number;
};

const Pagination = ({
  prevPageHandler,
  currPage,
  maxPages,
  nextPageHandler,
}: PaginationType) => {
  return (
    <div className="page-footer flex-gap">
      <button onClick={prevPageHandler} disabled={currPage === 0}>
        Prev
      </button>
      {currPage + 1} of {maxPages}
      <button onClick={nextPageHandler} disabled={currPage + 1 >= maxPages}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
