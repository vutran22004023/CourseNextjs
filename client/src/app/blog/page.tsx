'use client';
import { useEffect, useState } from 'react';
import CardBlogComponent from "@/components/Card/CardBlog";
import Anh1 from "@/assets/Images/hinh-dep.jpg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from 'next/link';
import Image from "next/image";
import { GetAllBlogs } from '@/apis/blog';

interface Blog {
  id: string;
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
        const data = await GetAllBlogs("");  // Fetch blogs with empty search
        console.log("Fetched blogs data:", data);  // Debug: Log the response
        if (Array.isArray(data)) {
          setBlogs(data);  // Only set state if data is an array
        } else {
          // setError('Unexpected response format');
        }
      } catch (error) {
        setError('Failed to fetch blogs');
        console.error("Error fetching blogs:", error);
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
      <div className="cactus-classical-serif-md text-[25px] mb-1 ">
        Bài viết nổi bật
      </div>
      <div className="text-[15px] mb-7">
        Tổng hợp các bài viết chia sẻ về kinh nghiệm tự học lập trình online và
        các kỹ thuật lập trình web.
      </div>

      <div className="w-full flex">
        <div className="w-[60%]">
          {blogs.map((blog) => (
            <Link href={`/blog/blog-detail/${blog.id}`} key={blog.id}>
              <CardBlogComponent>
                <div className="flex items-center mb-3">
                  <Avatar className="w-[40px] h-[40px] mr-2">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
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
                    <div className="text-[12px]">
                      {new Date(blog.date).toLocaleDateString()} - 2 phút đọc
                    </div>
                  </div>
                  <div className="p-3">
                    <Image
                      src={Anh1}
                      alt="Anh 1"
                      className="w-[200px] h-[100px]"
                      style={{ borderRadius: "20px" }}
                    />
                  </div>
                </div>
              </CardBlogComponent>
            </Link>
          ))}
          <div></div>
        </div>
        <div className="flex-1 p-5 ">
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
              Font end/ Mobile apps
            </div>
            <div
              className="bg-[#f2f2f2] text-[14px]"
              style={{
                padding: "6px 16px",
                borderRadius: "30px",
                fontWeight: "500",
              }}
            >
              Font end/ Mobile apps
            </div>
            <div
              className="bg-[#f2f2f2] text-[14px]"
              style={{
                padding: "6px 16px",
                borderRadius: "30px",
                fontWeight: "500",
              }}
            >
              Font end/ Mobile apps
            </div>
            <div
              className="bg-[#f2f2f2] text-[14px]"
              style={{
                padding: "6px 16px",
                borderRadius: "30px",
                fontWeight: "500",
              }}
            >
              Font end/ Mobile apps
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
