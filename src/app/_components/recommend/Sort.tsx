// import exp from "constants"
// import Image from "next/image"
//
// const Sort =()=> {
//     const [activeCategory, setActiveCategory] = useState<string | null>(null);
//
//     const handleCategoryClick = (category:string) => {
//         setActiveCategory(category);
//     };
//
//     const getCategoryStyle = (category:string ) => {
//         if (category === activeCategory) {
//             return {
//                 backgroundColor: 'rgba(69,225,184,0.20)',
//                 color: '#1DB48D'
//             };
//         } else {
//             return {
//                 backgroundColor: '#FFFFFF',
//                 color: '#999'
//             };
//         }
//     };
//     return(
//         <div>
//             <div className="flex w-full h-6 ">
//                 <div>
//                     <div className="flex">
//                         <div
//                             className="h-6 shrink-0 text-center text-[#1DB48D] text-3.25 font-not-italic font-400 lh-6 border-rd-1 px-9px"
//                             onClick={() => handleCategoryClick("默认")}
//                             style={getCategoryStyle("默认")}
//                         >
//                             默认
//                         </div>
//                         <div
//                             className="h-6 shrink-0 ml-5px text-center text-[#999] text-3.25 font-not-italic font-400 lh-6 border-rd-1 px-9px"
//                             onClick={() => handleCategoryClick("订阅量")}
//                             style={getCategoryStyle("订阅量")}
//                         >
//                             订阅量
//                         </div>
//                         <div
//                             className="h-6 shrink-0 ml-5px text-center text-[#999] text-3.25 font-not-italic font-400 lh-6 border-rd-1 px-9px"
//                             onClick={() => handleCategoryClick("内容量")}
//                             style={getCategoryStyle("内容量")}
//                         >
//                             内容量
//                         </div>
//                         <div
//                             className="h-6 shrink-0 ml-5px text-center text-[#999] text-3.25 font-not-italic font-400 lh-6 border-rd-1 px-9px"
//                             onClick={() => handleCategoryClick("最近发布")}
//                             style={getCategoryStyle("最近发布")}
//                         >
//                             最近发布
//                         </div>
//                         <div
//                             className="h-6 shrink-0 ml-5px text-center text-[#999] text-3.25 font-not-italic font-400 lh-6 border-rd-1 px-9px"
//                             onClick={() => handleCategoryClick("创作时间")}
//                             style={getCategoryStyle("创作时间")}
//                         >
//                             创作时间
//                         </div>
//                     </div>
//                 </div>
//             </div>
//
//             <div className="flex">
//                 <div className=" mt-2 text-[#B5B5B5] text-2.5 font-400 lh-6">默认倒序排序</div>
//                 <button>
//                     <Image src={"/images/recommend/sort.svg"} alt={"sort"} width={12} height={12} className="w-3 h-3 mt-1.5 ml-1.25"/>
//                 </button>
//
//             </div>
//         </div>
//
//
//     )
// }
// export default Sort;