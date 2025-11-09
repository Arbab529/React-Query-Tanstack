"use client";
import { getUsers } from "@/api/users";
import { useInfiniteQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

const Users = () => {
  const { data, hasNextPage, fetchNextPage, status, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["users"],
      queryFn: getUsers,
      getNextPageParam: (lastPage, allPages) => {
        // If the last page has 10 items, then there is a next page.
        // If the last page has less than 10 items, then there is no next page.
        // Return the next page number if there is a next page, or undefined if there is no next page.
        return lastPage.length === 10 ? allPages.length + 1 : undefined;
      },
    });

  const handleScroll = () => {
    const bottom =
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 1;
    if (bottom && hasNextPage) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasNextPage]);

  if (status === "loading") return <div>Loading...</div>;
  if (status === "error") return <div>{error.message}</div>;
  return (
    <div>
      <h1 className="mb-[2rem] text-[2rem]">
        Users |{" "}
        <Link href="/" className="text-[1rem]">
          Posts
        </Link>
      </h1>
      {data?.pages?.map((page) =>
        page?.map((d) => (
          <div
            key={d?.id}
            className="border border-gray-700 mb-[2rem] p-[1rem] rounded-md"
          >
            <div className="flex items-center gap-[1rem]">
              <img src={d?.avatar_url} alt={d?.login} width={50} height={50} />
              <Link href={`/users/${d?.id}`} className="text-orange-600">
                {d?.login}
              </Link>
            </div>
          </div>
        ))
      )}
      {isFetchingNextPage && <div>Loading...</div>}
    </div>
  );
};

export default Users;
