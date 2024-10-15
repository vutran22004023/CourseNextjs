'use client'
import { DataTableBlog } from './tableBlog' // Đổi thành DataTableBlog
import ButtonComponent from '@/components/Button/Button'
import NewBlogs from './newBlog' // Đổi thành NewBlogs
import { GetAllBlogs } from "@/apis/blog" // Đổi thành GetAllBlogs
import { useCombinedData } from '@/hooks/index'

export type IfetchDataTable = {
  dataBlogs: any, // Đổi thành dataBlogs
  err: any,
  isLoading: any,
}

export default function BlogsPage() { // Đổi tên hàm thành BlogsPage
  const getAllBlogs = async() => {
    const res = await GetAllBlogs() // Đổi thành GetAllBlogs
    return res
  } 

  const fetchTableData = useCombinedData('dataAllBlogs', getAllBlogs); // Đổi thành dataAllBlogs và getAllBlogs
  const { data: dataAllBlogs, error: Errdata, isLoading: isLoadingAllBlogs, refetch } = fetchTableData // Đổi thành Blogs

  return (
    <div className='container mt-9 w-full'>
      <div className='mb-3 flex justify-between'>
        <h3 className="cactus-classical-serif-md text-[25px] ">Bài viết</h3> {/* Đổi thành Bài viết */}
        <NewBlogs fetchTableData={{ data: dataAllBlogs, error: Errdata, isLoading: isLoadingAllBlogs, refetch }} /> {/* Đổi thành NewBlogs */}
      </div>
      <div>
        <DataTableBlog fetchTableData={{ data: dataAllBlogs, error: Errdata, isLoading: isLoadingAllBlogs, refetch }} /> {/* Đổi thành DataTableBlog */}
      </div>
    </div>
  )
}
