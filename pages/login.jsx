import { Grid, Box, Paper, Typography, Button, Divider, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useGlobalProvider } from "../utils/themeContext";
import GoogleIcon from '@mui/icons-material/Google';
import { useRouter } from "next/router";
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth, db } from "../utils/firebase";
import { doc, getDoc } from 'firebase/firestore';
import { useGetUser, useRegister } from "../utils/hooks/useRegister";
import { toast } from "react-hot-toast";
const Start = () => {
    const router = useRouter()
    const { colors } = useGlobalProvider();

    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                const { uid } = user;
                toast.success('Success!');
                console.log(uid);
                getDoc(doc(db, 'admins', uid)).then((user) => {
                    const userExist = user.exists();
                    if (userExist) {
                        toast.success('Success!');
                        router.push('/')
                    }
                    else {
                        toast.error('Please Create an account');
                    }
                }).catch(() => {
                    toast.error('There Was An Error');
                })
            }).catch((e) => {
                toast.dismiss();
                toast.error('Error!');

            })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        toast.error('Please use google auth');
        return;
    }
    return <Grid container
        sx={{
            zIndex: 5,
        }}
    >
        <Grid item
            xs={12}
            md={6}
            sx={{
                position: 'relative',
                backgroundImage: 'url(/register.svg)',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain',
                backgroundPosition: 'right bottom',
                width: "100%",
                p: 2,
                height: {
                    xs: "60vh",
                    md: "100vh"
                },
            }}
        >

            <Typography
                variant="h2" fontFamily="Atomic Age" color={colors.orange[500]}
            >TRANSIT</Typography>
        </Grid>
        <Grid item
            xs={12}
            component={Paper}
            md={6}
            sx={{
                width: "100%",
                gap: 1,
                p: 2,
                bgcolor: colors.primary[600],
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',

            }}
        >

            <Box


                sx={{
                    display: 'flex',
                    gap: 2,
                    flexDirection: 'column',
                    width: {
                        xs: '80vw',
                        sm: '70vw',
                        md: '400px'
                    },
                }}>
                <Typography
                    variant="h3"
                    sx={{
                        alignSelf: 'flex-start',
                        opacity: 0.8,
                        fontWeight: 700,

                    }}
                >Login To H-Foods</Typography>
                <Typography
                    variant="body2"
                    sx={{
                        color: colors.primary[200],
                    }}

                >Dont have an Account ? <Typography component="button"
                    color={colors.teal[500]}
                    onClick={() => router.push('/register')}
                >Sign In</Typography>
                </Typography>

                <Box>Use Google Sign In if possible</Box>
                <Box className="flex flex-col gap-5" component="form"
                    onSubmit={handleSubmit}
                >
                    <Box
                        className="flex flex-col gap-2 items-center "
                    >
                    </Box>

                    <Box
                        className="flex flex-col gap-2 items-center "
                    >
                        <Typography
                            sx={{
                                alignSelf: 'flex-start',
                            }}
                        >Email</Typography>
                        <Box
                            component="input"
                            required
                            name="email"


                            sx={{
                                width: "100%",
                                outline: colors.teal[100],
                                bgcolor: 'transparent',
                                border: `1px solid ${colors.black[400]}`,
                                '$:focus': {
                                    outline: colors.teal[100],
                                }
                            }}
                            className="resize-none rounded-md p-4 focus:border-teal-500 focus:border-2  w-full"

                        />
                    </Box>

                    <Box
                        className="flex flex-col gap-2 items-center "
                    >
                        <Typography
                            sx={{
                                alignSelf: 'flex-start',
                            }}
                        >Password</Typography>
                        <Box
                            component="input"
                            required
                            name="password"

                            sx={{
                                width: "100%",
                                outline: colors.teal[100],
                                bgcolor: 'transparent',
                                border: `1px solid ${colors.black[400]}`,
                                '$:focus': {
                                    outline: colors.teal[100],
                                }
                            }}
                            className="resize-none rounded-md p-4 focus:border-teal-500 focus:border-2  w-full"

                        />
                    </Box>

                    <Button
                        className="flex gap-2 items-center"
                        type="submit"
                        sx={{
                            bgcolor: colors.orange[500] + ' !important',
                            width: "100%",
                        }}
                    >
                        Login
                    </Button>

                </Box>
                <div className="flex justify-center">Or</div>
                <Divider />

                <Divider />

                <Button
                    className="flex gap-2 items-center"
                    onClick={() => signInWithGoogle()}
                    sx={{
                        bgcolor: 'transparent',
                        width: "100%",
                        border: `2px solid ${colors.black[300]}`,

                    }}
                >   <GoogleIcon sx={{
                    color: colors.orange[500],

                }}
                    />


                    <Typography
                        sx={{
                            color: colors.black[300],
                            fontWeight: 700,
                        }}
                    >
                        Google
                    </Typography>
                </Button>


            </Box>

        </Grid>
    </Grid>;
};
Start.noLayout = true;
export default Start;


