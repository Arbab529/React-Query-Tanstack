"use client";
import { deletePostById, getPosts, updatePostById } from "@/api/posts";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [pageNumber, setPageNumber] = useState(0);
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["posts", pageNumber],
    queryFn: () => getPosts(pageNumber),
    placeholderData: keepPreviousData,
  });

  const queryClient = useQueryClient();
  const deletePost = useMutation({
    mutationFn: (id) => deletePostById(id),
    onSuccess: (data, id) => {
      // queryClient.invalidateQueries(["posts",pageNumber]); // For real api refetching
      // queryClient.invalidateQueries(["post"]); // For real api refetching
      queryClient.setQueryData(["posts", pageNumber], (oldData) => {
        return oldData.filter((post) => post.id !== id);
      });
    },
  });

  const updatePost = useMutation({
    mutationFn: ({ id, updatedData }) => updatePostById(id, updatedData),
    onSuccess: (data, variables) => {
      // variables -> id, updatedData (jo mutate function ke andar pass karay ga)
      // data -> updated data from server
      queryClient.setQueryData(["posts", pageNumber], (oldData) =>
        oldData?.map((post) =>
          post.id === variables.id
            ? { ...post, title: variables?.updatedData?.title }
            : post
        )
      );
    },
  });

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>{error.message}</div>;

  return (
    <div>
      <h1 className="mb-[2rem] text-[2rem]">
        Posts |{" "}
        <Link href="/users" className="text-[1rem]">
          Users
        </Link>
      </h1>
      {data?.map((post) => (
        <div
          key={post?.id}
          className="border border-gray-700 mb-[2rem] p-[1rem] rounded-md"
        >
          <Link href={`/${post?.id}`} className="text-orange-600">
            {post?.id} - {post?.title}
          </Link>
          <p>{post?.body}</p>
          <div className="flex gap-[1rem] justify-end">
            <button
              className="lightbtn mt-[1rem]"
              onClick={() =>
                updatePost.mutate({
                  id: post?.id,
                  updatedData: { title: "I have updated" },
                })
              }
            >
              Edit
            </button>
            <button
              className="btn mt-[1rem]"
              onClick={() => deletePost.mutate(post?.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
      <div className="flex items-center gap-[2rem]">
        <button
          className={`btn`}
          disabled={pageNumber === 0}
          onClick={() => setPageNumber((prev) => prev - 3)}
        >
          Prev
        </button>
        <span>{pageNumber / 3 + 1}</span>
        <button
          className="btn"
          onClick={() => setPageNumber((prev) => prev + 3)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
