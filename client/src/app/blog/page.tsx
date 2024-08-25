"use client";
import { useEffect, useState } from "react";
import CardBlogComponent from "@/components/Card/CardBlog";
import Anh1 from "@/assets/Images/hinh-dep.jpg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import Image from "next/image";
import { GetAllBlog } from "@/apis/blog";
import Text from "@/components/Text/text";

interface Blog {
  _id: string;
  author: string;
  title: string;
  content: string;
  date: string;
  slug: string;
}

export default function Blog() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const response = await GetAllBlog();
        console.log("Fetched response:", response); // Log toàn bộ phản hồi từ API

        if (response.status === 200 && Array.isArray(response.data)) {
          setBlogs(response.data);
        } else {
          setError("Unexpected response format");
          console.error("Unexpected response format:", response); // Log để kiểm tra định dạng
        }
      } catch (error) {
        setError("Failed to fetch blogs");
        console.error("Failed to fetch blogs:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mt-8 w-full">
      <Text type="header" className="mb-1">
        Bài viết nổi bật
      </Text>
      <Text className="mb-7">
        Tổng hợp các bài viết chia sẻ về kinh nghiệm tự học lập trình online và
        các kỹ thuật lập trình web.
      </Text>

      <div className="w-full flex">
        <div className="w-[60%]">
          {blogs.map((blog) => (
            <Link href={`/blog/${blog.slug}`} key={blog._id}>
              <CardBlogComponent>
                <div className="flex items-center mb-3">
                  <Avatar className="w-[40px] h-[40px] mr-2">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt={blog.author}
                    />
                    <AvatarFallback>{blog.author[0]}</AvatarFallback>
                  </Avatar>
                  <div className="text-[14px]">{blog.author}</div>
                </div>
                <div className="flex">
                  <div className="w-[70%] p-3">
                    <div className="cactus-classical-serif-md text-[20px]">
                      {blog.title}
                    </div>
                    <div className="text-[14px] mb-1">
                      {blog.content.slice(0, 100)}...
                    </div>
                    <div className="text-[12px]">{blog.date} - 2 phút đọc</div>
                  </div>
                  <div className="p-3">
                    <Image
                      src={Anh1}
                      alt="Blog image"
                      className="w-[200px] h-[100px] object-cover"
                      style={{ borderRadius: "20px" }}
                    />
                  </div>
                </div>
              </CardBlogComponent>
            </Link>
          ))}
        </div>
        <div className="flex-1 p-5">
          <div className="text-[14px] mb-3">CÁC CHỦ ĐỀ ĐƯỢC ĐỀ XUẤT</div>
          <div className="grid gap-2 grid-cols-3">
            <div
              className="bg-[#f2f2f2] text-[14px]"
              style={{
                padding: "6px 16px",
                borderRadius: "30px",
                fontWeight: "500",
              }}
            >
              Front end/ Mobile apps
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
