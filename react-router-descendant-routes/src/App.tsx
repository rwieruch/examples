import { Link, Routes, Route, useParams, Outlet } from "react-router";

type User = {
  id: string;
  firstName: string;
  lastName: string;
};

const Home = () => {
  return (
    <>
      <h2>Home</h2>
    </>
  );
};

type UserListProps = {
  users: User[];
};

const UserList = ({ users }: UserListProps) => {
  return (
    <>
      <h2>Users</h2>
      <h3>User List</h3>

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={user.id}>
              {user.firstName} {user.lastName}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

const UserItem = () => {
  const { userId } = useParams();

  return (
    <>
      <h2>Users</h2>
      <h3>User Item: {userId}</h3>

      <Link to="/users">Back to Users</Link>
    </>
  );
};

type UsersProps = {
  users: User[];
};

const Users = ({ users }: UsersProps) => {
  return (
    <>
      <Routes>
        <Route index element={<UserList users={users} />} />
        <Route path=":userId" element={<UserItem />} />
      </Routes>

      <Outlet />
    </>
  );
};

const NoMatch = () => {
  return <p>There's nothing here: 404!</p>;
};

const App = () => {
  const users = [
    { id: "1", firstName: "Robin", lastName: "Wieruch" },
    { id: "2", firstName: "Sarah", lastName: "Finnley" },
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
        <Route path="users/*" element={<Users users={users} />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
};

export default App;
