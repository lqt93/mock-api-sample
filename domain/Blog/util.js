export const calculateRange = (
  totalItemsNumber,
  postsPerPage,
  isPagePerDisplay = false,
) => {
  if (totalItemsNumber < postsPerPage) return 1;
  return isPagePerDisplay
    ? Math.floor(totalItemsNumber / postsPerPage)
    : Math.ceil(totalItemsNumber / postsPerPage);
};

// calculate which range of current page
export const rangeOfCurrentPage = (currentPage, totalPages, postsPerPage) => {
  const currentRange = calculateRange(currentPage, postsPerPage);
  const maxRange = calculateRange(totalPages, postsPerPage);
  const tempRangeMax = currentRange * postsPerPage;
  const rangeMax = currentRange === maxRange && tempRangeMax > totalPages
    ? totalPages
    : tempRangeMax;
  const rangeMin = tempRangeMax - postsPerPage + 1;
  const range = [];
  for (let i = rangeMin; i <= rangeMax; i += 1) {
    range.push(i);
  }
  return range;
};

// generate url to fetch bases on some variables
export const generateUrl = (searchTerm, page, sortBy, order, limit) => (searchTerm
  ? `/blogs?search=${searchTerm}&page=${page}&limit=${limit}&sortBy=${sortBy}&order=${order}`
  : `/blogs?page=${page}&limit=${limit}&sortBy=${sortBy}&order=${order}`);
