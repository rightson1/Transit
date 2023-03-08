import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import Title from "../../components/Title";
import { useGlobalProvider } from "../../utils/themeContext";
import { useRouter } from "next/router";
import PieChart from "../../components/Pie";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useAuth } from "../../utils/authContext";
import { useGetOrderAgg } from "../../utils/hooks/useOrder";
import Skeleton from "@mui/material/Skeleton";


const Category = () => {
    const { colors } = useGlobalProvider()
    const router = useRouter();
    const { business } = useAuth();
    const today = new Date();
    const week = Math.ceil(today.getDate() / 7);
    const month = new Date().getMonth() + 1;
    const [time, setTime] = useState({
        time: 'week',
        week,
    });

    const { data: orders } = useGetOrderAgg({ ...time, id: business._id });
    const [data, setData] = useState([]);
    useEffect(() => {
        if (orders) {
            setData(orders)
        }
    }, [orders])

    const handleChange = (e) => {
        setTime(e.target.value === 'week' ? {
            time: 'week',
            week,
        } : {
            time: 'month',
            month,
        });
    }
    return <Box>
        <Title title="Sales" subtitle="NO. Sale Comparison" />
        <Box p={2}>
            <FormControl sx={{ width: 300 }}>
                <InputLabel id="demo-simple-select-label">Time</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"

                    label="Time"
                    onChange={(e) => handleChange(e)}
                >
                    <MenuItem value="week">Weekly</MenuItem>
                    <MenuItem value="month">Monthly</MenuItem>
                </Select>
            </FormControl>
        </Box>
        <Box


            height="75vh"
            sx={{
                mx: {
                    xs: '5px',
                    sm: '10px',
                    md: '20px',
                },

            }
            }
        >
            {
                orders ? <PieChart {...{ orders: data }} /> : <Skeleton
                    width="100vw"
                    height={500}
                />
            }
        </Box>

    </Box>;
};


export default Category;
