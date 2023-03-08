import { Box } from "@mui/system";
import React, { useEffect } from "react";
import StatBar from "../components/StatBar";
import Title from "../components/Title";
import StatCard from "../components/StatCard";
import { Grid } from "@mui/material";
import StatContainer from "../components/StatContainer";
import OrderGrid from "../components/OrderGrid"
import { useAuth } from "../utils/authContext";
import { useBusinessQuery } from "../utils/hooks/useBusiness";
const Index = () => {
  const { data: business } = useBusinessQuery();
  useEffect(() => {
    console.log(business)
  })
  return <Box>
    <Title title={business?.name} subtitle="Welcome To You Dashboard" />
    <Grid container rowGap={3}
      sx={{
        pr: 1,
        pl: 1


      }
      }
    >
      <StatCard />
      <StatContainer />
      <OrderGrid />
      <StatBar />

    </Grid>

  </Box>;
};

export default Index;
