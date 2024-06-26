"use client"
import Image from "next/image";
import {useState} from "react"
import {SubscriptionQueryColumn} from "@/app/_components/recommend/SubscriptionQueryColumn";
import {DefaultColumn} from "@/app/_components/recommend/DefaultColumn";
import {CreateAtQueryColumn} from "@/app/_components/recommend/CreateAtQueryColumn";
import {ContentNumberQueryColumn} from "@/app/_components/recommend/ContentNumberQueryColumn";


export const SpecialColumn = () => {
    const [activeCategory, setActiveCategory] = useState<string>("默认");

    const handleCategoryClick = (category:string) => {
        setActiveCategory(category);
        setCurrentContent(category)
    };

    const [currentContent, setCurrentContent ] = useState<string>("默认");
    const renderContent = () => {
        switch (currentContent){
            case "默认":
                return <DefaultColumn/>;
            case "订阅量":
                return <SubscriptionQueryColumn/>;
            case "内容量":
                return <ContentNumberQueryColumn/>;
            case "发布时间":
                return <CreateAtQueryColumn/>;
            case "创作时间":
                return <CreateAtQueryColumn/>;
        }
    }

    

    const getCategoryStyle = (category:string ) => {
        if (category === activeCategory) {
            return {
                backgroundColor: 'rgba(69,225,184,0.20)',
                color: '#1DB48D'
            };
        } else {
            return {
                backgroundColor: '#FFFFFF',
                color: '#999'
            };
        }
    };




    return (
        <div>
            <div className="pl-4 mt-6 flex w-full h-6">
                                <div
                                    className={`h-6 shrink-0 text-center text-[#1DB48D] text-3.25 font-not-italic font-400 lh-6 border-rd-1 px-9px`}
                                    onClick={() => handleCategoryClick("默认")}
                                    style={getCategoryStyle("默认")}
                                >
                                    默认
                                </div>
                                <div
                                    className={`h-6 shrink-0 ml-5px text-center text-[#999] text-3.25 font-not-italic font-400 lh-6 border-rd-1 px-9px`}
                                    onClick={() => handleCategoryClick("订阅量")}
                                    style={getCategoryStyle("订阅量")}
                                >
                                    订阅量
                                </div>
                                <div
                                    className="h-6 shrink-0 ml-5px text-center text-[#999] text-3.25 font-not-italic font-400 lh-6 border-rd-1 px-9px"
                                    onClick={() => handleCategoryClick("内容量")}
                                    style={getCategoryStyle("内容量")}
                                >

                                    内容量
                                </div>
                                <div
                                    className="h-6 shrink-0 ml-5px text-center text-[#999] text-3.25 font-not-italic font-400 lh-6 border-rd-1 px-9px"
                                    onClick={() => handleCategoryClick("发布时间")}
                                    style={getCategoryStyle("发布时间")}
                                >
                                    发布时间
                                </div>
                                <div
                                    className="h-6 shrink-0 ml-5px text-center text-[#999] text-3.25 font-not-italic font-400 lh-6 border-rd-1 px-9px"
                                    onClick={() => handleCategoryClick("创作时间")}
                                    style={getCategoryStyle("创作时间")}
                                >
                                    创作时间
                                </div>
                            </div>
            {renderContent()}
        </div>
            
       
    );
}