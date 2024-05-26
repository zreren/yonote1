"use client"
import React, { useEffect, useState } from "react";
import { api } from "@/trpc/react";
import { useRouter, useSearchParams } from "next/navigation";
import {SearchColumn} from "@/app/_components/common/SearchColumn";
import Image from "next/image";
import ActivityEnd from "@/app/_components/find/activityEnd";
import ActivityGoing from "@/app/_components/find/activityGoing";
import Navbar from "@/app/_components/common/Navbar";
import {router} from "next/client";
import {timeToDateString} from "@/tools/timeToString";

const Page = () => {
    const params = useSearchParams();
    const searchValue = params.get('query');


    // State to hold query results
    const [queryName, setQueryName] = useState(null);

    const { data, refetch } = api.column.getColumnName.useQuery(
        { searchValue: searchValue },
        { enabled: !!searchValue } // Enable query if searchValue is present
    );

    useEffect(() => {
        if (searchValue) {
            refetch();
        }
    }, [searchValue, refetch]);

    return (
        <div className="min-h-screen relative bg-#F5F7FB">
            <div className="w-85.75 m-auto pt-8">

                {/*搜索框*/}
                <div className={"flex items-center justify-between"}>
                    <SearchColumn SearchValue={searchValue}></SearchColumn>
                    <div className={"w-50px ml-20px"}>取消</div>
                </div>

                {data?.map(item => (
                    <div key={item.id}>
                        <div className={"w-100%  mt-10px shrink-0 border-rd-5 border-1 border-solid border-[rgba(181,181,181,0.20)] bg-[#FFF] px-10px"} >
                            {/*上边*/}
                            <div className={"flex items-start mt-10px items-center w-full"} onClick={() => router.push('/special-column/content')}>
                                {/*左边图片*/}
                                <div className={"border-rd-2 w-25% flex items-start flex-grow"}>
                                    <Image src={"/images/subscribe/cover.png"} alt={"小专栏图片"} width={85} height={74.5} className={"rounded-6px"} style={{width: "100%"}}/>
                                </div>
                                {/*右边文字*/}
                                <div className={"ml-8px w-67% "}>
                                    <div className={" text-[#252525] text-3.75 font-500 lh-6 text-3.75 "}>
                                        {item.name}
                                    </div>

                                    {/*右边图标*/}
                                    <div className="flex mt-18px items-center space-y-0 mb-22px">
                                        {/*昵称，日期，VIP*/}
                                        <div>
                                            <div className={"flex items-center"}>
                                                {/*左边头像*/}
                                                <div className={""}>
                                                    <div>
                                                        <Image src={"/images/special-column/Ellipse 2.png"} alt={"心智与阅读"} width={14} height={14}/>
                                                    </div>
                                                </div>
                                                <div className={"text-[#999] text-2.75 font-not-italic font-500 lh-18px ml-5px"}>{item.user.name}</div>
                                                <div>
                                                    <Image src={"/images/special-column/Group 225.png"} alt={"心智与阅读"} width={12} height={12} className={"lh-0"} style={{  marginLeft:"2.5px"}}/>
                                                </div>
                                            </div>
                                            <div className={"text-[#999] text-2.75 font-not-italic font-500 lh-18px"}>{timeToDateString(item.createdAt)}发布</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}





            </div>

            <div className="bottom-4 justify-center w-full fixed">
                <Navbar/>
            </div>

        </div>

    );
}

export default Page;