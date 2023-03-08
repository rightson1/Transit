import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Fab from "@mui/material/Fab";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import React, { useState } from "react";
import Title from "../../../components/Title";
import { useGlobalProvider } from "../../../utils/themeContext";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Save from "@mui/icons-material/Save";
import Delete from "@mui/icons-material/Delete";
import Check from "@mui/icons-material/Check";
import { useRouter } from "next/router";
import { format } from "timeago.js";
import { useReal } from "../../../utils/realContext";
import { useAuth } from "../../../utils/authContext";
import { useDeleteItem, useItemQuery } from "../../../utils/hooks/useItems";
import { CircularProgress } from "@mui/material";
import { toast, Toaster } from "react-hot-toast";


const Category = () => {
    const { colors, mode } = useGlobalProvider()
    const { orders } = useReal();
    const router = useRouter();
    const [rowId, setRowId] = useState();
    const { business } = useAuth();
    const { data, isLoading } = useItemQuery(business?._id)
    const { mutateAsync, isLoading: isMutating } = useDeleteItem(business?._id);
    const columns = [
        { field: 'name', headerName: "Name", width: 150, },
        { field: 'status', headerName: "Status", width: 100, renderCell: (params) => <Typography variant="body2" sx={{ color: params.value ? "green" : "red", bgcolor: params.value ? 'rgba(124,252,0,.1)' : 'rgba(255,0,0,.1)', fontSize: '13px', borderRadius: '3px', py: '3px', px: '5px', cursor: 'pointer' }}> {params.value ? 'Available' : 'Not Available'}</Typography>, editable: true, type: "singleSelect", valueOptions: ["Pending", "Delivered"] },

        { field: 'view', headerName: 'View', sortable: false, width: 100, renderCell: (params) => <View {...{ params, rowId, setRowId }} /> },
        { field: 'actions', headerName: 'actions', type: 'actions', sortable: false, renderCell: (params) => <UserActions {...{ params, rowId, setRowId }} /> }
    ]
    const UserActions = ({ params, rowId, setRowId }) => {

        const { colors } = useGlobalProvider()

        const handleSubmit = () => {
            toast.promise(
                mutateAsync(params.row._id),
                {
                    loading: 'Deleting...',
                    success: 'Deleted',
                    error: 'Error',
                },
            )
        }
        return <Box
            sx={{
                m: 1,
                position: 'relative',
                cursor: 'pointer',

            }}
        >
            {
                isMutating && rowId == params.row._id ? (<Fab
                    color="primary"
                    sx={{
                        width: 40,
                        height: 40,
                        bgcolor: colors.greenAccent[400],

                    }}
                >
                    <CircularProgress />
                </Fab>) : (<Fab
                    color="primary"
                    onClick={() => {
                        setRowId(params.row._id)
                        handleSubmit()
                    }}
                    sx={{
                        width: 40,
                        height: 40,
                        bgcolor: colors.greenAccent[400],

                    }}

                >
                    <Delete />
                </Fab>)
            }

        </Box>
    }
    const View = ({ params }) => {
        return <Button
            onClick={() => router.push(`/admin/products/${params.row._id}`)}
            sx={{
                bgcolor: colors.teal[300] + '!important',
                padding: '2px !important'
            }}>View</Button>
    }
    return <Box>
        <Title title="Order" subtitle="All Your Products" />
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
                loading={isLoading}
                disableSelectionOnClick
                getRowId={(row) => row._id}

                sx={{
                    '@media print': {
                        '.MuiDataGrid-main': { color: 'rgba(0, 0, 0, 0.87)' },
                    },
                }}
                rows={data || []}


                components={{
                    Toolbar: GridToolbar,
                }}
            />

        </Box>
        <Toaster />
    </Box>;
};

export default Category;
