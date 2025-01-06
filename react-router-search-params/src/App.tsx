import { parseAsBoolean, parseAsString, useQueryStates } from "nuqs";
import { Routes, Route, Link } from "react-router";

const Home = () => {
  return (
    <>
      <h2>Home</h2>
    </>
  );
};

type Book = {
  title: string;
  isCompleted: boolean;
};

type Search = {
  title: string;
  isCompleted: boolean;
};

const bySearch = (search: Search) => (book: Book) =>
  book.title.toLowerCase().includes((search.title || "").toLowerCase()) &&
  book.isCompleted === search.isCompleted;

const Bookshelf = () => {
  const books = [
    {
      title: "The Road to Next",
      isCompleted: false,
    },
    {
      title: "The Road to React",
      isCompleted: true,
    },
  ];

  const [search, setSearch] = useQueryStates({
    title: parseAsString.withDefault(""),
    isCompleted: parseAsBoolean.withDefault(false),
  });

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch({ title: event.target.value });
  };

  const handleIsCompleted = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch({ isCompleted: event.target.checked });
  };

  return (
    <>
      <h2>Bookshelf</h2>

      <input type="text" value={search.title} onChange={handleTitle} />

      <input
        type="checkbox"
        checked={search.isCompleted}
        onChange={handleIsCompleted}
      />

      <ul>
        {books.filter(bySearch(search)).map((book) => (
          <li key={book.title}>{book.title}</li>
        ))}
      </ul>
    </>
  );
};

const NoMatch = () => {
  return <p>There's nothing here: 404!</p>;
};

const App = () => {
  return (
    <>
      <h1>React Router</h1>

      <nav>
        <Link to="/">Home</Link>
        <Link to="/bookshelf">Bookshelf</Link>
      </nav>

      <Routes>
        <Route index element={<Home />} />
        <Route path="bookshelf" element={<Bookshelf />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
};

export default App;
