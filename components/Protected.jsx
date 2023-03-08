import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Skeleton from "@mui/material/Skeleton";
import { useAuth } from "../utils/authContext"
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Typography } from "@mui/material";
import axios from "axios";
import { toast } from "react-hot-toast";
const Protected = ({ children }) => {
    const { admin, business, businessState, notThere } = useAuth()
    const router = useRouter();
    useEffect(() => {

        if (!admin) {
            console.log('You are not logged in')
            router.push('/login')
            return;
        }

    }, [admin, router.push])
    return <>
        {admin ? children :
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={!admin}

            >
                <Box className="flex flex-col justify-center items-center">
                    <div class="wrap-loader">
                        <div class="loader">
                            <div class="box"></div>
                            <div class="box"></div>
                            <div class="box"></div>
                            <div class="box"></div>
                            <div class="wrap-text">
                                <div class="text"><span>L</span><span>O</span><span>A</span><span>D</span><span>I</span><span>N</span><span>G</span><span>...</span>
                                </div>

                            </div>
                        </div>
                        <div class="loader-text">You are no logged in</div>
                        <Button variant="contained" className="bg-red-500"

                            onClick={() => router.push('/login')}>Login Page</Button>
                    </div>

                </Box>
            </Backdrop>
        }
    </>
};


export default Protected;