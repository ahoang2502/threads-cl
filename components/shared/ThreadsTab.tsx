import { fetchUserPosts } from "@/lib/actions/user.actions";
import ThreadCard from "../cards/ThreadCard";

import { redirect } from "next/navigation";


interface Props {
  currentUserId: string;
  accountId: string;
  accountType: string;
}

const ThreadsTab = async ({ currentUserId, accountId, accountType }: Props) => {
  let data = await fetchUserPosts(accountId);
  if (!data) redirect("/");

  return (
    <section className="mt-9 flex flex-col gap-10">
      {data.threads.map((thread: any) => (
        <ThreadCard
          key={thread._id}
          id={thread._id}
          currentUserId={currentUserId}
          parentId={thread.parentId}
          content={thread.text}
          author={
            accountType === "User"
              ? { name: data.name, image: data.image, id: data.id }
              : {
                  name: thread.author.name,
                  image: thread.author.image,
                  id: thread.author.id,
                }
          }
          community={thread.community}
          createdAt={thread.createdAt}
          comments={thread.comments}
          isComment
        />
      ))}
    </section>
  );
};

export default ThreadsTab;
