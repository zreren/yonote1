'use client';
import React, {useEffect, useState} from 'react';
import {useSearchParams} from 'next/navigation';
import TableComponent from "@/app/_components/writer/column-manage/TableComponent";
import {api} from "@/trpc/react";
import Loading from "@/app/_components/common/Loading";
import dayjs from "dayjs";
import {Button, DatePicker, Input, Select} from "antd";
import 'dayjs/locale/zh-cn';

const Page = () => {
    const params = useSearchParams();
    const columnId = params.get("columnId");
    const [queryParams, setQueryParams] = useState({
        userId: null,
        status: null,
        startDate: null,
        endDate: null,
    })
    const {data, isLoading} = api.order.getSubscriptionFilter.useQuery({
        columnId,
        userId: queryParams.userId,
        status: queryParams.status,
        startDate: queryParams.startDate,
        endDate: queryParams.endDate,
    });

    if (isLoading) return <Loading/>;
    return (
        <div className='w-full h-full bg-#fff p8'>
            <div className='text-[#323232] font-700'>订阅管理</div>
            <div className={'mt-6'}>
                <ConditionalFiltering/>
            </div>
            <div className={'mt-4'}>
                {/*// @ts-ignore*/}
                <TableComponent dataSource={data}/>
            </div>
        </div>
    );

    function ConditionalFiltering() {
        const dateFormat = 'YYYY/MM/DD';
        const [searchParams, setSearchParams] = useState({
            userId: null,
            status: null,
            startDate: null,
            endDate: null,
        });

        useEffect(() => {
            setSearchParams({...queryParams});
        }, []);

        const handleSearch = () => {
            setQueryParams({
                userId: searchParams.userId,
                status: searchParams.status,
                startDate: searchParams.startDate,
                endDate: searchParams.endDate,
            });
            // refetch(); // 在点击查询按钮时才触发重新获取数据
        };

        const onUserIdChange = (e) => {
            setSearchParams(prevState => ({...prevState, userId: e.target.value}));
        };

        const onStatusChange = (value: (boolean & null)) => {
            console.log(value)
            setSearchParams(prevState => ({...prevState, status: value}));
        };

        const onDateChange = (date) => {
            const [date1, date2] = date;
            setSearchParams((prev) => ({
                ...prev,
                startDate: date1 ? date1.toDate() : null,
                endDate: date2 ? date2.toDate() : null,
            }));
        }

        return (
            <div className={'w-full h-full rounded-2.5 flex text-3.5 font-400'}>
                <div>
                    <label className='lh-5.5'>用户ID：</label>
                    <Input
                        className='ml-4 w-56 h-8 rounded-1 border-1 border-solid border-[#D9D9D9] bg-[#FFF]'
                        type="text"
                        placeholder="搜索用户ID"
                        value={searchParams.userId}
                        onChange={onUserIdChange}
                        allowClear
                    />
                </div>

                <div className={'ml-32px'}>
                    <label className='lh-5.5'>订阅状态：</label>
                    <Select
                        className='ml-4 w-56 h-8'
                        placeholder="不限"
                        value={searchParams.status}
                        options={[
                            {value: null, label: '全部'},
                            {value: true, label: '订阅中'},
                            {value: false, label: '已结束'},
                        ]}
                        onChange={onStatusChange}
                    />
                </div>
                <div className={"flex items-center ml-32px"}>
                    <label className='text-3.5 font-400 lh-5.5 mr-2.5'>订阅开始时间：</label>
                    <DatePicker.RangePicker
                        value={[
                            searchParams.startDate ? dayjs(searchParams.startDate) : null,
                            searchParams.endDate ? dayjs(searchParams.endDate) : null,
                        ]}
                        format={dateFormat}
                        onChange={onDateChange}
                    />
                </div>
                <Button
                    className={'p0 b-0 w-16 h-8 rounded-1 bg-[#1DB48D] text-[#fff] mx-56px'}
                    onClick={handleSearch}
                >
                    查询
                </Button>
            </div>
        )
    }

};

export default Page;
