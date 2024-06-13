import "server-only";
import { eq } from "drizzle-orm";
import Link from "next/link";

import { CreatePost } from "~/app/_components/create-post";
import { api } from "~/trpc/server";
i;d;mport { db } from "~/server/db";
import { revalidatePath } from "next/cache";

export default async function Home() {
    const posts = await db.query.posts.findMany();

  return (
    <main>
    {posts.map((post) => (
      <Post key={post.id} post={post} />
    ))}
    </main>
  );
}

function Post({ post }: { post: {id: number, name: string | null}}) {
    return ( 
            <div className="flex gap-2 p-4  ">{post.name}

            <form 
                action={async () => {
                "use server";
                console.log("Deleting post", post.id);
                await db.delete(posts).where(eq(posts.id, post.id));
                revalidatePath("/");
            }}>
            <button className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded" type = "submit">X
            </button>
            </form>
            </div>
           )
}

