import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Form from './SForm';
import Account from './Account';
import TextMobileStepper from './MStepper';
import { useGlobalProvider } from '../utils/themeContext';
import Owners from './Owner';




function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function BasicTabs() {
    const { colors } = useGlobalProvider()
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }} my={2}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" sx={{
                    '& .MuiButtonBase-root.Mui-selected': {
                        color: colors.orange[500],
                        border: 'none'
                    },
                    '& .MuiButtonBase-root': {
                        color: colors.teal[500],
                        border: 'none'
                    }
                }}>
                    <Tab label="General" {...a11yProps(0)} />
                    <Tab label="Account" {...a11yProps(1)} />
                    <Tab label="Users" {...a11yProps(2)} />
                </Tabs>
            </Box>

            {
                value === 0 ? (<>
                    <Form />
                </>) : value === 1 ? (
                    <Account></Account>
                ) : (<>
                    <Owners />
                </>)
            }

        </Box>
    );
}