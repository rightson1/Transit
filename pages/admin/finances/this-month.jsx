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
import { useAuth } from "../../../utils/authContext";
import { useGetOrderAgg } from "../../../utils/hooks/useOrder";
import { useBusinessQuery } from "../../../utils/hooks/useBusiness";
const Today = () => {

    const { colors, mode } = useGlobalProvider()
    const router = useRouter();
    const { business } = useBusinessQuery()
    const [rowId, setRowId] = useState()

    const month = new Date().getMonth() + 1;
    const { data, isLoading } = useGetOrderAgg({ id: business?._id, time: 'month', month })
    const columns = [
        { field: 'id', headerName: "ID", width: 20, },
        { field: 'label', headerName: "Name", width: 150, sortable: false, cellClassName: "name-column--cell", },
        { field: 'value', headerName: "No. Sales Today", width: 100, cellClassName: "name-column--cell", },
        { field: 'total', headerName: "Total Amount ", width: 100, cellClassName: "name-column--cell", },
        // {
        //     field: 'perfomance', headerName: "Perfomance", width: 100, renderCell: (params) => <Chip
        //         sx={{
        //             pl: "4px",
        //             pr: "4px",
        //             backgroundColor: params.value == 'good' ? colors.redAccent[500] : params.value == 'medium' ? colors.greenAccent[300] : colors.blueAccent[300],
        //             color: "#fff",
        //         }}
        //         size="small"
        //         label={params.value}
        //     ></Chip>, editable: 'Available', type: "singleSelect", valueOptions: ["Available", "Not Available"]
        // },
        // { field: 'view', headerName: 'View', sortable: false, width: 100, renderCell: (params) => <View {...{ params, rowId, setRowId }} /> },

    ]
    const View = ({ params }) => {
        return <Button
            onClick={() => router.push(`/admin/products/${params.id}`)}
            sx={{
                bgcolor: colors.teal[300] + '!important',
                padding: '2px !important'
            }}>View</Button>
    }

    return (
        <Box >
            <Title title="Weekly" subtitle="Montly Sales" />

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
                    loading={!data}
                    disableSelectionOnClick

                    sx={{
                        '@media print': {
                            '.MuiDataGrid-main': { color: 'rgba(0, 0, 0, 0.87)' },
                        },
                    }}
                    rows={[]}
                    // rows={products}

                    components={{
                        Toolbar: GridToolbar,
                    }}
                />

            </Box>




        </Box>

    );
};



export default Today;
