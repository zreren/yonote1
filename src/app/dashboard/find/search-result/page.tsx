"use client";
import React, { Suspense, useEffect, useState } from "react";
import { api } from "@/trpc/react";
import { useRouter, useSearchParams } from "next/navigation";
import { SearchColumn } from "@/app/_components/common/SearchColumn";
import Image from "next/image";
import Navbar from "@/app/_components/common/Navbar";
import { timeToDateString } from "@/tools/timeToString";
import Link from "next/link";
import Loading from "@/app/_components/common/Loading";

const Page = () => {
    const params = useSearchParams();
    const searchValue = params.get('query');

    const router = useRouter();

    const { data, isLoading } = api.column.getColumnName.useQuery(
        { searchValue: searchValue },
        { enabled: !!searchValue } // Enable query if searchValue is present
    );

    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        if (data) {
            setSearchResults(data);
        }
    }, [data]);

    const handleButtonClick = () => {
        router.push(`/dashboard/find`);
    };

    return (
        <Suspense fallback={<LoadingIndicator />}>
            <div className="min-h-screen relative bg-#F5F7FB">
                <div className="w-85.75 m-auto pt-8">

                    {/* 搜索框和取消按钮 */}
                    <div className={"flex items-center justify-between"}>
                        <SearchColumn SearchValue={searchValue}></SearchColumn>
                        <button className={"w-50px ml-20px"} onClick={handleButtonClick}>取消</button>
                    </div>

                    {/* 数据加载中的显示 */}
                    {isLoading && <div className={"mt-70"}>
                        <Loading />
                    </div>}
                    {/* 第一次进入页面的时候，需要显示请搜索你想搜索的专栏 */}
                    {!searchValue && (
                        <div className="text-center mt-8 text-gray-500">请您搜索想要搜索的内容噢~</div>
                    )}
                    {/* 没有搜索结果 */}
                    {!isLoading && searchValue && searchResults.length === 0 && (
                        <div className="text-center mt-8 text-gray-500">没有找到相关的结果噢~</div>
                    )}
                    {/* 渲染搜索结果 */}
                    {!isLoading && searchResults.map(item => (
                        <div key={item.id}>
                            <Link href={`../../special-column?id=${item.id}`}>
                                <div className={"w-100% mt-10px shrink-0 border-rd-5 border-1 border-solid border-[rgba(181,181,181,0.20)] bg-[#FFF] px-10px"}>
                                    <div className={"flex items-start my-10px items-center w-full"}>
                                        {/* 左边图片 */}
                                        <div className={"border-rd-2 w-69px h-92px flex items-start flex-grow"}>
                                            {/*<div className={"flex items-center justify-center  w-100% h-100% border-rd-2 overflow-hidden"}>*/}
                                            {/*    <Image src={item.logo ?? "/images/user/Loading.svg"} alt={"小专栏图片"} width={69} height={92} className={"rounded-6px"} style={{ width: "100%", height:"100%"}}/>*/}
                                            {/*</div>*/}
                                            <div className={"w-69px h-92px relative shrink-0"}>
                                                <Image
                                                    src={item.logo ?? "/images/user/Loading.svg"}
                                                    alt="cover"
                                                    layout='fill'
                                                    objectFit='cover'
                                                    quality={100}
                                                    className="border-rd-2"
                                                ></Image>
                                            </div>
                                        </div>
                                        {/* 右边文字 */}
                                        <div className={"ml-8px w-67% "}>
                                            <div className={" text-[#252525] text-3.75 font-500 lh-6 text-3.75 "}
                                                 style={{
                                                     overflow: 'hidden',
                                                     textOverflow: 'ellipsis',
                                                     whiteSpace: 'nowrap'
                                                 }}>
                                                {item.name}
                                            </div>
                                            {/* 右边图标 */}
                                            <div className="flex mt-18px items-center space-y-0 mb-22px">
                                                <div>
                                                    <div className={"flex items-center"}>
                                                        {/* 左边头像 */}
                                                        <div className={""}>
                                                            <div>
                                                                <Image src={"/images/special-column/Ellipse 2.png"} alt={"心智与阅读"} width={14} height={14}/>
                                                            </div>
                                                        </div>
                                                        <div className={"text-[#999] text-2.75 font-not-italic font-500 lh-18px ml-5px"}>{item.user.name}</div>
                                                        <div>
                                                            <Image src={"/images/special-column/Group 225.png"} alt={"心智与阅读"} width={12} height={12} className={"lh-0"} style={{ marginLeft: "2.5px" }}/>
                                                        </div>
                                                    </div>
                                                    <div className={"text-[#999] text-2.75 font-not-italic font-500 lh-18px"}>{timeToDateString(item.createdAt)}发布</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}

                </div>

                <div className="bottom-4 justify-center w-full fixed">
                    <Navbar/>
                </div>

            </div>
        </Suspense>
    );
}

// LoadingIndicator 组件，用于显示加载中状态
const LoadingIndicator = () => (
    <div className="flex items-center justify-center h-screen">
        <Image src="/images/loading.gif" alt="Loading" width={50} height={50} />
    </div>
);

export default Page;
