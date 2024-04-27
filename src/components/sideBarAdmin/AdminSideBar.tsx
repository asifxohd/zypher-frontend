import { FcSalesPerformance, FcBusinessContact, FcMoneyTransfer } from "react-icons/fc";
import { Link } from 'react-router-dom';




const AdminSideBar: React.FC = () => {
    return (
        <>
            <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200  :border-gray-700">
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center py-4 justify-start rtl:justify-end">
                            <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 :text-gray-400 :hover:bg-gray-700 :focus:ring-gray-600">
                                <span className="sr-only">Open sidebar</span>
                                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                                </svg>
                            </button>
                            <div className="flex ms-2 md:me-24">
                                <img className="h-10 relative  pl-2" src="/zephyr-icon.png" alt="" />
                                <span className=" tracking-widest self-center text-xl absolute pl-12 sm:text-2xl whitespace-nowrap :text-white -pl- font-thin pt-2">EPHYR</span>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="flex items-center ms-3">
                                <div>
                                    <button type="button" className="flex mr-6 text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 :focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                                        <span className="sr-only">Open user menu</span>
                                        <img className="w-10 h-10  rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="user photo" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0  :border-gray-700" aria-label="Sidebar">
                <div className="h-full px-6 mt-10  pb-4 overflow-y-auto bg-white ">
                    <ul className="space-y-2 font-medium">
                        <Link to="/admin-dashboard">
                            <li>
                                <div className="flex items-center p-2 text-gray-900 rounded-lg :text-white hover:bg-gray-100 :hover:bg-gray-700 group">
                                    <img className="h-7" src="https://cdn-icons-png.flaticon.com/512/6821/6821002.png" alt="" />
                                    <span className="ms-3">Dashboard</span>
                                </div>

                            </li>
                        </Link>

                        <Link to="/admin-salesreport">
                            <li>

                                <div className="flex items-center p-2 text-gray-900 rounded-lg :text-white hover:bg-gray-100 :hover:bg-gray-700 group">
                                    <FcSalesPerformance size={28} />

                                    <span className="ms-3">Sales Report</span>
                                </div>

                            </li>
                        </Link>

                        <Link to="/admin-investors">
                            <li>

                                <div className="flex items-center p-2 text-gray-900 rounded-lg :text-white hover:bg-gray-100 :hover:bg-gray-700 group">
                                    <img className="h-7" src="https://cdn-icons-png.flaticon.com/512/2175/2175558.png" alt="" />
                                    <span className="ms-3">Investors</span>
                                </div>


                            </li>
                        </Link>
                        <Link to="/admin-startups">
                            <li>

                                <div className="flex items-center p-2 text-gray-900 rounded-lg :text-white hover:bg-gray-100 :hover:bg-gray-700 group">
                                    <FcBusinessContact size={28} />
                                    <span className="ms-3">Startups</span>
                                </div>


                            </li>
                        </Link>
                        <Link to="/admin-subscriptions">
                            <li>

                                <div className="flex items-center p-2 text-gray-900 rounded-lg :text-white hover:bg-gray-100 :hover:bg-gray-700 group">
                                    <FcMoneyTransfer size={28} color="gray" />
                                    <span className="ms-3">Subscriptions</span>
                                </div>
                            </li>
                        </Link>


                    </ul>
                    <div className="flex items-center pt-64 p-2 text-gray-900 rounded-lg :text-white hover:bg-gray-100 :hover:bg-gray-700 group">
                        <img className="h-7" src="https://static.vecteezy.com/system/resources/previews/032/058/241/non_2x/exit-icon-logout-3d-illustration-rendering-transparent-png.png" alt="" />
                        <span className="flex-1 ms-3 whitespace-nowrap">Log Out</span>
                    </div>
                </div>

            </aside>


        </>
    );
}

export default AdminSideBar