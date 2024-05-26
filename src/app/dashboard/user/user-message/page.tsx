"use client"
import Image from "next/image";
import {api} from "@/trpc/react";
import useLocalStorage from "@/tools/useStore";
import {useRef} from "react";
import OSS from "ali-oss";
const UserMessage = () => {
    let userInfo;
    const [token] =   useLocalStorage("token", null);
    if (token) {
        userInfo = api.users.getOne.useQuery({id:token}).data
    }
    const fileInputRef = useRef(null);
    let client = new OSS({
        region: 'oss-cn-shenzhen',
        //云账号AccessKey有所有API访问权限，建议遵循阿里云安全最佳实践，部署在服务端使用RAM子账号或STS，部署在客户端使用STS。
        accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY_ID,
        accessKeySecret: process.env.NEXT_PUBLIC_ACCESS_KEY_SECRET,
        stsToken: process.env.NEXT_PUBLIC_STS_TOKEN,
        bucket: process.env.NEXT_PUBLIC_BUCKET
    });
    const updateAvatarApi = api.users.updateAvatar.useMutation({
        onSuccess: (r) => {
        }
    })
    // 处理文件选择
    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            try {
                const result = await client.put(file.name, file);
                updateAvatarApi.mutate({id:token,avatar:result.url})
                userInfo.avatar = result.url
            } catch (err) {
                console.error('Upload error:', err);
            }
        }
    };
    // 触发文件输入框
    const handleButtonClick = () => {
        fileInputRef.current.click();
    };
    return (
        <div>
            {/*头像*/}

            <Image src={userInfo?.avatar ?? "/image/user/Loading.svg"} alt={"头像"} width={"128"} height={"128"}
                   className={"mt-6.75 rounded-full mx-auto w-16 h-16"}/>

            {/*修改头像*/}
            <div className={"flex items-center w-19.5 h-6 shrink-0 border-rd-4 bg-[#45E1B8] mx-auto pl-2.5"}>
                <Image className={"w-3.477 h-3.477 "} src={"/images/user/Edit.svg"} alt={"头像"} width={"10"}
                       height={"10"}/>
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

            {/*用户信息*/}
            <div className={"ml-4 mt-11.75"}>
                <div className={"flex"}><p className={"w-14 text-[#252525] text-3.5 font-500 lh-6"}>用户名</p><span
                    className={"pl-15 flex-1  text-3.5 font-400"}>{userInfo?.name}</span><Image className={"w-3 h-3 shrink-0 mr-3.25"} src={"/images/user/RightArrow.svg"} alt={"RightArrow"} width={"10"} height={"10"}/></div>
                <div className={"mt-5.5 flex"}><p className={"w-14 text-[#252525] text-3.5 font-500 lh-6"}>用户ID</p><span className={"pl-15  text-3.5 font-400"}>1314wfa2</span></div>
                <div className={"mt-5.5 flex"}><p className={"w-14 text-[#252525] text-3.5 font-500 lh-6"}>手机号</p><span className={"pl-15  text-3.5 font-400"}>15293663718</span></div>
            </div>
        </div>


    )
}
export default UserMessage
