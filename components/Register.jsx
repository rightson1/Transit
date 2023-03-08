import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import GoogleIcon from '@mui/icons-material/Google';
import { useRouter } from "next/router";
import { useGlobalProvider } from '../utils/themeContext';
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../utils/firebase";
import { signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useRegister } from "../utils/hooks/useRegister";
import Info from "./Info";
import { CircularProgress } from "@mui/material";
const Register = ({ setActiveStep, activeStep }) => {
    const { colors, setOwner } = useGlobalProvider();
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false)

    const router = useRouter()
    const { mutate, isError, isSuccess } = useRegister();
    useState(() => {
        if (isError) {
            setMessage("Something went wrong while creating admin account")
        } if (isSuccess) {
            setActiveStep(activeStep >= 3 ? activeStep : activeStep + 1)
        }

    }, [isError, isSuccess])


    const signInWithGoogle = () => {
        setLoading(true)
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;

                const q = query(collection(db, "admins"), where("email", "==", user.email));
                getDocs(q).then((res) => {
                    const [admins, ...rest] = res.docs.map((doc) => {
                        return { id: doc.id, ...doc.data() }
                    })
                    if (admins) {
                        setActiveStep(activeStep + 1)
                        setMessage('Successfully creates admin account,click  next to continue')
                        setOwner(admins)
                        localStorage.setItem('owner', JSON.stringify(admins))
                        setLoading(false)
                        return;
                    } else {
                        mutate({ name: user.displayName, email: user.email, photoURL: user.photoURL })
                        setMessage('Successfully creates admin account,click  next to continue')
                        setLoading(false)
                        setOwner({ name: user.displayName, email: user.email, photoURL: user.photoURL, method: 'google' })
                        localStorage.setItem('owner', JSON.stringify({ name: user.displayName, email: user.email, photoURL: user.photoURL, method: 'google' }))

                    }
                })



            }).catch((e) => {
                setLoading(false)
                setMessage(e.message)
            })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const { name: nameT, email: emailT, password: passwordT } = e.target.elements
        setLoading2(true)

        const name = nameT.value.trim();
        const email = emailT.value.trim();
        const password = passwordT.value.trim();
        const q = query(collection(db, "admins"), where("email", "==", email));
        getDocs(q).then((res) => {
            const [admins, ...rest] = res.docs.map((doc) => {
                return { id: doc.id, ...doc.data() }
            })
            if (admins) {
                setActiveStep(activeStep + 1)
                setMessage('Admin Account Exists,click  next to continue')
                setOwner(admins)
                localStorage.setItem('owner', JSON.stringify(admins))
                setLoading2(false)
                return;
            } else {
                createUserWithEmailAndPassword(auth, email, password).then(() => {
                    mutate({ name, email, photoURL: '', method: 'email' })
                    localStorage.setItem('owner', JSON.stringify({ name, email, photoURL: '', method: 'email' }))
                    setMessage('Successfully creates admin account,click  next to continue')

                    setLoading2(false)
                    setOwner({ name, email, photoURL: '' })
                }).catch((e) => {
                    setLoading2(false)
                    if (e?.message?.includes('auth/email-already-in-use')) {
                        mutate({ name, email, photoURL: '', method: 'email' })
                        localStorage.setItem('owner', JSON.stringify({ name, email, photoURL: '', method: 'email' }))
                        setMessage('Successfully creates admin account,click  next to continue')
                        setLoading2(false)
                        setOwner({ name, email, photoURL: '' })
                    } else {
                        setMessage('Error Occured')
                        setLoading2(false)
                    }
                })
            }
        })




    }
    return <Box

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
        >Register To H-Foods</Typography>
        <Typography
            variant="body2"
            sx={{
                color: colors.primary[200],
            }}
            onClick={() => router.push('/login')}
        >Already have an Account ? <Typography component="button"
            color={colors.teal[500]}
        >Login</Typography>
        </Typography>
        <Box>Use Google Sign In if possible</Box>
        <Box className="flex flex-col gap-5" component="form"
            onSubmit={handleSubmit}
        >
            <Box
                className="flex flex-col gap-2 items-center "
            >
                <Typography
                    sx={{
                        alignSelf: 'flex-start',
                    }}

                >Name</Typography>
                <Box
                    component="input"

                    name="name"
                    required

                    sx={{
                        width: "100%",
                        p: 2,
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
            {
                loading2 ? <Button><CircularProgress /> </Button> :
                    <Button
                        className="flex gap-2 items-center"
                        type="submit"
                        sx={{
                            bgcolor: colors.orange[500] + ' !important',
                            width: "100%",
                        }}
                    >
                        Register
                    </Button>
            }
        </Box>
        <Divider />

        {
            loading ? <Button><CircularProgress /> </Button> : <Button
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
        }
        {message && <Info {...{ message, setMessage }} />}
    </Box>
}


export default Register;
