import React from "react";
import '../writer/writer.css';
import Compass from "../_components/writer/Compass";

const dialogLayout = ({children}: { children: React.ReactNode }) => {
    return (
        <html>
        <body>
        <div>
            <Compass></Compass>
            <div className="w-full h-100vh bg-#f6f6f6 pt-21.5">
                {children}
            </div>
        </div>
        </body>
        </html>
    );
}

export default dialogLayout;
