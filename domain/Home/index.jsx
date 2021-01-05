import Link from 'next/link';

const Home = () => (
  <div className="w-full h-screen flex justify-center items-center flex-col bg-gray-50 font-mono">
    <h1 className="text-3xl my-5"> Welcome Home </h1>
    <div className="text-blue-700">
      <Link href="/blog">
        <a> Go to blog </a>
      </Link>
    </div>
  </div>
);

export default Home;
