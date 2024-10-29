"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle } from "lucide-react";
import { GetDetailBlog } from "@/apis/blog";
import Text from "@/components/Text/text";

interface BlogDetail {
  _id: string;
  author: string;
  title: string;
  content: string;
  date: string;
  likes: number;
  comments: number;
}

export default function BlogDetailPage() {
  const { slug } = useParams();
  const [blog, setBlog] = useState<BlogDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBlogDetail() {
      if (slug) {
        try {
          const response = await GetDetailBlog(slug as string);
          setBlog(response.data); // Access the `data` object here
        } catch (error) {
          setError("Failed to fetch blog detail");
          console.error("Failed to fetch blog detail:", error);
        } finally {
          setLoading(false);
        }
      }
    }

    fetchBlogDetail();
  }, [slug]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <div className="container w-full">
      <div className="flex justify-between">
        <div className="flex-1 p-3">
          <Text className="mb-3">{blog.author}</Text>
          <hr />
          <div className="flex mt-4">
            <div className="flex mr-10">
              <Heart /> <span className="ml-2">{blog.likes}</span>
            </div>
            <div className="flex">
              <MessageCircle /> <span className="ml-2">{blog.comments}</span>
            </div>
          </div>
        </div>
        <div className="w-[800px]">
          <Text type="header" className="mb-5">
            {blog.title}
          </Text>
          <div className="flex mb-5">
            <div className="flex">
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt={blog.author}
                />
                <AvatarFallback>
                  {blog.author ? blog.author[0] : "A"}
                </AvatarFallback>
              </Avatar>
              <div className="ml-2">
                <Text className="cactus-classical-serif-md">{blog.author}</Text>
                <Text className="text-[14px]">{blog.date} · 2 phút đọc</Text>
              </div>
            </div>
          </div>

          <Text className="mb-[30px]">{blog.content}</Text>

          <div className="flex mb-10">
            <div className="flex mr-10">
              <Heart /> <span className="ml-2">{blog.likes}</span>
            </div>
            <div className="flex">
              <MessageCircle /> <span className="ml-2">{blog.comments}</span>
            </div>
          </div>

          <hr className="bg-[red] h-1 mb-10" />

          <div>
            <Text type="header" className=" mb-5">
              Bài viết nổi bật khác
            </Text>
          </div>
        </div>
        <div className="flex-1"></div>
      </div>
    </div>
  );
}
