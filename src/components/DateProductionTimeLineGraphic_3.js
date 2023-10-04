import React, { useEffect, useRef, useState } from 'react';

import { PanResponder, Dimensions, Text, TouchableOpacity, View } from 'react-native';
import { AreaChart, XAxis, YAxis } from 'react-native-svg-charts';
import { Circle, Defs, G, Line, LinearGradient, Path, Rect, Stop, Text as SvgText } from 'react-native-svg';
import * as shape from 'd3-shape';

const DateProductionTimeLineGraphic_3 =({temporada})=>{
    const [dateList, setDateList] = useState(temporada.productionDates);
    const [priceList, setPriceList] = useState(temporada.temporadaProduccionNeta);

    const apx = (size = 0) => {
        let width = Dimensions.get('window').width;
        return (width / 750) * size;
    }

    const size = useRef(dateList.length)
    const [positionX, setPositionX] = useState(-1)
    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
            onPanResponderTerminationRequest: (evt, gestureState) => true,
            onPanResponderGrant: (evt, gestureState) => {
                updatePosition(evt.nativeEvent.locationX);
                return true;
            },
            onPanResponderMove: (evt, gestureState) => {
                updatePosition(evt.nativeEvent.locationX);
                return true;
            },
            onPanResponderRelease: () => {
                setPositionX(-1);
            },
        })
    );

    const updatePosition = (x) => {
        const YAxisWidth = apx(130);
        const x0 = apx(0);// x0 position
        const chartWidth = apx(750) - YAxisWidth - x0;
        const xN = x0 + chartWidth;//xN position
        const xDistance = chartWidth / size.current;// The width of each coordinate point
        if (x <= x0) {
            x = x0;
        }
        if (x >= xN) {
            x = xN;
        }
        let value = ((x - x0) / xDistance).toFixed(0);
        if (value >= size.current - 1) {
            value = size.current - 1
        }
        setPositionX(Number(value));
    };

    const CustomGrid = ({ x, y, ticks }) => (
        <G>
            {
                ticks.map((tick) => (
                    <Line key={tick} x1="0%" x2="100%" y1={y(tick)} y2={y(tick)} stroke="#EEF3F6" />
                ))
            }
            {
                priceList.map((_, index) => (
                    <Line key={index.toString()} y1="0%" y2="100%" x1={x(index)} x2={x(index)} stroke="#EEF3F6"/>
                ))
            }
        </G>
    );

    const CustomLine = ({ line }) => (
        <Path key="line" d={line} stroke="#FFF402" strokeWidth={apx(6)} fill="none"/>
    )
    
    const CustomGradient = () => (
        <Defs key="gradient">
            <LinearGradient id="gradient" x1="0" y="0%" x2="0%" y2="100%">
                {/* <Stop offset="0%" stopColor="rgb(134, 65, 244)" /> */}
                {/* <Stop offset="100%" stopColor="rgb(66, 194, 244)" /> */}
                <Stop offset="0%" stopColor="#FFF402" stopOpacity={0.9} />
                <Stop offset="100%" stopColor="#FFF402" stopOpacity={0} />
            </LinearGradient>
        </Defs>
    );

    const Tooltip = ({ x, y, ticks }) => {
        if (positionX < 0) return null;
        const date = dateList[positionX]
        return (
            <G x={x(positionX)} key="tooltip">
                <G x={positionX > size.current / 2 ? -apx(300 + 10) : apx(10)} y={y(priceList[positionX]) - apx(10)}>
                    <Rect
                        y={-apx(24 + 24 + 20) / 2}
                        rx={apx(12)} // borderRadius
                        ry={apx(12)} // borderRadius
                        width={apx(300)}
                        height={apx(96)}
                        stroke="#FFFDBC"
                        fill="#FFFDBC"
                    />
                    <SvgText x={apx(20)} fill="#617485" opacity={0.65} fontSize={apx(24)}>
                        {date}
                    </SvgText>
                    <SvgText
                        x={apx(20)}
                        y={apx(24 + 20)}
                        fontSize={apx(24)}
                        fontWeight="bold"
                        fill="gray">
                        {priceList[positionX]} / Kilogramos
                    </SvgText>
                </G>
                <G x={x}>
                    <Line
                        y1={ticks[0]}
                        y2={ticks[Number(ticks.length)]}
                        stroke="#FEBE18"
                        strokeWidth={apx(4)}
                        strokeDasharray={[6, 3]} />
                    <Circle
                        cy={y(priceList[positionX])}
                        r={apx(20 / 2)}
                        stroke="#fff"
                        strokeWidth={apx(2)}
                        fill="#FEBE18" />
                </G>
            </G>
        );
    };

    const verticalContentInset = { top: apx(40), bottom: apx(40) };

    return (
        <>
        { dateList && priceList ?
            <View style={{ backgroundColor: '#f5fcff', alignItems: 'stretch' }}>
            <View style={{ flexDirection: 'row', width: apx(750), height: apx(570), alignSelf: 'stretch' }}>
                <View style={{ flex: 1 }} {...panResponder.current.panHandlers}>
                    <AreaChart
                        style={{ flex: 1 }}
                        data={priceList}
                        // curve={shape.curveNatural}
                        curve={shape.curveMonotoneX}
                        contentInset={{ ...verticalContentInset }}
                        svg={{ fill: 'url(#gradient)' }}>
                        <CustomLine />
                        <CustomGrid />
                        <CustomGradient />
                        <Tooltip />
                    </AreaChart>
                </View>
                    <YAxis style={{ width: apx(130) }} data={priceList} contentInset={verticalContentInset} svg={{ fontSize: apx(20), fill: '#617485' }} />
            </View>
            <XAxis
                style={{ alignSelf: 'stretch', width: apx(750), height: apx(60), }}
                numberOfTicks={7}
                data={priceList}
                formatLabel={(value, index) => dateList[value]}
                contentInset={{
                    left: apx(36),
                    right: apx(130),
                }}
                svg={{
                    fontSize: apx(20),
                    fill: '#617485',
                    y: apx(20),
                }} />
            </View>
            :
            <>
            </>
        }
        </> 
    )
}

export default DateProductionTimeLineGraphic_3