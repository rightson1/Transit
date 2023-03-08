
import Typography from "@mui/material/Typography";
import Fab from "@mui/material/Fab";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import React, { useState } from "react";
import { useGlobalProvider } from "../utils/themeContext";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

import { useRouter } from "next/router";
import { useReal } from "../utils/realContext";


const Category = () => {
    const { colors, mode } = useGlobalProvider()
    const { orders: data, fetch } = useReal();
    const [page, setPage] = useState(5)
    const router = useRouter();
    const [rowId, setRowId] = useState()
    const columns = [
        { field: 'name', headerName: "Cutomer", width: 100, },
        {
            field: 'total', headerName: "Total", width: 100,
        },
        { field: 'status', headerName: "Status", width: 100, renderCell: (params) => <Typography variant="body2" sx={{ color: params.value === "Delivered" ? "green" : "red", bgcolor: params.value == 'Delivered' ? 'rgba(124,252,0,.1)' : 'rgba(255,0,0,.1)', fontSize: '13px', borderRadius: '3px', py: '3px', px: '5px', cursor: 'pointer' }}> {params.value}</Typography>, editable: true, type: "singleSelect", valueOptions: ["Pending", "Accepted", "Delivered"] },
        { field: 'view', headerName: 'View', sortable: false, width: 90, renderCell: (params) => <View {...{ params, rowId, setRowId }} /> },
    ]

    const View = ({ params }) => {
        return <Button
            onClick={() => router.push(`/admin/order/${params.row._id}`)}
            sx={{
                bgcolor: colors.teal[500] + '!important',
                padding: '2px !important'
            }}>View</Button>
    }
    return <Grid xs={12} sm={12} md={6}

        sx={{

            minHeight: {
                xs: '50vh',
                sm: '50vh',
                md: '60vh'
            },
            bgcolor: colors.primary[mode === "dark" ? 600 : 900] + "!important",
            borderRadius: '5px',

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
            "& .MuiDataGrid-columnHeaders": {
                // backgroundColor: colors.blueAccent[700],
                bgcolor: 'transparent',
                borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
                // backgroundColor: colors.primary[400],
                bgcolor: 'transparent',

            },
            "& .MuiDataGrid-footerContainer": {
                borderTop: "none",
                backgroundColor: colors.blueAccent[700],
                bgcolor: 'transparent',
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
            loading={!data}
            pageSize={page}
            onPageSizeChange={(newPageSize) => setPage(newPageSize)}
            rowsPerPageOptions={[5, 10, 20]}
            getRowId={(row) => row._id}
            pagination
            disableSelectionOnClick
            sx={{
                '@media print': {
                    '.MuiDataGrid-main': { color: 'rgba(0, 0, 0, 0.87)' },
                },
            }}
            rows={[]}
        // rows={data.filter((item) => item.status !== "Delivered" || item.status == "Cancelled") || []}


        />

    </Grid>
};

export default Category;
