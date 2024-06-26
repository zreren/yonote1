import Image from "next/image";
import { SpecialColumnBody } from "@/app/_components/special-column/SpecialColumnBody";
import { SpecialColumnHeader } from "@/app/_components/special-column/SpecialColumnHeader";
import { Suspense } from "react";

const Page = () => {


    return (
        <div className={"w-full bg-[#F5F7FB]"}>
            <div className={"w-full relative"}>
                <div className={"w-full"}>
                    <SpecialColumnHeader></SpecialColumnHeader>
                </div>
                {/*专栏主体*/}
                <div className={"w-full absolute z-2 top-37"}>
                    <SpecialColumnBody></SpecialColumnBody>
                </div>
            </div>
        </div>
    )
}

export default Page;
