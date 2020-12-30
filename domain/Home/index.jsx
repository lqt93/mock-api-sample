import Link from 'next/link';

const Home = () => (
  <div>
    <h1> Welcome Home </h1>
    <div>
      <Link href="/blogs">
        <a> Go to blogs </a>
      </Link>
    </div>
  </div>
);

export default Home;
