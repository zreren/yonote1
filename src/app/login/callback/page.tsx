"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import {api} from "@/trpc/react";
import Image from "next/image";

const LoginCallback = () => {
  const searchParams = useSearchParams();
  //这个地址是提前给微信登录接口重定向，默认微信那边会传回code和state两个query参数，通过useSearchParams可以拿到
  const code = searchParams.get("code");
  const res = api.users.login.useQuery({
    code:code!
  })


  return (
    <div>
      <h1>
        {
        res.data
            ?
            <div>
                 {res.data.avatar ? <Image src={res.data.avatar} alt={"avatar"} priority width={100} height={100}/> : <span></span> }
               <div>{res.data.name}</div>
            </div>
            :
            <div>登录中</div>
      }
      </h1>
    </div>
  );
};
export default function Page() {
  return (
    <Suspense>
      <LoginCallback></LoginCallback>
    </Suspense>
  );
}
