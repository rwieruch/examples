import { getUsers } from "@/features/user/user-dao";
import { UserItem } from "@/features/user/user-item";

const Home = async () => {
  const users = await getUsers();

  return (
    <div>
      {users.map((user) => (
        <UserItem key={user.id} user={user} />
      ))}
    </div>
  );
};

export default Home;
