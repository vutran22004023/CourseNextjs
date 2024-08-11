'use client'
import {DataTableDemo} from './tablecourse'
import ButtonComponent from '@/components/Button/Button'
import NewCourses from './newCourses'
import { GetAllCourses } from "@/apis/course"
import {useCombinedData } from '@/hooks/index'
export type IfetchDataTable = {
  dataCourses: any,
  err: any,
  isLoading: any,
}

export default function courses() {
  const getAllCourses = async() => {
    const res = await GetAllCourses()
    return res
 } 
  const fetchTableData =useCombinedData('dataAllCoursess', getAllCourses);
  const { data: dataAllCourses, error: Errdata, isLoading: isLoadingAllCourses,refetch  } = fetchTableData
  return (
    <div className='container mt-9 w-full'>
        <div className='mb-3 flex justify-between'>
        <h3 className="cactus-classical-serif-md text-[25px] ">Khóa học</h3>
        <NewCourses fetchTableData={{ data: dataAllCourses, error: Errdata, isLoading: isLoadingAllCourses, refetch }}/>
      </div>
      <div>
        <DataTableDemo fetchTableData={{ data: dataAllCourses, error: Errdata, isLoading: isLoadingAllCourses, refetch }}/>
      </div>
    </div>
  )
}
