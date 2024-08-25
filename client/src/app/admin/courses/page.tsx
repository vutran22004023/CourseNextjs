"use client";
import { DataTableDemo } from "./tablecourse";
import NewCourses from "./newCourses";
import { GetAllCourses } from "@/apis/course";
import { useCombinedData } from "@/hooks/index";
import Text from "@/components/Text/text";
export type IfetchDataTable = {
  dataCourses: any;
  err: any;
  isLoading: any;
};

export default function courses() {
  const getAllCourses = async () => {
    const res = await GetAllCourses();
    return res;
  };
  const fetchTableData = useCombinedData("dataAllCoursess", getAllCourses);
  const {
    data: dataAllCourses,
    error: Errdata,
    isLoading: isLoadingAllCourses,
    refetch,
  } = fetchTableData;
  return (
    <div className="container mt-9 w-full">
      <div className="mb-3 flex justify-between">
        <Text type="header">Khóa học</Text>
        <NewCourses
          fetchTableData={{
            data: dataAllCourses,
            error: Errdata,
            isLoading: isLoadingAllCourses,
            refetch,
          }}
        />
      </div>
      <div>
        <DataTableDemo
          fetchTableData={{
            data: dataAllCourses,
            error: Errdata,
            isLoading: isLoadingAllCourses,
            refetch,
          }}
        />
      </div>
    </div>
  );
}
