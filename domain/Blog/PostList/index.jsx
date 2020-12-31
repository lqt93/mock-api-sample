import PropTypes from 'prop-types';
import BlogTypes from 'types/blog';
import BlogItem from './PostItem';

const PostList = ({ list }) => (
  <ul>
    {list.map((item) => (
      <BlogItem key={item.id} item={item} />
    ))}
  </ul>
);

PostList.defaultProps = {
  list: [],
};

PostList.propTypes = {
  list: PropTypes.arrayOf(BlogTypes.Post),
};

export default PostList;
