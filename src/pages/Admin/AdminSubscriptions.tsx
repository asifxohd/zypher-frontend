import AdminSideBar from "../../components/sideBarAdmin/AdminSideBar";

const AdminSubscriptions :React.FC = () => {
    return (
        <>
            <AdminSideBar />
            <div className="p-4 sm:ml-64">
                <div className='p-5 mt-20 h-20' >
                    <h2 className="text-2xl font-bold text-gray-600">Subscriptions</h2>
                    <p className="text-xs">&nbsp;Home/<span className="font-bold text-xs"> Subscriptions</span></p>
                </div>

            </div>

        </>
    );
}

export default AdminSubscriptions