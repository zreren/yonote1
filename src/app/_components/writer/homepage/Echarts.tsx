"use client"
import React from 'react';
import ReactECharts from 'echarts-for-react';
import {api} from "@/trpc/react";
import {useSearchParams} from "next/navigation";
import 'dayjs/locale/zh-cn';
import getDateStringArray from "@/tools/getDateStringArray";
import Loading from "@/app/_components/common/Loading";
import NoData from "@/app/_components/common/NoData";

const Echarts = ({startDate, endDate}: { startDate: Date, endDate: Date }) => {
    const columnId = useSearchParams().get("columnId");
    const {data, isLoading} =
        api.read.getHomePageDataRange.useQuery(
            {columnId: columnId, start: startDate, end: endDate});
    const dateArr = getDateStringArray(startDate, endDate);
    if (isLoading) return <Loading />;
    if (!data) return <NoData title={'请先选择日期噢'}/>
    const option = {
        tooltip: {},
        legend: {
            data: ['销量']
        },
        xAxis: {
            data: dateArr,
        },
        yAxis: {},
        series: [
            {
                name: '阅读量',
                type: 'line',
                smooth: true,
                color: '#71AFFF',
                symbol: 'none',
                data: data.readCount,
            },
            {
                name: '订阅量',
                type: 'line',
                smooth: true,
                color: '#fdb069',
                symbol: 'none',
                data: data.subscriptionCount,
            },
            {
                name: '加速计划',
                type: 'line',
                smooth: true,
                color: '#1db48d',
                symbol: 'none',
                data: data.speedUpCount,
            }
        ]
    };
    return (
        <ReactECharts style={{height: '100%'}} option={option}/>
    );
};

export default Echarts;
