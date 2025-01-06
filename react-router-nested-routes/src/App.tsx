import { Routes, Route, Link, Outlet, useParams } from "react-router";

const Home = () => {
  return (
    <>
      <h2>Home</h2>
    </>
  );
};

type UsersProps = {
  users: {
    id: string;
    fullName: string;
  }[];
};

const Users = ({ users }: UsersProps) => {
  return (
    <>
      <h2>Users</h2>

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={user.id}>{user.fullName}</Link>
          </li>
        ))}
      </ul>

      <Outlet />
    </>
  );
};

const User = () => {
  const { userId } = useParams();

  return (
    <>
      <h2>User: {userId}</h2>

      <Link to="/users">Back to Users</Link>
    </>
  );
};

const NoMatch = () => {
  return <p>There's nothing here: 404!</p>;
};

const App = () => {
  const users = [
    { id: "1", fullName: "Robin Wieruch" },
    { id: "2", fullName: "Sarah Finnley" },
  ];

  return (
    <>
      <h1>React Router</h1>

      <nav>
        <Link to="/">Home</Link>
        <Link to="/users">Users</Link>
      </nav>

      <Routes>
        <Route index element={<Home />} />
        <Route path="users" element={<Users users={users} />}>
          <Route path=":userId" element={<User />} />
        </Route>
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
};

export default App;
