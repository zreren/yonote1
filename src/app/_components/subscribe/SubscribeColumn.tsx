"use client";
import Image from "next/image";
import Link from "next/link";
import { timeToDateString } from "@/tools/timeToString";
import React from "react";

const SubscribeColumn = (prop) => {
  const column = prop.column;
  return (
    <Link href={`../special-column?id=${column.id}`}>
      <div className="h-29.25 mt-4 flex">
        <div className="relative h-18">
          <Image
            src={column.user?.avatar}
            alt="avatar"
            width={24}
            height={24}
            className="rounded-full w-11.25 h-11.25 mt-4"
          ></Image>
          <div className="bottom-2 right-1 absolute">
            <Image
              src={"/images/subscribe/vip.svg"}
              alt="vip"
              width={12}
              height={12}
              className="w-3 h-3"
            ></Image>
          </div>
          <div className="text-center text-[#999]  font-500 lh-9.6">
            {column.user?.name}
          </div>
        </div>
        <div className="flex-1">
          <div className="text-2.75 lh-4 text-[#B5B5B5] ml-2.6">
            {timeToDateString(column.createdAt)}发布
          </div>
          <div className="border-rd-[2px_16px_16px_16px] bg-[#FFF] h-24 mt-1 ml-2 flex items-center">
            <div className="w-49.75 pl-2.5 ">
              <div className="text-[#252525] text-3.75 font-500 lh-6">
                {column?.name?
                    (column?.name?.length>=20?column?.name?.substring(0, 20) + "...":column?.name)
                    :"未知专栏"
                }
              </div>
              <div className="text-[#666] text-3.25 h-10 font-400 mt-2 overflow-hidden relative">
                {column?.introduce?
                    (column?.introduce?.length>=25?column?.introduce?.substring(0, 25) + "...":column?.introduce)
                    :"未知专栏"}
                <div className="absolute bottom-0 right-0 w-full h-4 bg-gradient-to-t from-white"></div>
              </div>
            </div>
            <Image
                src={column.logo ?? "/images/subscribe/cover.png"}
                alt="cover"
                width={24}
                height={24}
                className="w-15.5 h-19 ml-3"
                unoptimized
                style={{objectFit: "cover"}}
            ></Image>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default SubscribeColumn;
