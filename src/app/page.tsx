import Link from "next/link";

import { CreatePost } from "~/app/_components/create-post";
import { api } from "~/trpc/server";
import { db } from "~/server/db";

export default async function Home() {
    const posts = await db.query.posts.findMany();

  return <main>{posts.map(posts => (<p> key={posts.name}</p>))}</main>;

}

