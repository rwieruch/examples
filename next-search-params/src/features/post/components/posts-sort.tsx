"use client";

import { useQueryStates } from "nuqs";
import { sortParser, sortOptions } from "../search-params";

const PostsSort = () => {
  const options = [
    { label: "Newest", sortKey: "createdAt", sortValue: "desc" },
    { label: "Upvotes", sortKey: "upvotes", sortValue: "desc" },
  ];

  const [sort, setSort] = useQueryStates(sortParser, sortOptions);

  const handleSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const compositeKey = event.target.value;
    const [sortKey, sortValue] = compositeKey.split("_");

    setSort({
      sortKey,
      sortValue,
    });
  };

  return (
    <select value={sort.sortKey + "_" + sort.sortValue} onChange={handleSort}>
      {options.map((option) => (
        <option
          key={option.sortKey + option.sortValue}
          value={option.sortKey + "_" + option.sortValue}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
};

export { PostsSort };
