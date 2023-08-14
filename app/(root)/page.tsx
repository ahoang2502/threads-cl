//app/page.tsx
import { fetchPosts } from "@/lib/actions/thread.actions";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs";
import ThreadCard from "@/components/cards/ThreadCard";

export default async function Home() {
  const data = await fetchPosts(1, 5);
  const user = await currentUser();

  console.log(data)

  return (
    <>
      <h1 className="head-text text-left">Home</h1>

      <section className="mt-9 flex flex-col gap-10">
        {data.posts.length === 0 ? (
          <p className="no-result">
            No threads found. Let's create one{" "}
            <Link
              href="/create-thread"
              className="text-light-1 hover:text-primary-500"
            >
              here!
            </Link>
          </p>
        ) : (
          <>
            {data.posts.map((post) => (
              <ThreadCard
                key={post._id}
                id={post._id}
                currentUserId={user?.id || ''}
                parentId={post.parentId}
                content={post.text}
                author={post.author}
                community={post.community}
                createdAt={post.createdAt}
                children={post.children}
              />
            ))}
          </>
        )}
      </section>
    </>
  );
}
