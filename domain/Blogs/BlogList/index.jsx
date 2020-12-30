import PropTypes from 'prop-types';
import BlogTypes from 'types/blog';
import BlogItem from '../BlogItem';

const BlogList = ({ list }) => (
  <ul>
    {list.map((item) => (
      <BlogItem key={item.id} item={item} />
    ))}
  </ul>
);

BlogList.defaultProps = {
  list: [],
};

BlogList.propTypes = {
  list: PropTypes.arrayOf(BlogTypes.BlogItemType),
};

export default BlogList;
