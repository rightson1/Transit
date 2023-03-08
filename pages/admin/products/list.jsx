import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import React, { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Title from "../../../components/Title";
import { useGlobalProvider } from "../../../utils/themeContext";
import { useItemQuery } from "../../../utils/hooks/useItems";
import { useAuth } from "../../../utils/authContext";
import { useRouter } from "next/router";
import axios from "axios";
import { Skeleton } from "@mui/material";



const Category = () => {
    const { colors } = useGlobalProvider();
    const { business } = useAuth()
    const { data, isLoading } = useItemQuery(business?._id);
    console.log(data)
    const router = useRouter()
    return <Box>
        <Title title="Products" subtitle="Product List" />
        <Box m="20px">
            <Box display="grid"
                gridTemplateColumns="repeat(auto-fit, minmax(250px, 1fr))"
                justifyContent="space-between"
                rowGap="20px"
                columnGap="1.33%" spacing={2}>
                {data?.length > 0 ? data.map((item, index) => {
                    return (

                        <Box
                            key={index}


                        >
                            <Card >
                                <CardMedia
                                    component="img"
                                    alt="green iguana"
                                    height="150"
                                    sx={{
                                        maxHeight: '200px !important',
                                        objectFit: 'contain',
                                        p: 1,

                                    }}

                                    image={item.image}
                                />
                                <CardContent >
                                    <Typography gutterBottom variant="h5" component="div">
                                        {item.name}
                                    </Typography>
                                    <div className="flex justify-between">
                                        <Typography variant="body2" color="text.secondary">Category</Typography>
                                        <Typography variant="body2" color="text.secondary">{item.category}</Typography>
                                    </div>
                                </CardContent>
                                <CardActions sx={{
                                    display: 'flex',
                                    justifyContent: "space-between"
                                }}>
                                    <Button size="small" sx={{
                                        color: `${colors.grey[100]} !important`
                                    }}>ksh {item.price}</Button>
                                    <Button size="small"
                                        onClick={() => router.push(`/admin/products/${item._id}`)}
                                        sx={{
                                            color: `${colors.grey[900]} !important`,
                                            bgcolor: `${colors.primary[200]} !important`
                                        }}>View Product</Button>

                                </CardActions>
                            </Card>

                        </Box>


                    )
                })
                    : isLoading ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 3].map((item, index) => (
                        <Box key={index}>
                            <Skeleton variant="rectangular" width={210} height={118} />
                            <Box sx={{ pt: 0.5 }}>


                                <Skeleton width="70%" />
                                <Skeleton width="70%" />
                            </Box>
                        </Box>

                    )) : (<Typography>No Items Added Yet</Typography>)

                }
            </Box>

        </Box>


    </Box>;
};
export default Category;