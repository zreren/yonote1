import React from "react";
import "./writer.css";
import Compass from "@/app/_components/writer/Compass";
import LeftCompass from "@/app/_components/writer/LeftCompass";
import useLocalStorage from "@/tools/useStore";

const dialogLayout = ({children}: { children: React.ReactNode }) => {
    if (typeof window !== 'undefined') {
        const [token] = useLocalStorage("token", null);
        if (!token) {
            window.location.href = "/writer/login"
        }

    }
    return (
        <html>
        {/* <Script src="http://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js" /> */}
        <body>
        <div className="w-full min-h-screen bg-[#F6F6F6]">
            <Compass></Compass>
            <div className="flex w-100%">
                <LeftCompass></LeftCompass>
                <div className="w-full pl-69.12 pt-21.5 pb-10 pr-8">{children}</div>
            </div>
        </div>
        </body>
        </html>
    );
};

export default dialogLayout;
