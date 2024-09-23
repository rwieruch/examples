import Link from "next/link";

const HomePage = () => {
  return (
    <ul>
      <li>
        <Link href="/server-components">Server Component</Link>
      </li>
      <li>
        <Link href="/react-query">React Query</Link>
      </li>
      <li>
        <Link href="/rsc-rq">Server Component + React Query</Link>
      </li>
      <li>
        <Link href="/use">use(Promise)</Link>
      </li>
      <li>
        <Link href="/hooks">Hooks</Link>
      </li>
    </ul>
  );
};

export default HomePage;
