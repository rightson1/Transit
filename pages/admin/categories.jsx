import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Fab from "@mui/material/Fab";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Chip from "@mui/material/Chip";
import React, { useState } from "react";
import Title from "../../components/Title";
import { useGlobalProvider } from "../../utils/themeContext";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Save from "@mui/icons-material/Save";
import Delete from "@mui/icons-material/Delete";
import { useRouter } from "next/router";
import { useCategoryDelete, useCategoryQuery, useCategoryUpdate } from "../../utils/hooks/useBusiness";
import { useItemQuery } from "../../utils/hooks/useItems";
import { useAuth } from "../../utils/authContext";
import CircularProgress from "@mui/material/CircularProgress";
import { Toaster, toast } from "react-hot-toast";
import { useEffect } from "react";
const ProductPerfomance = () => {
    const { colors, mode } = useGlobalProvider()
    const { data, isLoading } = useCategoryQuery()
    const { mutate, isLoading: loading, error, isSuccess, isError } = useCategoryUpdate();
    const { mutate: deleteCat, isLoading: deleting, isSuccess: deleted, isError: deleteError } = useCategoryDelete()
    const { data: items } = useItemQuery()
    const router = useRouter();
    const [rowId, setRowId] = useState()
    const [row, setRow] = useState()

    useEffect(() => {
        if (deleteError) toast.error('Error while deleting...', { duration: 1000 })
        if (isSuccess) toast.success('Category updated successfully')
        if (deleteError) toast.error('Error while deleting...', { duration: 1000 })
        if (deleted) toast.success('Category deleted successfully')
    }, [isError, isSuccess, deleteError, deleted])

    const columns = [
        { field: 'id', headerName: "ID", width: 20, },
        { field: 'name', headerName: "Name", width: 100, sortable: false, cellClassName: "name-column--cell", },
        {
            field: 'qty', headerName: "No. Item Types", width: 100, cellClassName: "name-column--cell", renderCell: ({ row: { name } }) => {
                return <Typography>{items?.filter(item => item.category == name).length}</Typography>
            }
        },
        {
            field: 'available', headerName: "Status", width: 100, renderCell: (params) => <Chip
                sx={{
                    pl: "4px",
                    pr: "4px",
                    backgroundColor: params.value ? colors.greenAccent[400] : colors.redAccent[300],
                    color: "#fff",
                    cursor: "pointer",
                }}
                size="small"
                label={params.value ? 'Available' : 'Not Available'}
            ></Chip>, editable: 'Available', type: "singleSelect", valueOptions: ["available", "notvailable"]
        },
        { field: 'delete', headerName: 'delete', type: 'actions', sortable: false, renderCell: (params) => <UserActions {...{ params, rowId, setRowId, deleteButton: true }} /> }
        , { field: 'Edit', headerName: 'Edit', type: 'actions', sortable: false, renderCell: (params) => <View {...{ params, rowId, setRowId, deleteButton: true }} /> }
        ,
        { field: 'actions', headerName: 'actions', type: 'actions', sortable: false, renderCell: (params) => <UserActions {...{ params, rowId, setRowId }} /> }

    ]
    const View = ({ params: { row } }) => {

        return <Button

            onClick={() => router.push(`/admin/category/${row._id}`)}
            sx={{
                bgcolor: colors.teal[300] + '!important',
                padding: '2px !important'
            }}>View</Button>
    }
    const UserActions = ({ params, rowId, setRowId, deleteButton }) => {

        const handleSubmit = () => {

            mutate({ id: params.id, status: params.row.status })
        }
        const handleDelete = () => {

            deleteCat(params.id)
        }
        return <Box
            className="cursor-pointer"


            sx={{
                m: 1,
                position: 'relative',

            }}
        >
            {
                deleteButton ? (<>
                    {loading && rowId == params.id ? (<Fab
                        color="primary"
                        sx={{
                            width: 40,
                            height: 40,
                            bgcolor: colors.greenAccent[400],

                        }}
                    > <CircularProgress />
                    </Fab>) : (
                        <IconButton onClick={() => {
                            handleDelete()
                            setRowId(params.id)
                        }}>
                            <Fab
                                color="primary"

                                sx={{
                                    width: 40,
                                    height: 40,
                                    bgcolor: colors.greenAccent[400],

                                }}

                            >
                                <Delete />
                            </Fab>
                        </IconButton>
                    )}
                </>) : <>{
                    loading && rowId === params.id ? (<Fab
                        color="primary"

                        sx={{
                            width: 40,
                            height: 40,
                            bgcolor: colors.greenAccent[400],

                        }}
                    > <CircularProgress />
                    </Fab>) : (
                        <IconButton onClick={() => {
                            handleSubmit()
                            setRowId(params.id)
                        }}>
                            <Fab
                                color="primary"

                                sx={{
                                    width: 40,
                                    height: 40,
                                    bgcolor: colors.greenAccent[400],

                                }}
                            >
                                <Save />
                            </Fab>
                        </IconButton>
                    )
                }</>
            }

        </Box>
    }
    return (
        <Box >
            <Title title="Categories" subtitle="Category Table" />

            <Box

                height="75vh"


                sx={{
                    bgcolor: colors.primary[800],
                    mx: {
                        xs: '5px',
                        sm: '10px',
                        md: '20px',
                    },
                    "& .MuiDataGrid-root": {
                        border: "none",
                        // minWidth: "100%"
                        width: "auto",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                    },
                    "& .name-column--cell": {
                        color: colors.greenAccent[300],
                    },
                    "& .MuiDataGrid-toolbarContainer": {

                        bgcolor: mode === 'dark' ? undefined : '#fcfcfc',
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-columnHeaders": {

                        bgcolor: mode === 'dark' ? colors.primary[600] : colors.primary[400],
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: colors.primary[400],
                        bgcolor: mode === 'dark' ? 'transparent' : '#fcfcfc',


                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        bgcolor: mode === 'dark' ? colors.primary[600] : colors.primary[400],

                    },
                    "& .MuiCheckbox-root": {
                        color: `${colors.greenAccent[200]} !important`,
                    },
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                        color: ` ${colors.grey[100]} !important`,
                    }
                }
                }
            >
                <DataGrid checkboxSelection columns={columns}
                    loading={isLoading || !data}
                    disableSelectionOnClick

                    sx={{
                        '@media print': {
                            '.MuiDataGrid-main': { color: 'rgba(0, 0, 0, 0.87)' },
                        },
                    }}
                    rows={data || []}
                    getRowId={(row) => row._id}

                    components={{
                        Toolbar: GridToolbar,
                    }}
                />

            </Box>


            <Toaster />
        </Box>

    );
};



export default ProductPerfomance;
