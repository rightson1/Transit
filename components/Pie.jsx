import { ResponsivePie } from "@nivo/pie";
import { useTheme } from "@mui/material";
import { useGlobalProvider } from "../utils/themeContext";
import { useEffect, useMemo, useState } from "react";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";
const PieChart = ({ orders, isDashboard, revenue }) => {
    const { colors } = useGlobalProvider()
    const { business } = useGlobalProvider()
    const [total, setTotal] = useState(0)
    const theme = useTheme();
    const [data, setData] = useState([])

    const pieColors = [
        "hsl(344, 70%, 50%)",
        "hsl(229, 70%, 50%)",
        "hsl(291, 70%, 50%)",
        "hsl(162, 70%, 50%)",
        "hsl(150,0%, 30%)",
        "hsl(150, 70%, 50%)",
        "hsl(104, 70%, 50%)",
        "hsl(0, 70%, 50%)",
    ]
    useEffect(() => {
        setTotal(0)
        const data = []
        let total = 0

        orders.map((order, index) => {
            total += revenue ? order.total : order.value
            setTotal(total)

            data.push({
                id: order._id,
                label: order.label,
                value: revenue ? order.total : order.value,
                color: pieColors[index]
            })
        })
        setData(data)
    }, [orders])

    return (
        <Box height={isDashboard ? "400px" : "100%"}
            width={undefined}
            minHeight={isDashboard ? "325px" : undefined}
            minWidth={isDashboard ? "325px" : undefined}
            position="relative">

            <ResponsivePie
                data={data}
                theme={{
                    axis: {
                        domain: {
                            line: {
                                stroke: colors.grey[100],
                            },
                        },
                        legend: {
                            text: {
                                fill: colors.grey[100],
                            },
                        },
                        ticks: {
                            line: {
                                stroke: colors.grey[100],
                                strokeWidth: 1,
                            },
                            text: {
                                fill: colors.grey[100],
                            },
                        },
                    },
                    legends: {
                        text: {
                            fill: colors.grey[100],
                        },
                    },

                    tooltip: {
                        container: {
                            color: colors.blueAccent[700],
                        },
                    },
                }}
                margin={isDashboard ? { top: 0, right: 80, bottom: 80, left: 80 } : { top: 40, right: 80, bottom: 80, left: 80 }}
                innerRadius={0.5}
                padAngle={0.7}
                cornerRadius={3}
                activeOuterRadiusOffset={8}
                borderColor={{
                    from: "color",
                    modifiers: [["darker", 0.2]],
                }}
                arcLinkLabelsSkipAngle={10}
                arcLinkLabelsTextColor={colors.grey[100]}
                arcLinkLabelsThickness={2}
                arcLinkLabelsColor={{ from: "color" }}
                enableArcLinkLabels={!isDashboard}
                arcLabelsRadiusOffset={0.4}
                arcLabelsSkipAngle={7}
                arcLabelsTextColor={{
                    from: "color",
                    modifiers: [["darker", 2]],
                }}
                defs={[
                    {
                        id: "dots",
                        type: "patternDots",
                        background: "inherit",
                        color: "rgba(255, 255, 255, 0.3)",
                        size: 4,
                        padding: 1,
                        stagger: true,
                    },
                    {
                        id: "lines",
                        type: "patternLines",
                        background: "inherit",
                        color: "rgba(255, 255, 255, 0.3)",
                        rotation: -45,
                        lineWidth: 6,
                        spacing: 10,
                    },
                ]}
                legends={[
                    {
                        anchor: "bottom",
                        direction: "row",
                        justify: false,
                        translateX: isDashboard ? 2000 : 0,
                        translateY: isDashboard ? 50 : 56,
                        itemsSpacing: 0,
                        itemWidth: 100,
                        itemHeight: 18,
                        itemTextColor: "#999",
                        itemDirection: "left-to-right",
                        itemOpacity: 1,
                        symbolSize: 18,
                        symbolShape: "circle",
                        effects: [
                            {
                                on: "hover",
                                style: {
                                    itemTextColor: "#000",
                                },
                            },
                        ],
                    },
                ]}
            />
            <Box
                position="absolute"
                top="50%"
                left="50%"
                color={colors.grey[100]}
                textAlign="center"
                pointerEvents="none"
                sx={{
                    transform: isDashboard
                        ? "translate(-50%, -210%)"
                        : "translate(-50%, -130%)",
                }}
            >
                <Typography variant="h6" color={colors.redAccent[200]}>
                    Total: {total}
                </Typography>
            </Box>
        </Box>

    );
};


export default PieChart;