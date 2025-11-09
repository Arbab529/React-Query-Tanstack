"use client";
import { getPostById } from "@/api/posts";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams } from "next/navigation";

const Post = () => {
  const params = useParams();
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["post", params?.id], // when Id will change then it will refetch
    queryFn: () => getPostById(params?.id),
  });

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>{error.message}</div>;

  return (
    <>
      <h1 className="mb-[2rem] text-[2rem]">Post - {data?.id}</h1>
      <div className="border border-gray-700 mb-[2rem] p-[1rem] rounded-md">
        <p className="text-orange-600">
          {data?.id} - {data?.title}
        </p>
        <p>{data?.body}</p>
      </div>
      <Link href="/">Go Back</Link>
    </>
  );
};

export default Post;
