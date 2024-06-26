import React, {useRef, useState} from 'react';
import ManagementColumn from './ManagementColumn';
import ManagementClass from './ManagementClass';
import Image from 'next/image';
import { api } from '@/trpc/react';
import useLocalStorage from '@/tools/useStore';
const SubscribeManage = () => {
    const saveColumn = useRef(null)
    const token = useLocalStorage("token", '');
    const order = api.order.getUserOrder.useQuery({
        userId: token[0],
    });
    const column = api.column.getAll.useQuery().data;

    const [showModal, setShowModal] = useState(false);

    const handleModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };
    const [manage, setManage] = useState(false);
    const handleManage = () => {
        console.log("savecolumn",saveColumn)
        if (saveColumn.current && manage==true){
            saveColumn.current.handleSave();
        }
        setManage(!manage);
    }


    const [selectedButton, setSelectedButton] = useState(1); // 追踪选中的按钮
    const [transactionType, setTransactionType] = useState("column"); //跟踪类型
    const handleButtonClick = (button: number, type: string) => {
        if (selectedButton !== button) {
            // 如果点击的是当前选中的按钮，则取消选中状态
            setSelectedButton(button);
            setTransactionType(type);
        }
    };

    return (
        <div>
            <button onClick={handleModal} className='text-[#B5B5B5] text-2.5 lh-6'>订阅管理</button>
            <Image src={"/images/subscribe/manage.svg"} width={12} height={12} alt="manage" className='w-3 h-3 inline-block justify-center ml-2 mt-1'></Image>
            {showModal && (
                <div className=" bg-[rgba(0,0,0,0.65)] h-100% fixed top-0 w-100% left-0 z-999" onClick={closeModal}>
                    <div className="" onClick={(e) => e.stopPropagation()}>
                        <div className="close" onClick={closeModal}>
                        </div>
                        <div className='fixed w-93.75 h-123.5 border-rd-[20px_20px_0px_0px] bg-[#FFF] bottom-0'>
                            <h2 className='text-[#252525] text-3.5 font-500 lh-6 mt-8 ml-4'>订阅管理</h2>
                            <div className='flex justify-between mt-6 ml-4 mr-4 mb-4'>
                                <div className='text-3.25 font-400 lh-6 flex justify-center'>
                                    <button className={`w-15 h-6 border-rd-2 ${selectedButton === 1 ? 'bg-[rgba(69,225,184,0.20)] text-[#1DB48D]' : 'color-#999999 bg-#F5F7FB'}`} onClick={() => handleButtonClick(1, 'column')}>专栏</button>
                                    <button className={`w-15 h-6 ml-6 border-rd-2 ${selectedButton === 2 ? ' bg-[rgba(69,225,184,0.20)] text-[#1DB48D]' : 'color-#999999 bg-#F5F7FB'}`} onClick={() => handleButtonClick(2, 'class')} >小课</button>
                                </div>
                                <button onClick={handleManage} className='text-[#1DB48D] text-3.25 font-400 lh-6'>{manage ? '保存' : '管理'}</button>
                            </div>
                            {transactionType === 'column'
                                && (<ManagementColumn manage={manage} ref={saveColumn}/>)
                            }
                            {transactionType === 'class'
                                && (<ManagementClass manage={manage} />)}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SubscribeManage;