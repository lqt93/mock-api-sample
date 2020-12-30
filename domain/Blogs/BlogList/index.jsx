import PropTypes from 'prop-types';
import BlogItem from '../BlogItem';

const BlogList = ({ list }) => (
  <ul>
    {list.map((item) => (
      <BlogItem key={item.id} item={item} />
    ))}
  </ul>
);

BlogList.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      createdAt: PropTypes.string,
      title: PropTypes.string,
      image: PropTypes.string,
      content: PropTypes.string,
    }),
  ).isRequired,
};

export default BlogList;
