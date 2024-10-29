"use client";
import { DataTableBlog } from "./tableBlog";
import NewBlogs from "./newBlog";
import { GetAllBlogs } from "@/apis/blog";
import { useCombinedData } from "@/hooks";
import { QueryObserverResult, RefetchOptions } from "@tanstack/query-core";

export type FetchTableData = {
  data: any;
  error: any;
  isLoading: boolean;
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<unknown, Error>>;
};

export default function BlogsPage() {
  // Đổi tên hàm thành BlogsPage
  const getAllBlogs = async () => {
    const search = "";
    const res = await GetAllBlogs(search); // Đổi thành GetAllBlogs
    return res;
  };

  const fetchTableData = useCombinedData("dataAllBlogs", getAllBlogs); // Đổi thành dataAllBlogs và getAllBlogs
  const {
    data: dataAllBlogs,
    error: Errdata,
    isLoading: isLoadingAllBlogs,
    refetch,
  } = fetchTableData; // Đổi thành Blogs
  const handleRefetch = async () => {
    await refetch(); // Ignore the returned value
  };

  return (
    <div className="container w-full">
      <div className="mb-3 flex justify-between">
        <h3 className="cactus-classical-serif-md text-[25px] ">Bài viết</h3>{" "}
        {/* Đổi thành Bài viết */}
        <NewBlogs
          fetchTableData={{
            data: dataAllBlogs,
            error: Errdata,
            isLoading: isLoadingAllBlogs,
            refetch: handleRefetch,
          }}
        />{" "}
        {/* Đổi thành NewBlogs */}
      </div>
      <div>
        <DataTableBlog
          fetchTableData={{
            data: dataAllBlogs,
            error: Errdata,
            isLoading: isLoadingAllBlogs,
            refetch: handleRefetch,
          }}
        />{" "}
        {/* Đổi thành DataTableBlog */}
      </div>
    </div>
  );
}
