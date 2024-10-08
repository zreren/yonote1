import Image from "next/image";
import {time2DateString} from "@/tools/timeToString";
import Link from "next/link";
import React from "react";
import DefaultLoadingPicture from "@/utils/DefaultLoadingPicture";
import {type DetailColumnCard} from "@/server/db/schema";

const ColumnCard = ({columnData}: { columnData: DetailColumnCard }) => {
    return (
        <div className="w-85.75 h-32 border-rd-5 bg-[#FFF] pr-4 pl-2.5 ">
            <Link href={`/dashboard/special-column?id=${columnData.id}`}>
                <div className="flex h-19 pt-2">
                    <div className='relative w-15.5 h-19'>
                        <Image
                            placeholder="blur"
                            blurDataURL={DefaultLoadingPicture()}
                            src={columnData.cover ?? DefaultLoadingPicture()}
                            alt="cover"
                            quality={100}
                            fill
                            loading="lazy"
                            className="rounded-2 object-cover"
                        />
                    </div>
                    <div className="w-250px h-64px mt-1 ml-3">
                        <div className="text-[#252525] text-3.75 font-500 lh-6 w-80%" style={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                        }}>
                            {columnData.name}
                        </div>
                        <div className="text-[#666] text-3.25 h-10 w-80% font-400 mt-2 overflow-hidden relative"
                             style={{
                                 display: '-webkit-box',
                                 WebkitBoxOrient: 'vertical',
                                 WebkitLineClamp: 2,
                                 overflow: 'hidden',
                                 textOverflow: 'ellipsis',
                             }}>
                            {columnData.introduce}
                        </div>

                    </div>
                </div>
            </Link>
            <div className={"flex items-center justify-between w-full pt-3 mb-4"}>
                <Link href={`/dashboard/user/detail?id=${columnData.userId}`}>
                    <div className="flex items-center">
                        <div className="relative w-6 h-6">
                            <Image
                                placeholder="blur"
                                blurDataURL={DefaultLoadingPicture()}
                                src={columnData?.avatar ?? DefaultLoadingPicture()}
                                alt="cover"
                                quality={100}
                                fill
                                loading="lazy"
                                className="rounded-full object-cover"
                            />
                        </div>
                        <div className="ml-1">
                            <div className="flex text-[#999] text-2.75 lh-4">
                                {columnData.userName}
                            </div>
                            <div className="text-[#B5B5B5] text-2.75 lh-4">
                                {time2DateString(columnData.createdAt)}发布
                            </div>
                        </div>
                    </div>
                </Link>
                <div className={"flex"}>
                    <div className="flex items-center">
                        <Image
                            src={"/images/recommend/rss.svg"}
                            alt="rss"
                            width={5}
                            height={5}
                            className="w-4.5 h-4.5 "
                        />
                        <div className="text-[#B5B5B5] text-2.75 font-500 lh-6 ml-1">
                            {columnData.subscriptionCount}
                        </div>
                    </div>
                    <div className="flex items-center">
                        <Image
                            src={"/images/recommend/open.svg"}
                            alt="open"
                            width={5}
                            height={5}
                            className=" w-4.5 h-4.5 ml-7"
                        />
                        <div className="text-[#B5B5B5] text-2.75 font-500 lh-6 ml-1">
                            {columnData.readCount}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ColumnCard;
