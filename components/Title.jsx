import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useGlobalProvider } from "../utils/themeContext"
// import Header from "./Header";
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
const Title = ({ title, subtitle }) => {
    const { colors } = useGlobalProvider()
    return <Box p={2}>
        {/* <Header title={title} desc={subtitle} /> */}
        <Typography variant="h6" fontWeight="thin" sx={{
            fontSize: "1.2rem",
        }} color={colors.grey[100]}> Home <ChevronRightOutlinedIcon />
            <Typography fontWeight="bold" variant="h6" component="span" sx={{
                fontSize: "1.3rem",
            }}> {title}</Typography>

        </Typography>
        <Typography variant="h3" fontWeight="bold" color={colors.teal[500]} >{subtitle}</Typography>
    </Box>;
};

export default Title;
