import { ResponsiveBar } from '@nivo/bar'
import { useGlobalProvider } from '../utils/themeContext'

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const MyResponsiveBar = () => {
    const { colors } = useGlobalProvider();
    return (
        <ResponsiveBar
            data={data}
            keys={[
                'hot dog',
                'burger',
                'sandwich',
                'kebab',
                'fries',
                'donut'
            ]}
            theme={{
                // added
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
            indexBy="country"
            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
            padding={0.3}
            groupMode="grouped"
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            colors={{ scheme: 'nivo' }}
            defs={[
                {
                    id: 'dots',
                    type: 'patternDots',
                    background: 'inherit',
                    color: '#38bcb2',
                    size: 4,
                    padding: 1,
                    stagger: true
                },
                {
                    id: 'lines',
                    type: 'patternLines',
                    background: 'inherit',
                    color: '#eed312',
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10
                }
            ]}
            fill={[
                {
                    match: {
                        id: 'fries'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'sandwich'
                    },
                    id: 'lines'
                }
            ]}
            borderColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        1.6
                    ]
                ]
            }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'country',
                legendPosition: 'middle',
                legendOffset: 32
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'food',
                legendPosition: 'middle',
                legendOffset: -40
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        1.6
                    ]
                ]
            }}
            legends={[
                {
                    dataFrom: 'keys',
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 120,
                    translateY: 0,
                    itemsSpacing: 2,
                    itemWidth: 100,
                    itemHeight: 20,
                    itemDirection: 'left-to-right',
                    itemOpacity: 0.85,
                    symbolSize: 20,
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ]}
            role="application"
            ariaLabel="Nivo bar chart demo"
            barAriaLabel={function (e) { return e.id + ": " + e.formattedValue + " in country: " + e.indexValue }}
        />
    )
}

export default MyResponsiveBar
const data = [
    {
        "country": "AD",
        "hot dog": 0,

        "burger": 196,

        "sandwich": 182,

        "kebab": 85,

        "fries": 142,

        "donut": 126,

    },
    {
        "country": "AE",
        "hot dog": 131,

        "burger": 21,

        "sandwich": 176,

        "kebab": 10,

        "fries": 162,

        "donut": 134,

    },
    {
        "country": "AF",
        "hot dog": 145,

        "burger": 102,

        "sandwich": 9,

        "kebab": 165,

        "fries": 67,

        "donut": 151,

    },
    {
        "country": "AG",
        "hot dog": 140,

        "burger": 183,

        "sandwich": 75,

        "kebab": 46,
        "fries": 103,

        "donut": 14,

    },
    {
        "country": "AI",
        "hot dog": 184,

        "burger": 149,

        "sandwich": 158,

        "kebab": 97,

        "fries": 174,

        "donut": 130,

    },
    {
        "country": "AL",
        "hot dog": 53,

        "burger": 72,

        "sandwich": 1,

        "kebab": 91,
        "fries": 122,
        "donut": 5,

    },
    {
        "country": "AM",
        "hot dog": 196,
        "burger": 58,
        "sandwich": 44,
        "kebab": 4,
        "fries": 30,
        "donut": 66,

    }
]