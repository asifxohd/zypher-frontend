import AdminSideBar from "../../components/sideBarAdmin/AdminSideBar";

const AdminSalesReport :React.FC = () => {
    return (
        <>
            <AdminSideBar />
            <div className="p-4 sm:ml-64">
                <div className='p-5 mt-20 h-20' >
                    <h2 className="text-2xl font-bold text-gray-600">SalesReport</h2>
                    <p className="text-xs">&nbsp;Home/<span className="font-bold text-xs"> SalesReport</span></p>
                </div>

            </div>

        </>
    );
}

export default AdminSalesReport