"use client"
import Image from "next/image";
import {api} from "@/trpc/react";
import useLocalStorage from "@/tools/useStore";
import {useRef, useState, useEffect} from "react";
import OSS from "ali-oss";

const UserMessage = () => {
    let userInfo;
    const [token] = useLocalStorage("token", null);
    const [isEditing, setIsEditing] = useState(false);
    const [editingPhone, setEditingPhone] = useState(userInfo?.phone);

    if (token) {
        userInfo = api.users.getOne.useQuery({id: token}).data;
    }

    const fileInputRef = useRef(null);
    const phoneInputRef = useRef(null); // 添加对输入框的引用

    let client = new OSS({
        region: 'oss-cn-shenzhen',
        accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY_ID,
        accessKeySecret: process.env.NEXT_PUBLIC_ACCESS_KEY_SECRET,
        stsToken: process.env.NEXT_PUBLIC_STS_TOKEN,
        bucket: process.env.NEXT_PUBLIC_BUCKET
    });

    const updateAvatarApi = api.users.updateAvatar.useMutation({
        onSuccess: (r) => {}
    });

    const updatePhoneApi = api.users.updatePhone.useMutation({
        onSuccess: () => {
            console.log('手机号码修改成功');
        }
    });

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            try {
                const result = await client.put(file.name, file);
                updateAvatarApi.mutate({id: token, avatar: result.url});
                userInfo.avatar = result.url;
            } catch (err) {
                console.error('Upload error:', err);
            }
        }
    };

    const handlePhoneButtonClick = () => {
        setIsEditing(true);
    };

    useEffect(() => {
        if (isEditing && phoneInputRef.current) {
            phoneInputRef.current.focus();
        }
    }, [isEditing]);

    const validatePhoneNumber = (phone) => {
        return /^\d{1,11}$/.test(phone);
    };

    const handlePhoneInputChange = (e) => {
        const newPhone = e.target.value;
        setEditingPhone(newPhone);
    };

    const handleSavePhone = () => {
        if (validatePhoneNumber(editingPhone) && editingPhone.length === 11) {
            updatePhoneApi.mutate({id: token, phone: editingPhone.toString()});
            userInfo.phone = editingPhone;
            setEditingPhone(userInfo?.phone);
            setIsEditing(false);
        } else {
            alert('请输入正确的手机号码');
        }
    };

    const handleBlur = () => {
        const confirmed = confirm('是否保存修改的手机号码？');
        if (confirmed) {
            handleSavePhone();
        } else {
            setIsEditing(false);
            setEditingPhone(userInfo?.phone);
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    return (
        <div>
            <Image src={userInfo?.avatar ? userInfo?.avatar : "/image/user/Loading.svg"} alt={"头像"} width={"128"} height={"128"}
                   className={"mt-6.75 rounded-full mx-auto w-16 h-16"}/>

            <div className={"flex items-center w-19.5 h-6 shrink-0 border-rd-4 bg-[#45E1B8] mx-auto pl-2.5"}>
                <Image className={"w-3.477 h-3.477 "} src={"/images/user/Edit.svg"} alt={"头像"} width={"10"} height={"10"}/>
                <button className="w-10 ml-1.25 text-[#252525] text-2.5 font-500 lh-6" onClick={handleButtonClick}>
                    修改头像
                </button>
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{display: 'none'}}
                    onChange={handleFileChange}
                />
            </div>

            <div className={"ml-4 mt-11.75"}>
                <div className={"flex items-center mb-5"}>
                    <p className={"w-14 text-[#252525] text-3.5 font-500 lh-6"}>用户名</p>
                    <span className={"pl-15 flex-1 text-3.5 font-400"}>{userInfo?.name}</span>
                    <Image className={"w-3 h-3 shrink-0 mr-3.25"} src={"/images/user/RightArrow.svg"} alt={"RightArrow"} width={"10"} height={"10"}/>
                </div>
                <div className={"flex items-center mb-5"}>
                    <p className={"w-14 text-[#252525] text-3.5 font-500 lh-6"}>用户ID</p>
                    <span className={"pl-15 text-3.5 font-400"}>{userInfo?.idNumber}</span>
                </div>
                <div className={"flex items-center"}>
                    <p className={"w-14 text-[#252525] text-3.5 font-500 lh-6"}>手机号</p>
                    <div className='flex items-center flex-1'>
                        {isEditing ? (
                            <input
                                type="text"
                                className='w-full pl-15 text-3.5 font-400'
                                value={editingPhone}
                                onChange={handlePhoneInputChange}
                                onBlur={handleBlur} // 绑定 onBlur 事件
                                ref={phoneInputRef} // 绑定引用
                            />
                        ) : (
                            <span className='flex-1 pl-15 text-3.5 font-400'>
                                {userInfo?.phone}
                            </span>
                        )}
                        {!isEditing && (
                            <button className="w-10 ml-2.5 text-[#252525] text-2.5 font-500 lh-6"
                                    onClick={handlePhoneButtonClick}>
                                修改
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default UserMessage;
