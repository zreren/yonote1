import React from "react";
import Image from "next/image";
import ColumnPopup from "./ColumnPopup";
import { useState } from "react";
import { useEffect } from "react";

const Column = () => {
    const name = "专栏名称";
    const images = [
        '/images/writer/edit/Rectangle 2497.svg',
        '/images/writer/edit/Rectangle 2497.svg',
        '/images/writer/edit/Rectangle 2497.svg',
        '/images/writer/edit/Rectangle 2497.svg',
        '/images/writer/edit/Mask group.svg',
        '/images/writer/edit/Mask group.svg',
        '/images/writer/edit/Mask group.svg',
        '/images/writer/edit/Mask group.svg',
        '/images/writer/edit/Rectangle 2497.svg',
        '/images/writer/edit/Rectangle 2497.svg',
        '/images/writer/edit/Rectangle 2497.svg',
        '/images/writer/edit/Rectangle 2497.svg',
        '/images/writer/edit/Mask group.svg',
        '/images/writer/edit/Mask group.svg',
        '/images/writer/edit/Mask group.svg',
        '/images/writer/edit/Mask group.svg',
      ];
    
      // 当前图像的路径
    const [currentImage, setCurrentImage] = useState(images[0]);
    
    const handleImageClick = (index: number) => {
        console.log(`Clicked on image at index: ${index}`);
        const handleChangeImage = () => {
            // 根据需求设置新的图像路径
            setCurrentImage(images[index]);
        };
        handleChangeImage();
        setShowColumnPopup(!showColumnPopup);
    };

    const [showColumnPopup, setShowColumnPopup] = useState(false);
   


    
    return (
        <div>
            <div className="w-14.5 h-18.75 shrink-0 border-rd-1.25 bg-#fff flex" onClick={() => setShowColumnPopup(!showColumnPopup)}>
                <Image src={currentImage || ''} alt="" width={58} height={75} className="w-14.5 h-18.75 shrink-0 border-rd-1.25"></Image>
                <div className="mt-3">
                    <button>
                        <Image src={"/images/writer/edit/Switch.svg"} alt={""} width={14.09} height={14} className={"w-3.52225 h-3.5 shrink-0 ml-2"}></Image>
                    </button>
                    <div className="w-14.08925 text-[#323232] text-3.5 font-not-italic font-400 lh-6 ml-2 mt-2">
                        {name}
                    </div>
                </div>
            </div>
            <div className="left-308px top-59px absolute">
            {showColumnPopup && <ColumnPopup images={images} onImageClick={handleImageClick} />}
            </div>
        </div>
    );
}

export default Column;