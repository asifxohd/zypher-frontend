import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { TbReportAnalytics } from "react-icons/tb";
import { AiOutlineUser, AiOutlineHeart } from "react-icons/ai";
import { FiMessageSquare, FiFolder, FiShoppingCart } from "react-icons/fi";
import { Link, Outlet, useLocation } from "react-router-dom";
import StartupProfile from "./StartupProfile";

const StartupLanding = () => {
    const menus = [
        { name: "Business Profile", link: "/startup-home", icon: AiOutlineUser},
		{ name: "Investors", link: "/startup-home", icon: MdOutlineDashboard },
        { name: "Messages", link: "/startup-home", icon: AiOutlineUser },
        { name: "Meetings", link: "/startup-home", icon: FiMessageSquare },
        { name: "Startups", link: "/startup-home", icon: TbReportAnalytics, margin: true },
        { name: "Join Meetings", link: "/startup-home", icon: FiFolder },
        { name: "Notifications", link: "/startup-home", icon: FiShoppingCart },
        { name: "Settings", link: "/startup-home", icon: AiOutlineHeart, margin: true },
        
    ];
    const [open, setOpen] = useState(true);
    const location = useLocation();
    return (
        <section className="flex gap-6">
            <div
                className={`bg-[#0e0e0e] fixed  h-screen  ${open ? "w-72" : "w-16"
                    } duration-500 text-gray-100 px-4`}
            >
                <div className="py-3 flex justify-end">
                    <HiMenuAlt3
                        size={26}
                        className="cursor-pointer"
                        onClick={() => setOpen(!open)}
                    />
                </div>
                <div className="mt-4 flex flex-col gap-4 relative">
                    {menus?.map((menu, i) => (
                        <Link
                            to={menu?.link}
                            key={i}
                            className={` ${menu?.margin && "mt-5"
                                } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
                        >
                            <div>{React.createElement(menu?.icon, { size: "20" })}</div>
                            <h2
                                style={{
                                    transitionDelay: `${i + 3}00ms`,
                                }}
                                className={`whitespace-pre duration-500 ${!open ? "opacity-0 translate-x-28 overflow-hidden" : ""
                                    }`}
                            >
                                {menu?.name}
                            </h2>
                            <h2
                                className={`absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit ${open && "hidden"
                                    }`}
                            >
                                {menu?.name}
                            </h2>
                        </Link>
                    ))}
                </div>
            </div>
            <div className={`${open? "m-3 mr-10 text-xl w-full ml-80" : "m-3 mr-10 ml-24 text-xl w-full"}`}>
                {location.pathname === "/startup-home" ? <StartupProfile/> : <Outlet/>}
            </div>
        </section>
    );
};

export default StartupLanding;
