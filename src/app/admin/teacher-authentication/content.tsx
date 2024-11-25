'use client'
import React from 'react';
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {User} from "@/types";
import {Checkbox} from "@/components/ui/checkbox";
import {Button} from "@/components/ui/button";
import {CaretSortIcon, ChevronDownIcon, DotsHorizontalIcon} from "@radix-ui/react-icons";
import {
    DropdownMenu, DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {getApplicantsStatus} from '@/apis/user'
import {useQuery} from "@tanstack/react-query";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {approveTeacher} from '@/apis/user';
import {useMutationHook} from '@/hooks/index'


export type UserTable = Omit<User, "confirmPassword" | "password"> & {
    _id: string;
};

export const columns: ColumnDef<UserTable>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <></>
            // <Checkbox
            //     checked={
            //         table.getIsAllPageRowsSelected() ||
            //         (table.getIsSomePageRowsSelected() && "indeterminate")
            //     }
            //     onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            //     aria-label="Select all"
            // />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "avatar",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Avatar
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => (
            <div className="capitalize items-center">
            <Avatar>
                <AvatarImage src={row.getValue("avatar")} />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            </div>
        ),
    },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Họ và tên đầy đủ
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => (
                <div className="capitalize ">{row.getValue("name")}</div>
        ),
    },
    {
        accessorFn: (row) => row.teacherInfo?.qualifications,
        id: "qualifications",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Trình độ
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => <div className="capitalize">{row.getValue("qualifications") || "N/A"}</div>
    },
    {
        accessorFn: (row) => row.teacherInfo?.experienceYears,
        id: "experienceYears",
        header: ({column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Kinh nghiệm
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => <div className="capitalize">{row.getValue("experienceYears")}</div>
    },
    {
        accessorFn: (row) => row.teacherInfo?.subjects,
        id: "subjects",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Môn học
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => <div className="capitalize">{row.getValue("subjects")}</div>
    },
    {
        id: "actions",
        header: "Actions",
        enableHiding: false,
        cell: ({ row }) => {
            const user = row.original;
            const [isOpenUpdate, setIsOpenUpdate] = React.useState(false);
            const [isOpenDelete, setIsOpenDelete] = React.useState(false);
            const [dataDetailUsers, setDataDeatilUsers] = React.useState("");
            const [idDeleteUsers, setIdDeleteUsers] = React.useState("");

            const mutation = useMutationHook(async ({ id, approvalStatus }: { id: any, approvalStatus: any }) => {
                try {
                    const res = await approveTeacher(id, approvalStatus);
                    return res;
                } catch (e) {
                    console.log(e);
                }
            });

            const handleConfirm = async () => {
                mutation.mutate({ id: user._id, approvalStatus: 'approved' });
            };

            const handleRefuse = async () => {
                mutation.mutate({ id: user._id, approvalStatus: 'not_qualified' });
            }


            return (
                <div className="flex items-center space-x-2">
                    <Button
                        variant="ghost"
                        onClick={handleConfirm}
                    >
                        Xác nhận
                    </Button>
                    <Button
                        onClick={handleRefuse}
                    >
                        Hủy
                    </Button>
                </div>
            );
        },
    },
];
const Content = () => {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    );
    const [selectedStatus, setSelectedStatus] = React.useState<string | undefined>('pending')
    const {
        isPending,
        error,
        data: dataStatus
    } = useQuery({
        queryKey: ["selectedStatus", { status: selectedStatus }],
        queryFn: async ({ queryKey }) => {
            const [, params] = queryKey as [string, { status: string } | undefined];
            if (params?.status) {
                return await getApplicantsStatus(params.status);
            }
            return [];
        },
        refetchInterval: 10000,
        enabled: !!selectedStatus
    });

    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});

    const table = useReactTable({
        data: dataStatus?.teacherApplicants,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });
    return (
        <div className="w-full">
            <div className="flex items-center py-4">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Columns <ChevronDownIcon className="ml-2 h-4 w-4"/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-[#e9e9e9]">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                );
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {!isPending && table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    ...Loading
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {/*{table.getFilteredSelectedRowModel().rows.length} of{" "}*/}
                    {/*{table.getFilteredRowModel().rows.length} row(s) selected.*/}
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        // disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Content;