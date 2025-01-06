import { useEffect } from "react";
import { Routes, Route, Link, Navigate, useNavigate } from "react-router";

const Home = () => {
  return (
    <>
      <h2>Home</h2>
    </>
  );
};

const About = () => {
  const shouldRedirect = true;

  const navigate = useNavigate();

  useEffect(() => {
    if (shouldRedirect) {
      navigate("/");
    }
  });

  return (
    <>
      <h2>About</h2>
      {shouldRedirect && <Navigate replace to="/" />}
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
        <Link to="/about">About</Link>
      </nav>

      <Routes>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
};

export default App;
