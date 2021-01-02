import PropTypes from 'prop-types';
import Link from 'next/link';
import BlogTypes from 'types/blog';

const PostPage = ({ post }) => (
  <div className="flex justify-center my-8">
    <div className="container font-mono">
      <Link href="/blog/">
        <a>Back</a>
      </Link>
      <div className="text-8xl text-center">{post.title}</div>
      <div className="rounded-md my-5 flex justify-center">
        <img
          src={post.image}
          alt={post.title}
          className="object-cover rounded-md"
        />
      </div>
      <article className="w-full p-1.5">
        <p className="text-lg">{post.content}</p>
      </article>
    </div>
  </div>
);

PostPage.propTypes = {
  post: PropTypes.shape(BlogTypes.Post).isRequired,
};

export default PostPage;
