import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Fab from "@mui/material/Fab";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import React, { useState } from "react";
import Title from "../../components/Title";
import { useGlobalProvider } from "../../utils/themeContext";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Save from "@mui/icons-material/Save";
import Delete from "@mui/icons-material/Delete";
import Check from "@mui/icons-material/Check";
import { useRouter } from "next/router";
import { format } from "timeago.js";
import { useReal } from "../../utils/realContext";


const Category = () => {
    const { colors, mode } = useGlobalProvider()
    const { orders, loadingOrders } = useReal();

    const router = useRouter();
    const [rowId, setRowId] = useState()
    const columns = [
        { field: 'name', headerName: "Cutomer", width: 100, },
        { field: 'total', headerName: "Price", width: 100 },
        { field: 'status', headerName: "Status", width: 100, renderCell: (params) => <Typography variant="body2" sx={{ color: params.value === "Delivered" ? "green" : "red", bgcolor: params.value == 'Delivered' ? 'rgba(124,252,0,.1)' : 'rgba(255,0,0,.1)', fontSize: '13px', borderRadius: '3px', py: '3px', px: '5px', cursor: 'pointer' }}> {params.value}</Typography>, editable: true, type: "singleSelect", valueOptions: ["Pending", "Delivered"] },
        { field: 'payment', headerName: 'Payment', width: 100, editable: true, type: 'singleSelect', valueOptions: ['Paid', 'Pending'], renderCell: (params) => <Typography variant="body2" sx={{ color: params.value === 'Paid' ? "green" : "red", bgcolor: params.value == 'Paid' ? 'rgba(124,252,0,.1)' : 'rgba(255,0,0,.1)', fontSize: '13px', borderRadius: '3px', py: '3px', px: '5px', }}>{params.value}</Typography>, },
        { field: 'createdAt', headerName: 'CreatedAt', width: 100, renderCell: (params) => <Typography variant="body2">{format(params.value)}</Typography>, },
        { field: 'phone', headerName: 'Tel', width: 100, renderCell: (params) => <Typography variant="body2">{params.value}</Typography>, },
        { field: 'view', headerName: 'View', sortable: false, width: 100, renderCell: (params) => <View {...{ params, rowId, setRowId }} /> },
        // { field: 'Custom', headerName: 'custom', renderCell: (params) => <Typography variant="body2">{params.value ? 'Sale' : 'Online'}</Typography> },
    ]
    const UserActions = ({ params, rowId, setRowId }) => {
        const [loading, setLoading] = useState();
        const [sucess, setSucess] = useState();
        const { colors } = useGlobalProvider()
        const handleSubmit = () => {
            console.log(params.row)
        }
        return <Box
            sx={{
                m: 1,
                position: 'relative',

            }}
        >
            {
                sucess ? (<Fab
                    color="primary"
                    disabled={params.id !== rowId || loading}
                    sx={{
                        width: 40,
                        height: 40,
                        bgcolor: colors.greenAccent[400],

                    }}
                ><Check /></Fab>) : (<Fab
                    color="primary"
                    onClick={handleSubmit}
                    sx={{
                        width: 40,
                        height: 40,
                        bgcolor: colors.greenAccent[400],

                    }}
                    disabled={params.id !== rowId || loading}
                >
                    <Save />
                </Fab>)
            }

        </Box>
    }
    const View = ({ params }) => {
        return <Button
            onClick={() => router.push(`/admin/order/${params.row._id}`)}
            sx={{
                bgcolor: colors.teal[300] + '!important',
                padding: '2px !important'
            }}>View</Button>
    }
    return <Box>
        <Title title="Order" subtitle="Latest Orders" />
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
                loading={!orders}
                disableSelectionOnClick
                getRowId={(row) => row._id}

                sx={{
                    '@media print': {
                        '.MuiDataGrid-main': { color: 'rgba(0, 0, 0, 0.87)' },
                    },
                }}
                rows={orders || []}


                components={{
                    Toolbar: GridToolbar,
                }}
            />

        </Box>

    </Box >;
};

export default Category;
