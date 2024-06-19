import React, { useEffect, useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { TbReportAnalytics } from "react-icons/tb";
import { AiOutlineUser, AiOutlineHeart } from "react-icons/ai";
import { FiMessageSquare, FiFolder, FiShoppingCart } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import UserProfile from "./Profile";
import { CiLogout } from "react-icons/ci";
import jsCookies from 'js-cookie'


const InvestorHome = () => {
    
    const menus = [
        { name: "Media", link: "/investor", icon: AiOutlineUser},
		{ name: "Investors", link: "/investor", icon: MdOutlineDashboard },
        { name: "Messages", link: "/investor", icon: AiOutlineUser },
        { name: "Meetings", link: "/investor", icon: FiMessageSquare },
        { name: "Startups", link: "/investor", icon: TbReportAnalytics, margin: true },
        { name: "Join Meetings", link: "/investor", icon: FiFolder },
        { name: "Notifications", link: "/investor", icon: FiShoppingCart },
        { name: "Profile", link: "/investor/profile", icon: AiOutlineHeart, margin: true },
        
    ];
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);

    const handleLogout = ()=> {

        localStorage.removeItem("decodedToken");
        jsCookies.remove('accessToken');
        jsCookies.remove('refreshToken');
        navigate("/")

    }

    return (
        <section className="flex gap-6">
            <div
                className={`bg-[#0c1234] fixed  h-screen  ${open ? "w-72" : "w-16"
                    } duration-500 text-gray-100 px-4`}
                // Added margin to create a gap from edges
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

                <button onClick={handleLogout} className=" flex mt-28"><CiLogout size={28} /><span className="ml-4 mt-1">{open?"logout":''}</span></button>
                                                            
            </div>
            <div className={`${open?"ml-72":"ml-16"} text-xl mb-5 px-3 text-gray-900 font-semibold`}>
                <UserProfile/>
            </div>
        </section>
    );
};

export default InvestorHome;
