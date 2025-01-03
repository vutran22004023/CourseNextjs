"use client";
import { useEffect, useState } from "react";
import CardBlogComponent from "@/components/Card/CardBlog";
import blogimg from "@/assets/Images/image 10.png"; //ảnh mẫu
import logouser from "@/assets/Images/logouser.png"; //logouser mẫu
import { useDispatch } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import { GetAllBlogs } from "@/apis/blog";
import { Search as Search1, EllipsisVertical } from "lucide-react";
import { Search } from "@/redux/Slides/searchSide";
import {useTranslation} from "react-i18next";

export default function Blog() {
  const {t} = useTranslation('common');
  const [blogs, setBlogs] = useState<any>([]);
  console.log(blogs);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Search({ search }));
  }, [search]);

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
    <div className=" m-0 pt-[70px] px-[50px] w-full grid grid-cols-3">
      <div className="col-span-2 pr-[10px]">
        <div className="flex h-[40px] mb-[30px]">
          <div className="font-semibold w-full flex text-[24px]">
            <div className="w-[120px] flex justify-center">{t('pagesBlog.New')}</div>
            <div className="w-[120px] flex justify-center">{t('pagesBlog.AllPost')}</div>
            <div className="w-[120px] flex justify-center">Html/Css</div>
            <div className="w-[120px] flex justify-center">Javascript</div>
            <div className="w-[120px] flex justify-center">Reactjs</div>
            <div className="w-[120px] flex justify-center">Database</div>
          </div>
          <div className="sm:flex items-center ms:mx-0 hidden w-[200px] py-1 pl-1 pr-1 relative text-[#444] rounded-full border-2 border-[#E8E8E8] focus-within:border-black transition-colors duration-300">
            <input
              type="text"
              placeholder="Search"
              className="flex-grow rounded-xl w-[150px] focus:outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                padding: "2px",
                paddingLeft: "8px",
              }}
            />
            <div className=" bg-[#FF5A00] right-4 rounded-full w-8 h-8 flex items-center justify-center">
              <Search1 className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
        <div className="grid grid-rows-4 relative">
          {blogs?.map((blog: any) => (
            <Link
              href={`/blog/${blog.slug}`}
              key={blog.slug}
              className="grid grid-cols-10 h-[180px] w-full mb-3 rounded-[20px] border-[2px] p-[10px] relative"
            >
              <Image
                src={blog.image}
                alt="blogimg"
                width={230}
                height={300}
                className="w-[230px] h-[156.8px] mr-[20px] col-span-3"
                style={{ borderRadius: "15px" }}
              />
              <div className="col-span-7">
                <div className="flex items-center ">
                  <Image
                    src={blog.image}
                    width={600}
                    height={300}
                    alt="logouser"
                    className="w-[40px] h-[40px] mr-[10px] rounded-full"
                  />
                  <div>
                    <p>{blog.author}</p>
                    <p className="leading-4 opacity-60">{blog.date}</p>
                  </div>
                </div>
                <p className="font-medium text-[20px]">{blog.title}</p>
                
              </div>
              <div className="absolute right-2 top-3">
                <EllipsisVertical />
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="pl-[30px]">
        <div className="text-[32px] font-semibold h-[40px] flex items-center mb-[30px]">
          {t('pagesBlog.FeaturedArticles')}
        </div>
        <div className="border-[2px] p-2 rounded-[20px]">
          {blogs?.map((blog:any) => (
            <Link
            href={`/blog/${blog.slug}`}
            key={blog.slug}
            className="grid grid-cols-3 h-[120px] w-full rounded-[15px] border-[2px] p-[5px] mb-2"
          >
            <Image
                src={blog.image}
                width={600}
                height={300}
              alt="blogimg"
              className="w-[160px] h-[106.8px] mr-[10px] col-span-1"
              style={{ borderRadius: "15px" }}
            />
            <div className="relative col-span-2 pl-3 h-[106.8px]">
              <p className="font-medium text-[18px] pr-2 leading-[18px]">
                {blog.title}
              </p>
              <div className="flex items-center absolute bottom-1">
                <Image
                    src={blog.image}
                    width={600}
                    height={300}
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

      {/* <div className="w-full flex">
        <div className="">
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
      </div> */}
    </div>
  );
}
