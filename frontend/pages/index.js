import Link from 'next/link';

const Home = () => {
  return (
    <div>
      <h1>Image Manager</h1>
      <nav>
        <ul>
          <li>
            <Link href="/analyze">Analyze</Link>
          </li>
          <li>
            <Link href="/approved">Approved</Link>
          </li>
          <li>
            <Link href="/rejected">Rejected</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;
