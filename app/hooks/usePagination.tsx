import { useCallback, useMemo, useState } from "react";
import { IProperty } from "../types";

type Props = {
  data: IProperty[];
  itemsPerPage: number;
};

const usePagination = ({ data, itemsPerPage }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const maxPage = Math.ceil(data.length / itemsPerPage);

  const currentData = () => {
    const begin = (currentPage - 1) * itemsPerPage;
    const end = begin + itemsPerPage;
    return data.slice(begin, end);
  };

  const next = useCallback(
    () => setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPage)),
    []
  );

  const prev = useCallback(
    () => setCurrentPage((currentPage) => Math.max(currentPage - 1, 1)),
    []
  );

  const jump = useCallback((page: number) => {
    const pageNumber = Math.max(1, page);
    setCurrentPage((currentPage) => Math.min(pageNumber, maxPage));
  }, []);

  return { next, prev, jump, currentData, currentPage, maxPage };
};

export default usePagination;
