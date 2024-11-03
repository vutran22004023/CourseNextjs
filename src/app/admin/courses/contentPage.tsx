"use client";
import { DataTableDemo } from "./tablecourse";
import NewCourses from "./newCourses";
import { GetAllCourses } from "@/apis/course";
import { useCombinedData } from "@/hooks";
import Text from "@/components/Text/text";

export type IfetchDataTable = {
    dataCourses: any;
    err: any;
    isLoading: any;
};

export default function courses() {
    const getAllCourses = async () => {
        const search = "";
        const res = await GetAllCourses(search);
        return res;
    };
    const fetchTableData = useCombinedData("dataAllCoursess", getAllCourses);
    const {
        data: dataAllCourses,
        error: Errdata,
        isLoading: isLoadingAllCourses,
        refetch,
    } = fetchTableData;
    const handleRefetch = async () => {
        await refetch(); // Ignore the returned value
    };

    return (
        <div className="container w-full">
            <div className="mt-2 flex justify-between">
                <Text type="header">Khóa học</Text>
                <NewCourses
                    fetchTableData={{
                        data: dataAllCourses,
                        error: Errdata,
                        isLoading: isLoadingAllCourses,
                        refetch: handleRefetch,
                    }}
                />
            </div>
            <div>
                <DataTableDemo
                    fetchTableData={{
                        data: dataAllCourses,
                        error: Errdata,
                        isLoading: isLoadingAllCourses,
                        refetch: handleRefetch,
                    }}
                />
            </div>
        </div>
    );
}
