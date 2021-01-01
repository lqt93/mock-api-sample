import { useState, useEffect } from 'react';
import http from 'services/http';
import Loading from 'components/Loading';
import Paginator from 'components/Paginator';
import BlogList from './PostList';

const findStep = (page, maxLength, isPage = false) => {
  if (page < maxLength) return 1;
  return isPage ? Math.floor(page / maxLength) : Math.ceil(page / maxLength);
};

const rangeOfCurrentPage = (currentPage, totalPages, maxLength) => {
  const currentStep = findStep(currentPage, maxLength);
  const maxStep = findStep(totalPages, maxLength);
  const tempRangeMax = currentStep * maxLength;
  const rangeMax = currentStep === maxStep && tempRangeMax > totalPages
    ? totalPages
    : tempRangeMax;
  const rangeMin = tempRangeMax - maxLength + 1;
  const range = [];
  for (let i = rangeMin; i <= rangeMax; i += 1) {
    range.push(i);
  }
  return range;
};

const postRangeInCurrentPage = (page, totalItems, maxLength) => {
  const rangeEndTemp = page * maxLength;
  const rangeStart = rangeEndTemp - maxLength;
  const rangeEnd = rangeEndTemp > totalItems ? totalItems : rangeEndTemp;
  return [rangeStart, rangeEnd];
};

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  useEffect(async () => {
    const { data } = await http.get('/blogs');
    setPosts(data);
  }, [page]);
  const TOTAL_ITEM_NUMBER = posts.length;
  const MAX_LENGTH_PAGES = 5;
  const MAX_LENGTH_POST_IN_PAGE = findStep(
    TOTAL_ITEM_NUMBER,
    MAX_LENGTH_PAGES,
    true,
  );
  const TOTAL_PAGES = findStep(TOTAL_ITEM_NUMBER, MAX_LENGTH_POST_IN_PAGE);
  const range = rangeOfCurrentPage(page, TOTAL_PAGES, MAX_LENGTH_PAGES);
  const postRange = postRangeInCurrentPage(
    page,
    TOTAL_ITEM_NUMBER,
    MAX_LENGTH_POST_IN_PAGE,
  );
  console.log('page changed: ', page, postRange);
  return (
    <div>
      <h1> Welcome Blog </h1>
      {!posts.length ? (
        <Loading />
      ) : (
        <div>
          <BlogList list={posts.slice(postRange[0], postRange[1] + 1)} />
          <Paginator
            page={page}
            totalPages={TOTAL_PAGES}
            onSelectPage={setPage}
            range={range}
            maxLength={MAX_LENGTH_PAGES}
          />
        </div>
      )}
    </div>
  );
};

export default Blog;
