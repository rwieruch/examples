import { useState } from "react";
import axios from "axios";
import { useQuery } from "./use-query";

type Story = {
  objectID: string;
  title: string;
  url: string;
};

const App = () => {
  const [search, setSearch] = useState("");
  const [activeSearch, setActiveSearch] = useState("react");

  const { data, isLoading, isError } = useQuery<Story[]>({
    queryKey: [activeSearch],
    queryFn: async () => {
      const result = await axios(
        `https://hn.algolia.com/api/v1/search?query=${activeSearch}`
      );

      return result.data.hits;
    },
    initialData: [],
  });

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setActiveSearch(search);
    setSearch("");

    event.preventDefault();
  };

  console.log("asd", data, isLoading);

  return (
    <>
      <form onSubmit={handleSearchSubmit}>
        <input type="text" value={search} onChange={handleSearchChange} />
        <button type="submit">Search</button>
      </form>

      {isError && <div>Something went wrong ...</div>}

      <ul>
        {isLoading ? (
          <div>Loading ...</div>
        ) : (
          data.map((item) => (
            <li key={item.objectID}>
              <a href={item.url}>{item.title}</a>
            </li>
          ))
        )}
      </ul>
    </>
  );
};

export default App;
