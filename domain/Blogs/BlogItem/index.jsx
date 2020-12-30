import PropTypes from 'prop-types';

const BlogItem = ({ item }) => (
  <div>
    <div>
      {item.id}
      {' - '}
      {item.title}
    </div>
  </div>
);

BlogItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    createdAt: PropTypes.string,
    title: PropTypes.string,
    image: PropTypes.string,
    content: PropTypes.string,
  }).isRequired,
};

export default BlogItem;
