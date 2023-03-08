import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import GoogleIcon from '@mui/icons-material/Google';
import { useRouter } from "next/router";
import { useGlobalProvider } from '../utils/themeContext';
import Register from "./Register";
import Business from "./Business";
import { useAuth } from "../utils/authContext";

export default function RegisterStepper() {
    const { colors } = useGlobalProvider();
    const [values, setValues] = useState(null);
    const { user } = useAuth()
    const [newAdmin, setNewAdmin] = useState(null)
    const router = useRouter()
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);

    const maxSteps = 3;
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        if (activeStep > 2) {
            router.push('/')
        }

    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const Welcome = () => {
        return <Box
            sx={{
                display: 'flex',
                gap: 2,
                flexDirection: 'column',

                justifyContent: 'center',
                width: {
                    xs: '80vw',
                    sm: '70vw',
                    md: '400px'
                },
            }}>
            <Box className="flex flex-col ">
                <Typography
                    variant="h2"
                    sx={{
                        alignSelf: 'flex-start',
                        opacity: 0.8,
                        fontWeight: 700,
                        color: colors.orange[500],

                    }}
                >Welcome To Highrise Foods</Typography>
                {/* <Typography
                    variant="h6"
                    sx={{
                        color: colors.primary[200],
                    }}
                >Please Take Time To Read The Following Details (Click next at the end to move to registartion page)</Typography>
           */}
            </Box>
            <Box className="my-2">
                <Typography className="text-[16px] leading-7" fontFamily="Nunito">
                    Welcome to H-Foods,Click Next to continue,
                    If You Already have a business account with us, and just want
                    a second admins account for your business, create account just your account the proceed to login,
                    Nb, you wll only login if your email has been added to the business owners
                </Typography>
            </Box>
        </Box>
    }
    return (
        <Box sx={{


            "& 	.MuiMobileStepper-root": {
                backgroundColor: 'transparent !important',
                pb: 3,
            }
        }}>
            {activeStep === 0 ? <Welcome /> : activeStep === 1 ? <Register {...{ setActiveStep, activeStep }} /> : <Business />}
            <MobileStepper
                variant="text"
                steps={maxSteps}
                className="mt-7 "
                position="static"
                activeStep={activeStep}
                nextButton={
                    <Button
                        size="small"
                        onClick={handleNext}
                        sx={{
                            color: activeStep === maxSteps - 1 ? colors.primary[800] + '!important' : colors.teal[500] + '!important',
                            bgcolor: 'transparent !important',
                            fontSize: '1rem'
                        }}

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
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}
                        sx={{
                            color: activeStep === 0 ? colors.primary[800] + '!important' : colors.teal[500] + '!important',
                            bgcolor: 'transparent !important',
                            fontSize: '1rem'
                        }}
                    >
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