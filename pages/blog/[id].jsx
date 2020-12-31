import PropTypes from 'prop-types';
import http from 'services/http';
import PostPage from 'domain/Blog/PostPage';
import BlogTypes from 'types/blog';

const PostWithId = ({ post }) => <PostPage post={post} />;

export async function getServerSideProps(context) {
  const { id } = context.params;
  const { data } = await http.get(`/blogs/${id}`);
  if (!data) {
    return {
      notFound: true,
    };
  }
  return {
    props: { post: data },
  };
}

PostWithId.propTypes = {
  post: PropTypes.shape(BlogTypes.Post).isRequired,
};

export default PostWithId;
