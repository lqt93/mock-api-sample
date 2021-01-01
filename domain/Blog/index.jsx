import {
  useState,
  useEffect,
  memo,
  useRef,
} from 'react';
import http from 'services/http';
import Loading from 'components/Loading';
import Paginator from 'components/Paginator';
import SearchBar from 'components/SearchBar';
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

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

// const postRangeInCurrentPage = (page, totalItems, maxLength) => {
//   const rangeEndTemp = page * maxLength;
//   const rangeStart = rangeEndTemp - maxLength;
//   const rangeEnd = rangeEndTemp > totalItems ? totalItems : rangeEndTemp;
//   return [rangeStart, rangeEnd];
// };

const MAX_LENGTH_POST_IN_PAGE = 10;

let TOTAL_PAGES = 0;
let MAX_LENGTH_PAGES = 0;

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState([]);
  const [fetchUrl, setFetchUrl] = useState('');
  const prevFetchUrl = usePrevious(fetchUrl);
  const getPosts = async (url) => {
    console.log('get posts: ', url);
    setLoading(true);
    const tempRange = rangeOfCurrentPage(page, TOTAL_PAGES, 5);
    setRange(tempRange);
    const { data } = await http.get(url);
    setPosts(data);
    setLoading(false);
  };

  useEffect(async () => {
    const { data } = await http.get('/blogs');
    MAX_LENGTH_PAGES = findStep(data.length, MAX_LENGTH_POST_IN_PAGE, true);
    TOTAL_PAGES = findStep(data.length, MAX_LENGTH_POST_IN_PAGE);
    setFetchUrl(`/blogs?page=${page}&limit=${MAX_LENGTH_POST_IN_PAGE}`);
    setLoading(false);
  }, []);

  const search = async (value) => {
    setPage(1);
    setLoading(true);
    const url = `/blogs?${value ? 'search=' : ''}${encodeURI(value.trim())}`;
    const { data } = await http.get(url);
    MAX_LENGTH_PAGES = findStep(data.length, MAX_LENGTH_POST_IN_PAGE, true);
    TOTAL_PAGES = findStep(data.length, MAX_LENGTH_POST_IN_PAGE);
    const tempRange = rangeOfCurrentPage(page, TOTAL_PAGES, 5);
    setRange(tempRange);
    setFetchUrl(
      `${url}${value ? '&' : ''}page=${page}&limit=${MAX_LENGTH_POST_IN_PAGE}`,
    );
  };

  useEffect(async () => {
    setFetchUrl(`/blogs?page=${page}&limit=${MAX_LENGTH_POST_IN_PAGE}`);
  }, [page]);

  useEffect(() => {
    if (Boolean(fetchUrl) && prevFetchUrl !== fetchUrl) {
      getPosts(fetchUrl);
    }
  }, [fetchUrl]);

  return (
    <div>
      <h1> Welcome Blog </h1>
      <SearchBar onSearchChange={search} />
      {loading && <Loading />}
      {!loading && Boolean(posts.length) && (
        <div>
          <BlogList list={posts} />
          <Paginator
            page={page}
            totalPages={TOTAL_PAGES}
            onSelectPage={setPage}
            range={range}
            maxLength={MAX_LENGTH_PAGES}
          />
        </div>
      )}
      {!loading && !posts.length && <div> No result </div>}
    </div>
  );
};

export default memo(Blog);
