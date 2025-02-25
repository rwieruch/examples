import { User } from "@/components/user";
import { getUsers } from "@/daos/user-dao";

const Home = async () => {
  const users = await getUsers();

  return (
    <div>
      {users.map((user) => (
        <User key={user.id} user={user} />
      ))}
    </div>
  );
};

export default Home;
