import React from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import { useGlobalProvider } from '../utils/themeContext';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
const steps = [
    {
        label: 'Rightson Tole',
        description: `You have the best ice cream`,
    },
    {
        label: 'Emmanuel',
        description:
            'Please be fast in your delivering',
    },
    {
        label: 'Mary',
        description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
    },
];

export default function TextMobileStepper() {
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = steps.length;
    const { colors, mode } = useGlobalProvider()
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <Box sx={{
            flexGrow: 1,
            bgcolor: colors.grey[mode == "dark" ? 500 : 900],
            p: 1,
            borderRadius: '4px'
        }}>
            {/* <Paper
                square
                elevation={0}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    height: 50,
                    pl: 2,
                    bgcolor: 'background.default',
                }}
            > */}
            <ListItem disablePadding>


                <ListItemIcon>
                    <Avatar src="/img/avatar.png" />
                </ListItemIcon>
                <ListItemText primary="Rightson Tole" secondary="Customer" />



            </ListItem>
            {/* </Paper> */}
            <Box sx={{ height: 'auto', width: '100%', p: 2 }}>
                {steps[activeStep].description}
                <Box width="100%" display="flex" mt={2} sx={{
                    gap: '1rem',
                    alignItems: 'center',
                    width: '100%',


                }}>

                    <Box sx={{
                        flexGrow: 1,
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                        <textarea className={`flex-grow-1 w-[100%]  resize-none rounded-md outline-none focus:border-[2px] border-[rgba(255,255,255,.2)`} style={{
                            backgroundColor: colors.primary[mode === 'dark' ? 100 : 800],

                        }} />
                    </Box>
                    <Button display="flex" gap={1} sx={{
                        color: 'white',
                        bgcolor: colors.yellow[500] + '!important'
                    }}>
                        Reply

                    </Button>


                </Box>
            </Box>
            <MobileStepper
                variant="text"
                sx={{
                    bgcolor: 'transparent'
                }}
                steps={maxSteps}
                position="static"
                activeStep={activeStep}
                nextButton={
                    <Button
                        size="small"
                        onClick={handleNext}
                        disabled={activeStep === maxSteps - 1}
                    >
                        Next
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowLeft />
                        ) : (
                            <KeyboardArrowRight />
                        )}
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowRight />
                        ) : (
                            <KeyboardArrowLeft />
                        )}
                        Back
                    </Button>
                }
            />
        </Box>
    );
}