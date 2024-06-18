// "use client"
// import Card from "@/app/_components/recommend/Card"

// export const CoCreate = () => {
//     return (
//         <div className="mx-4 mt-5">
//             <Card/>
//         </div>
//     )
// }


import Image from "next/image";
import { api } from "@/trpc/react";
import React, { useState, useEffect } from "react";
import { timeToDateString } from "@/tools/timeToString";
import Link from "next/link";
import {ColumnCard} from "@/app/_components/find/ColumnCard";
import Loading from "@/app/_components/common/Loading";

export const CoCreate = () => {
  const [data, setData] = useState(null);

  // 使用 useQuery 钩子获取数据
  const { data: queryData,isFetching } = api.column.getAll.useQuery();

  // 在数据加载完成时更新状态
  useEffect(() => {
    if (queryData) {
      setData(queryData);
    }
  }, [queryData]);

  return (
    <div>
      {isFetching
          ?
          <div className={"mt-80"}>
            <Loading/>
          </div>
          :
          data?.map((item) => (
              <div className="mt-4 flex justify-center" key={item.id}>
                <ColumnCard columnData={item}/>
              </div>
          ))}
    </div>
  );
};
