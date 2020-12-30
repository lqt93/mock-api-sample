import Link from 'next/link';

function Home() {
  return (
    <div>
      <h1> Welcome Home </h1>
      <div>
        <Link href="/blogs">
          <a> Go to blogs </a>
        </Link>
      </div>
    </div>
  );
}

export default Home;
