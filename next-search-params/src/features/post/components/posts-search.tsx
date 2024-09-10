"use client";

import { useQueryState } from "nuqs";
import { useDebouncedCallback } from "use-debounce";
import { searchParser } from "../search-params";

type PostsSearchProps = {
  placeholder: string;
};

const PostsSearch = ({ placeholder }: PostsSearchProps) => {
  const [search, setSearch] = useQueryState("search", searchParser);

  const handleSearch = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value);
    },
    250
  );

  return (
    <input
      placeholder={placeholder}
      defaultValue={search}
      onChange={handleSearch}
    />
  );
};

export { PostsSearch };
