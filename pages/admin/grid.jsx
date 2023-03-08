import React from "react";

const Grid = () => {
    return <div>Grid</div>;
};

export default Grid;



// import { Check, PartyMode, Save } from "@mui/icons-material";
// import { Box, Fab, Typography } from "@mui/material";
// import { DataGrid, GridCellModes, gridClasses } from "@mui/x-data-grid";
// import React, { useState } from "react";
// import { useGlobalProvider } from "../../utils/themeContext";

// const Category = () => {
//     const [page, setPage] = useState(5)
//     const { colors } = useGlobalProvider()
//     const [rowId, setRowId] = useState(null)
//     const columns = [
//         { field: "id", headerName: "ID", width: 70 },
//         { field: 'name', headerName: 'Name', width: 200 },
//         { field: 'email', headerName: 'Email', width: 250 },
//         { field: "role", headerName: "Role", width: 150, type: 'singleSelect', valueOptions: ['Subcontractor', 'Architect', 'Surveyor', 'Construction Foreman', 'Construction Expeditor'], editable: true, },
//         { field: 'active', headerName: 'Active', width: 130, type: 'boolean', editable: true },
//         { field: 'actions', headerName: 'actions', type: 'actions', renderCell: (params) => <UserActions {...{ params, rowId, setRowId }} /> }
//         , { field: "payment", headerName: "Payment", width: 150, editable: true, renderCell: (params) => <Typography variant="body2" sx={{ color: params.value ? "green" : "red" }}>{params.value ? "Paid" : "Pending"}</Typography>, type: "singleSelect", valueOptions: ['Paid', 'Pending'] }
//     ];
//     return <Box
//         m="40px 0 0 0"
//         height="75vh"
//         sx={{
//             "& .MuiDataGrid-root": {
//                 border: "none",
//                 minWidth: "100%"
//             },
//         }}    >
//         <DataGrid
//             rows={users}
//             columns={columns}
            // rowsPerPageOptions={[5, 10, 20]}
            // pageSize={page}
            // onPageChange={(newPage) => setPage(newPage)}
//             onCellEditCommit={(params) => setRowId(params.id)}
//             // rowHeight={25}
//             cellModesModel={{ 3: { name: { mode: GridCellModes.Edit } } }}

//             getRowSpacing={
//                 (params) => ({
//                     top: params.isFirstVisible ? 0 : 5,
//                     bottom: params.isLastVisible ? 0 : 5

//                 })

//             }
//             sx={{
//                 [`& .${gridClasses.row}`]: {
//                     bgcolor: colors.grey[400],
//                 }
//             }}


//         />
//     </Box>;
// };
// const UserActions = ({ params, rowId, setRowId }) => {
//     const [loading, setLoading] = useState();
//     const [sucess, setSucess] = useState();
//     const { colors } = useGlobalProvider()
//     const handleSubmit = () => {
//         console.log(params.row)
//     }
//     return <Box
//         sx={{
//             m: 1,
//             position: 'relative',

//         }}
//     >
//         {
//             sucess ? (<Fab
//                 color="primary"
//                 disabled={params.id !== rowId || loading}
//                 sx={{
//                     width: 40,
//                     height: 40,
//                     bgcolor: colors.greenAccent[400],

//                 }}
//             ><Check /></Fab>) : (<Fab
//                 color="primary"
//                 onClick={handleSubmit}
//                 sx={{
//                     width: 40,
//                     height: 40,
//                     bgcolor: colors.greenAccent[400],

//                 }}
//                 disabled={params.id !== rowId || loading}
//             >
//                 <Save />
//             </Fab>)
//         }

//     </Box>
// }
// export default Category;


// const users = [{
//     "customer": "Cruwys",
//     "order": "chips",
//     "price": "$0.79",
//     "status": false,
//     "payment": false
// }, {
//     "customer": "Herity",
//     "order": "chapati",
//     "price": "$4.33",
//     "status": false,
//     "payment": false
// }, {
//     "customer": "Rolfs",
//     "order": "chips",
//     "price": "$5.19",
//     "status": false,
//     "payment": false
// }, {
//     "customer": "Kalkhoven",
//     "order": "ugali",
//     "price": "$4.40",
//     "status": false,
//     "payment": true
// }, {
//     "customer": "Lathan",
//     "order": "",
//     "price": "$4.05",
//     "status": true,
//     "payment": false
// }, {
//     "customer": "Winsome",
//     "order": "chips",
//     "price": "$1.96",
//     "status": false,
//     "payment": true
// }, {
//     "customer": "Blais",
//     "order": "ugali",
//     "price": "$2.28",
//     "status": false,
//     "payment": true
// }, {
//     "customer": "Adame",
//     "order": "",
//     "price": "$2.08",
//     "status": false,
//     "payment": true
// }, {
//     "customer": "Lyddy",
//     "order": "",
//     "price": "$1.82",
//     "status": true,
//     "payment": true
// }, {
//     "customer": "Redolfi",
//     "order": "",
//     "price": "$5.91",
//     "status": true,
//     "payment": true
// }, {
//     "customer": "Rosindill",
//     "order": "ugali",
//     "price": "$7.81",
//     "status": true,
//     "payment": false
// }, {
//     "customer": "MacComiskey",
//     "order": "chapati",
//     "price": "$6.23",
//     "status": false,
//     "payment": false
// }, {
//     "customer": "Ipgrave",
//     "order": "ugali",
//     "price": "$8.83",
//     "status": true,
//     "payment": true
// }, {
//     "customer": "Ganning",
//     "order": "chapati",
//     "price": "$7.46",
//     "status": false,
//     "payment": true
// }, {
//     "customer": "Barefoot",
//     "order": "ugali",
//     "price": "$1.59",
//     "status": false,
//     "payment": true
// }, {
//     "customer": "Lehrmann",
//     "order": "ugali",
//     "price": "$6.33",
//     "status": true,
//     "payment": true
// }, {
//     "customer": "Pentycost",
//     "order": "",
//     "price": "$6.67",
//     "status": true,
//     "payment": false
// }, {
//     "customer": "Cammomile",
//     "order": "",
//     "price": "$0.32",
//     "status": false,
//     "payment": true
// }, {
//     "customer": "Joao",
//     "order": "ugali",
//     "price": "$5.84",
//     "status": false,
//     "payment": false
// }, {
//     "customer": "Harnott",
//     "order": "ugali",
//     "price": "$0.33",
//     "status": false,
//     "payment": false
// }]
