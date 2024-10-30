"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Heart, MessageCircle } from "lucide-react";
import { GetDetailBlogs, GetAllBlogs } from "@/apis/blog";
import logouser from "@/assets/Images/logouser.png";
import blogimg from "@/assets/Images/image 10.png";
import Text from "@/components/Text/text";
import Image from "next/image";
import Link from "next/link";

export default function BlogDetailPage() {
  const { slug } = useParams();
  const [blogs, setBlogs] = useState<any>([]);
  const [blog, setBlog] = useState<any>(null); // Initialize as null
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBlogDetail() {
      try {
        const data = await GetDetailBlogs(slug as string);
        console.log(data);
        setBlog(data.data); // Ensure `data.blog` is an object
      } catch (error) {
        setError("Failed to fetch blog detail");
        console.error("Failed to fetch blog detail:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBlogDetail();
  }, [slug]);

  //list blogs
  useEffect(() => {
    async function fetchBlogs() {
      try {
        const data = await GetAllBlogs(""); // Fetch blogs with empty search
        console.log("Fetched blogs data:", data); // Debug: Log the response
        setBlogs(data.data);
      } catch (error) {
        setError("Failed to fetch blogs");
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, []);

  return (
    <div className="w-full flex p-[50px]">
      <div className="col-span-2 pr-[10px] mr-[65px]">
        <div className="border-b-[2px] h-[70px]">
          <div className="text-[18px] font-semibold">{blog?.author}</div>
          <div className="opacity-70">{blog?.title}</div>
        </div>
        <div className="flex gap-5 pt-5">
          <div className="flex gap-2">
            <MessageCircle /> {blog?.comments}
          </div>
          <div className="flex gap-2">
            <Heart /> {blog?.likes}
          </div>
        </div>
      </div>

      <div className="w-[55%] pr-[30px]">
        <div className="text-[32px] font-semibold h-[40px] flex items-center mb-[30px]">
          {blog?.title}
        </div>
        <div>
          <div className="flex mb-[30px]">
            <Image
              src={logouser}
              alt="logouser"
              className="w-[55px] h-[55px] mr-[10px] rounded-full"
            ></Image>
            <div>
              <div>{blog?.author}</div>
              <div>{blog?.date}</div>
            </div>
          </div>
          <div>{blog?.content}</div>
        </div>
      </div>

      <div className="pl-[30px]">
        <div className="text-[32px] font-semibold h-[40px] flex items-center mb-[30px]">
          Các bài viết nổi bật
        </div>
        <div className="border-[2px] p-2 rounded-[20px]">
          {blogs?.map((blog:any) => (
            <Link
            href={`/blog/${blog.slug}`}
            key={blog.slug}
            className="flex h-[120px] w-full rounded-[15px] border-[2px] p-[5px] mb-2"
          >
            <Image
              src={blogimg}
              alt="blogimg"
              className="w-[160px] h-full mr-[10px]"
              style={{ borderRadius: "15px" }}
            />
            <div className="relative">
              <p className="font-medium text-[18px] pr-2 leading-[18px]">
                {blog.title}
              </p>
              <div className="flex items-center absolute bottom-1">
                <Image
                  src={logouser}
                  alt="logouser"
                  className="w-[30px] h-[30px] mr-[10px] rounded-full"
                />
                <div>
                  <p className="leading-4">{blog.author}</p>
                  <p className="leading-4 w-[160px] opacity-60 text-[14px]">
                    {blog.date}
                  </p>
                </div>
              </div>
            </div>
          </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
