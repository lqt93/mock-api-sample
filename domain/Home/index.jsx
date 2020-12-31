import Link from 'next/link';

const Home = () => (
  <div>
    <h1> Welcome Home </h1>
    <div>
      <Link href="/blog">
        <a> Go to blog </a>
      </Link>
    </div>
  </div>
);

export default Home;
