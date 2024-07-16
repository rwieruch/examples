import { getPosts } from "@/data";

export async function GET() {
  const posts = await getPosts();

  return Response.json(posts);
}
