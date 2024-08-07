"use client"
import Image from "next/image";
import React, { useEffect, useState } from 'react';
import { SpecialColumnList } from "@/app/_components/special-column/SpecialColumnList";
import { SpecialColumnIntroduce } from "@/app/_components/special-column/SpecialColumnIntroduce";
import { api } from "@/trpc/react";
import Reserved from "@/app/_components/dialog/dialog/reserved";
import { useSearchParams } from "next/navigation";
import useLocalStorage from "@/tools/useStore";


export const SpecialColumnBody = () => {
    const params = useSearchParams();
    const columnId = params.get("id");
    const token = useLocalStorage("token", null);
    const [currentContent, setCurrentContent] = useState<number>(1);
    const status = api.order.getUserStatus.useQuery({
        userId: token[0],
        columnId: columnId,
    }).data
    // const [reservedStatus, setReservedStatus] = useState<boolean>(true);
    // useEffect(() => {
    //     if (status) {
            // setReservedStatus(status);
        // }
    // },[status])
    // console.log(status);
    
    const order = api.order.getColumnOrder.useQuery({
        columnId: columnId,
    })
    
    const active = "text-[#252525] font-500 border-b-3 border-[#45E1B8]";
    
    // 是否加载订阅按钮
    const reserverButton = () =>{
        if(status || status === undefined){
            return <div></div>
        }else{
            return <button
            className={"w-91% h-40px shrink-0 border-rd-11.25 bg-[#5CE5C1] ml-16px mt-17px mb-36px text-center lh-40px text-[#252525] text-4.5 font-not-italic font-500 fixed bottom-2"}
            onClick={setting}>
            订阅
        </button>
        }
    }
    const renderContent = () => {
        switch (currentContent) {
            case 1:
                return <SpecialColumnList data={status}></SpecialColumnList>;
            case 2:
                return <SpecialColumnIntroduce></SpecialColumnIntroduce>;

        }
    }
    // 获取所有文章
    const read = api.post.getAll.useQuery({
        columnId: columnId,
        limit: 10000,
        offset: 0,
    });

    const [isSubscribe, setIsSubscribe] = useState(false);

    const [check, setCheck] = useState(false);

    const setting = () => {
        setIsSubscribe(!isSubscribe);
        setCheck(!check);
    }
    // console.log(reservedStatus);
    

    return (
        <div className={" w-full  bg-#fff rounded-t-30px lh-6 "}>
            {/*订阅栏*/}
            <div className={"ml-37.8% text-[#999] text-3 font-not-italic font-400 lh-6 pt-10px"}>
                <span
                    className={"shrink-0 text-[#252525] font-D-DIN text-4 font-not-italic font-700 lh-6 mr-5px"}>{order.data?.length}</span>
                订阅
                <span
                    className={"shrink-0 text-[#252525] font-D-DIN text-4 font-not-italic font-700 lh-6 mr-5px ml-20px"}>{read.data?.length}</span>
                内容
            </div>
            <div className="flex mt-11px items-center ml-16px">
                <div
                    className={currentContent === 2 ? active : "text-[#B5B5B5] text-3.5 font-not-italic font-400 lh-6 "}
                    onClick={() => setCurrentContent(2)} style={{ marginRight: '40px' }}>介绍
                </div>
                <div
                    className={currentContent === 1 ? active : "text-[#B5B5B5] text-3.5 font-not-italic font-400 lh-6 "}
                    onClick={() => setCurrentContent(1)}>内容
                </div>
                <div className="ml-auto mr-24px">
                    <Image src={"/images/special-column/Magnifying glass.png"} alt={"心智与阅读"} width={18}
                        height={18} />
                </div>
                <div className={"mr-16px"}>
                    <Image src={"/images/special-column/Sort.png"} alt={"心智与阅读"} width={18} height={18} />
                </div>
            </div>
            {renderContent()}
            {/*按钮*/}
            {/* {status ?  <div></div> : <button
                className={"w-91% h-40px shrink-0 border-rd-11.25 bg-[#5CE5C1] ml-16px mt-17px mb-36px text-center lh-40px text-[#252525] text-4.5 font-not-italic font-500 fixed bottom-2"}
                onClick={setting}>
                订阅
            </button>} */}
            {reserverButton()}

            <div className="fixed  top-200px   w-full">
                {isSubscribe && <Reserved onClose={() => setIsSubscribe(false)} check={check}></Reserved>}
            </div>
            <div className="bg-white h-25 w-100%"></div>
        </div>
    )
}
