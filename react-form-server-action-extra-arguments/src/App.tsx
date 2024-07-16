type ProfileFormProps = {
  user: {
    id: string;
    name: string;
  };
};

const ProfileForm = ({ user }: ProfileFormProps) => {
  const updateProfile = async (id: string, formData: FormData) => {
    "use server";

    const data = {
      id,
      username: formData.get("username"),
    };

    console.log(data);
  };

  return (
    <form action={updateProfile.bind(null, user.id)}>
      <label htmlFor="username">Username:</label>
      <input name="username" id="username" />

      <button type="submit">Send</button>
    </form>
  );
};

const App = () => {
  return (
    <ProfileForm
      user={{
        id: "1",
        name: "Alice",
      }}
    />
  );
};

export default App;
