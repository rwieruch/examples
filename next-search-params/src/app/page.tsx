import { Posts } from "@/features/post/components/posts";
import { searchParamsCache } from "@/features/post/search-params";
import { SearchParams } from "nuqs/server";

export type PageProps = {
  searchParams: SearchParams;
};

const Page = ({ searchParams }: PageProps) => {
  return (
    <div>
      <h1>Search Params in Next.js</h1>

      <Posts searchParams={searchParamsCache.parse(searchParams)} />
    </div>
  );
};

export default Page;
