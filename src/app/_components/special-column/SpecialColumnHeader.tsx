"use client";
import Image from "next/image";
import { api } from "@/trpc/react";
import { useSearchParams } from "next/navigation";
import Loading from "../common/Loading";
import {useRouter} from "next/navigation";
import { PathnameContext } from "next/dist/shared/lib/hooks-client-context.shared-runtime";




export const SpecialColumnHeader = () => {
  const params = useSearchParams();
  const columnId = params.get("id");
  const userId = api.column.getUserId.useQuery({
    id: columnId,
  });

  const { data: user, isFetching } = api.users?.getOne.useQuery({
    id: userId.data,
  });


  const column = api.column.getColumnDetail.useQuery({
    columnId: columnId,
  }).data;

  //
  const router = useRouter();
  const link = () => {
    if (column){
      router.push(
         `/poster/specialCol?id=${column.id}`
    )}
    
};
//

  return (
    <>
      <div className={"w-full absolute top-0 z-1 filter blur-sm"}>
        <Image
          src={"/images/special-column/Cardpc.png"}
          alt={"bg"}
          width={375}
          height={74.5}
          style={{ width: "100%" }}
        />
        <div className="absolute inset-0 bg-black opacity-20"></div>
      </div>
      <div className={"w-full absolute top-2.5 left-0 z-3"}>
        <div className={"flex justify-end items-center"}>
          <div
            className={
              "inline-block w-14.25 h-6 text-[#252525] shrink-0 bg-#5CE5C1 text-2.5 font-500 lh-6 text-center rounded-10px"
            }
          >
            加速计划
          </div>
          {/* <div className={"inline-block ml-10px mr-16px"}>
            <Image
              src={"/images/special-column/Share-two (分享2).png"}
              alt={"分享"}
              width={12}
              height={12}
            />
          </div> */}
          {/* 点击分享，跳转海报 */}
          <button className={"inline-block ml-10px mr-16px"} onClick={link}>
            <Image
              src={"/images/special-column/Share-two (分享2).png"}
              alt={"分享"}
              width={12}
              height={12}
            />
          </button>

        </div>

        {isFetching ? (
          <div className="pt-5">
            <Loading></Loading>
          </div>
        ) : (
          <div className={"flex  mt-10px w-full"}>
            {/* <div className={"ml-20px  w-28.5 h-30 overflow-hidden"}>
              <Image
                // src={column.data?.logo ?? "/images/user/Loading.svg"}
                src={column?.logo}
                className="object-cover"
                width={140}
                height={160}
                alt=""
                style={{ width: "100%", objectFit: "cover" }}
                unoptimized
              />
            </div> */}

            <div
              className={
                "ml-20px  w-28 h-33 overflow-hidden mr-2.5 bg-#f2f2f2 rounded-10px shrink-0"
              }
            >
              <Image
                className="object-cover"
                src={column?.logo?column?.logo:"/images/recommend/cover.svg"}
                width={140}
                height={160}
                alt=""
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                unoptimized
              />
            </div>

            <div className={"flex flex-col ml-10px space-y-0 "}>
              <div
                className={"text-[#FFF] text-4.5 font-not-italic font-500 lh-6"}
              >
                {column?.name?(
                    column?.name.length >= 10
                    ? column?.name.substring(0, 10) + "..."
                    : column?.name):
                    "未知专栏"}
              </div>
              <div
                className={
                  " text-[#F2F2F2] text-3.5 font-not-italic font-400 lh-[120%] pt-5px h-10 w-50"
                }
              >
                {column?.description?(
                    column?.description?.length >= 20
                    ? column?.description.substring(0, 20) + "..."
                    : column?.description):
                    "暂时没有数据"}
              </div>
              <div className={"flex pt-8px "}>
                <Image src={user?.avatar?user?.avatar:"/images/recommend/cover.svg"} alt={""} width={18} height={18} />
                <div
                  className={
                    "text-[#DFDFDF] text-2.75 font-not-italic font-500 lh-18px ml-5px"
                  }
                >
                  {user?.name?user?.name:"未知用户"}
                </div>
                <Image
                  src={"/images/special-column/Group 225.png"}
                  alt={""}
                  width={12}
                  height={12}
                  className={"lh-0"}
                  style={{ objectFit: "none", marginLeft: "5px" }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
