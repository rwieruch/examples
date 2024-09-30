import Link from "next/link";

const HomePage = () => {
  return (
    <ul>
      <li>
        <Link href="/create-class">createClass (Deprecated)</Link>
      </li>
      <li>
        <Link href="/mixins">Mixins (Deprecated)</Link>
      </li>
      <li>
        <Link href="/class-component">Class Component (Deprecated)</Link>
      </li>
      <li>
        <Link href="/class-component-alternative-syntax">
          Class Component Alternative Syntax (Deprecated)
        </Link>
      </li>
      <li>
        <Link href="/function-component">Function Component</Link>
      </li>
      {/* <li>
        <Link href="/pure-component">Pure Component (Deprecated)</Link>
      </li>
      <li>
        <Link href="/stateless-vs-statefull">
          Stateless vs Stateful Component
        </Link>
      </li>
      <li>
        <Link href="/presenter-vs-container">
          Presenter vs Container Component (Deprecated)
        </Link>
      </li> */}
      <li>
        <Link href="/higher-order-component">Higher-Order Component</Link>
      </li>
      {/* <li>
        <Link href="/render-prop-component">Render Prop Component</Link>
      </li>
      <li>
        <Link href="/compound-component">Compound Component</Link>
      </li>
      <li>
        <Link href="/composition-component">Composition Component</Link>
      </li>
      <li>
        <Link href="/client-component">Client Component</Link>
      </li> */}
      <li>
        <Link href="/server-component">Server Component</Link>
      </li>
      {/* <li>
        <Link href="/async-component">Async Component</Link>
      </li> */}
    </ul>
  );
};

export default HomePage;
