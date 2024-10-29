"use client";
import {DataTableDemo} from "./tableUser";
import NewUsers from "./newUser";
import {GetAllUsers} from "@/apis/user";
import {useCombinedData} from "@/hooks";

export type IfetchDataTable = {
    dataUsers: any;
    err: any;
    isLoading: any;
};

export default function Users() {
    const getAllUsers = async () => {
        const res = await GetAllUsers();
        return res;
    };

    const fetchTableData = useCombinedData("dataAllUserss", getAllUsers);
    const {
        data: dataAllUsers,
        error: Errdata,
        isLoading: isLoadingAllUsers,
        refetch,
    } = fetchTableData;
    const handleRefetch = async () => {
        await refetch(); // Ignore the returned value
    };
    return (
        <div className="container w-full">
            <div className="mb-3 flex justify-between">
                <h3 className="cactus-classical-serif-md text-[25px] ">Người dùng</h3>
                <NewUsers
                    fetchTableData={{
                        data: dataAllUsers,
                        error: Errdata,
                        isLoading: isLoadingAllUsers,
                        refetch: handleRefetch,
                    }}
                />
            </div>
            <div>
                <DataTableDemo
                    fetchTableData={{
                        data: dataAllUsers,
                        error: Errdata,
                        isLoading: isLoadingAllUsers,
                        refetch: handleRefetch,
                    }}
                />
            </div>
        </div>
    );
}
