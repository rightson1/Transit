import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import InputBase from "@mui/material/InputBase";
import Typography from "@mui/material/Typography";
import Fab from "@mui/material/Fab";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Chip from "@mui/material/Chip";

import React, { useState } from "react";
import Title from "../../../components/Title";
import { useGlobalProvider } from "../../../utils/themeContext";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useRouter } from "next/router";
import { useReal } from "../../../utils/realContext";

const Today = () => {

    const { colors, mode } = useGlobalProvider()
    const router = useRouter();
    const [rowId, setRowId] = useState()
    const { orders } = useReal();
    const columns = [
        { field: 'id', headerName: "ID", width: 20, },
        { field: 'name', headerName: "Name", width: 150, sortable: false, cellClassName: "name-column--cell", },
        { field: 'sales', headerName: "No. Sales Today", width: 100, cellClassName: "name-column--cell", },
        { field: 'total', headerName: "Total Amount ", width: 100, cellClassName: "name-column--cell", },
        {
            field: 'perfomance', headerName: "Perfomance", width: 100, renderCell: (params) => <Chip
                sx={{
                    pl: "4px",
                    pr: "4px",
                    backgroundColor: params.value == 'good' ? colors.redAccent[500] : params.value == 'medium' ? colors.greenAccent[300] : colors.blueAccent[300],
                    color: "#fff",
                }}
                size="small"
                label={params.value}
            ></Chip>, editable: 'Available', type: "singleSelect", valueOptions: ["Available", "Not Available"]
        },
        { field: 'view', headerName: 'View', sortable: false, width: 100, renderCell: (params) => <View {...{ params, rowId, setRowId }} /> },

    ]
    const View = () => {
        return <Button
            onClick={() => router.push('/admin/order/1223')}
            sx={{
                bgcolor: colors.teal[300] + '!important',
                padding: '2px !important'
            }}>View</Button>
    }

    return (
        <Box >
            <Title title="Daily" subtitle="Daily Sales" />

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
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: colors.blueAccent[700],
                        bgcolor: colors.primary[600],
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: colors.primary[400],
                        bgcolor: 'transparent',

                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        backgroundColor: colors.blueAccent[700],
                        bgcolor: colors.primary[600],

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
                    // loading={isLoading || !data}
                    disableSelectionOnClick

                    sx={{
                        '@media print': {
                            '.MuiDataGrid-main': { color: 'rgba(0, 0, 0, 0.87)' },
                        },
                    }}
                    // rows={data || []}
                    rows={products}

                    components={{
                        Toolbar: GridToolbar,
                    }}
                />

            </Box>




        </Box>

    );
};


const products = [{
    "id": 1,
    "name": "pizza",
    "sales": 10,
    "total": 576,
    "perfomance": "bad"
}, {
    "id": 2,
    "name": "chicken",
    "sales": 10,
    "total": 553,
    "perfomance": "medium"
}, {
    "id": 3,
    "name": "Hamburger",
    "sales": 15,
    "total": 112,
    "perfomance": "good"
}, {
    "id": 4,
    "name": "Kebab",
    "sales": 2,
    "total": 994,
    "perfomance": "good"
}, {
    "id": 5,
    "name": "French Fries",
    "sales": 6,
    "total": 41,
    "perfomance": "medium"
}, {
    "id": 6,
    "name": "Cheeseburger",
    "sales": 1,
    "total": 261,
    "perfomance": "good"
}, {
    "id": 7,
    "name": "Sandwich",
    "sales": 10,
    "total": 676,
    "perfomance": "good"
}, {
    "id": 8,
    "name": "Milkshake",
    "sales": 13,
    "total": 827,
    "perfomance": "medium"
}, {
    "id": 9,
    "name": "Muffin",
    "sales": 11,
    "total": 396,
    "perfomance": "bad"
}, {
    "id": 10,
    "name": "Burrito",
    "sales": 4,
    "total": 855,
    "perfomance": "medium"
}, {
    "id": 11,
    "name": "Taco",
    "sales": 7,
    "total": 355,
    "perfomance": "good"
}, {
    "id": 12,
    "name": "Hot dog",
    "sales": 11,
    "total": 979,
    "perfomance": "medium"
}]

export default Today;
