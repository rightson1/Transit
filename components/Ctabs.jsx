import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Form from './Form';
import TextMobileStepper from './MStepper';
import { useGlobalProvider } from '../utils/themeContext';
import SwipeableViews from 'react-swipeable-views';
import Text from './Text';



function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function BasicTabs({ item }) {
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
                        color: colors.teal[500],
                        border: 'none'
                    },
                    '& .MuiButtonBase-root': {
                        color: colors.orange[500],
                        border: 'none'
                    }
                }}>
                    <Tab label="Edit" {...a11yProps(0)} />
                    <Tab label="Reviews" {...a11yProps(1)} disabled />
                    <Tab label="Description" {...a11yProps(2)} />
                </Tabs>
            </Box>

            {
                value === 0 ? (<>
                    {item && <Form item={item} />}

                </>) : value === 1 ? (<>
                    <TextMobileStepper />
                </>) : (<>
                    <Typography
                        sx={{
                            fontSize: '16px',
                            letterSpacing: '2px'
                        }}
                    >  {item && item.desc}</Typography>
                </>)
            }

        </Box>
    );
}