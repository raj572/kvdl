import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar";

const AdminLayout = () => {
    return (
        <div className="min-h-screen bg-[#f8f0dd] text-[#0a0a0a] font-[sansation]">
            <AdminSidebar />
            <main className="lg:ml-64 p-4 md:p-6 lg:p-8 min-h-screen">
                <div className="max-w-7xl mx-auto pt-4 md:pt-6 lg:pt-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
