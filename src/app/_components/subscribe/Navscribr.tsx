"use client";
'use strict';
import SubscribeColumn from './SubscribeColumn';
import SubscribeRenew from './SubscribeRenew';
import SubscribeManage from './SubscribeManage';
import Image from 'next/image';
import React, { useState } from "react"


const Page = () => {
    // 按钮选中状态
    const [selectedButton, setSelectedButton] = useState<number | null>(1); // 追踪选中的按钮
    const handleButtonClick = (button: number) => {
        if (selectedButton !== button) {
            // 如果点击的是当前选中的按钮，则取消选中状态
            setSelectedButton(button);
        }
    };


    // 导航栏返回相应页面
    const [currentPage, setCurrentPage] = React.useState<number>(1);
    const Page1 = () => {
        return (
            <div>
                <SubscribeRenew />
                <SubscribeRenew />
            </div>)
    };
    const Page2 = () => {
        return (
            <div>
                <SubscribeColumn />
                <SubscribeColumn />
            </div>

        )
    };
    const Page3 = () => {
        return (
            <div>
                <SubscribeColumn />
                <SubscribeColumn />
                <SubscribeColumn />
            </div>
        );
    }
    const renderContent = (): React.ReactNode => {
        switch (currentPage) {
            case 1:
                return <Page1 />;
            case 2:
                return <Page2 />;
            case 3:
                return <Page3 />;
        }
    };

    // 订阅管理栏事件，点击弹出弹窗
    // const [showModal, setShowModal] = React.useState(false);
    // const handleModal = (): React.ReactNode => {
    //     setShowModal(true);
    //     return (
    //         // <SubscribeManage></SubscribeManage>
    //         <div>32323232323</div>
    //     )
    // }


    return (
        <div>
            <div className='mt-6 mb-3 flex justify-between items-center'>
                <div className='flex w-43 justify-between'>
                    <button onClick={() => setCurrentPage(1)} onClickCapture={() => handleButtonClick(1)} className={` ${selectedButton === 1 ? ' text-black' : 'text-[#B5B5B5]'}`}>更新
                        <div className={`w-2.75 h-1 m-auto border-rd-2 bg-[#45E1B8] ${selectedButton === 1 ? 'bg-#45E1B8' : 'bg-#f5f7fb'}`}></div>
                    </button>
                    <button onClick={() => setCurrentPage(2)} onClickCapture={() => handleButtonClick(2)} className={` ${selectedButton === 2 ? ' text-black' : 'text-[#B5B5B5]'}`}>专栏
                        <div className={`w-2.75 h-1 m-auto border-rd-2 bg-[#45E1B8] ${selectedButton === 2 ? 'bg-#45E1B8' : 'bg-#f5f7fb'}`}></div></button>
                    <button onClick={() => setCurrentPage(3)} onClickCapture={() => handleButtonClick(3)} className={` ${selectedButton === 3 ? ' text-black' : 'text-[#B5B5B5]'}`}>小课
                        <div className={`w-2.75 h-1 m-auto border-rd-2 bg-[#45E1B8] ${selectedButton === 3 ? 'bg-#45E1B8' : 'bg-#f5f7fb'}`}></div></button>
                </div>
                <button className='text-[#B5B5B5] text-2.5 lh-6 flex items-center'>
                    <div className='mr-1'>订阅管理</div>
                    <Image src={"/images/subscribe/manage.svg"} width={12} height={12} alt="manage" className='w-3 h-3'></Image>
                </button>
                <SubscribeManage></SubscribeManage>
            </div>
            {renderContent()}
        </div>
    );
};

export default Page;



