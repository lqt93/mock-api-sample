import PropTypes from 'prop-types';

const BlogItemType = PropTypes.shape({
  id: PropTypes.string,
  createdAt: PropTypes.string,
  title: PropTypes.string,
  image: PropTypes.string,
  content: PropTypes.string,
}).isRequired;

export default {
  BlogItemType,
};
