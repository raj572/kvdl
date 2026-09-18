import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { adminLogout } from "../../services/api";

const AdminSidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const currentPath = location.pathname;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleLogout = async () => {
        await adminLogout();
        navigate("/admin/login");
    };

    const navItems = [
        { name: "Dashboard", path: "/admin/dashboard" },
        { name: "Blogs", path: "/admin/blogs/manage", matcher: "/admin/blogs" },
        { name: "Podcasts", path: "/admin/podcasts" },
        { name: "Inquiries", path: "/admin/contacts" },
        { name: "Careers", path: "/admin/careers" },
    ];

    const closeMobileMenu = () => setMobileMenuOpen(false);

    return (
        <>
            {/* Mobile Hamburger Button */}
            <div className="lg:hidden fixed top-[18px] left-5 z-50">
                <button
                    className={`burger flex justify-center items-center w-10 h-10 transition-all duration-300 cursor-pointer ${mobileMenuOpen ? "active" : ""} before:!bg-black after:!bg-black before:!w-5 after:!w-5 relative`}
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle menu"
                    style={{ top: '1px' }}
                ></button>
            </div>

            {/* Mobile Overlay */}
            {mobileMenuOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
                    onClick={closeMobileMenu}
                />
            )}

            {/* Mobile Sidebar */}
            <aside
                className={`lg:hidden fixed left-0 top-0 h-full w-64 bg-black text-white border-r border-white/10 flex flex-col z-50 shadow-2xl transition-transform duration-300 ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                {/* Logo Area */}
                <div className="p-8 border-b border-white/10">
                    <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-primary">
                        Admin Panel
                    </p>
                    <h1 className="text-3xl font-[arkhip] text-white mt-2 tracking-wide">
                        KVDL
                    </h1>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 py-8 space-y-3">
                    {navItems.map((item) => {
                        const isActive = item.matcher
                            ? currentPath.startsWith(item.matcher)
                            : currentPath.startsWith(item.path);
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={closeMobileMenu}
                                className={`flex items-center w-full px-6 py-4 rounded-xl text-sm font-bold uppercase tracking-widest transition-colors duration-200
                                    ${isActive
                                        ? "bg-primary text-black shadow-lg"
                                        : "text-gray-400 hover:text-white hover:bg-white/10"
                                    }`
                                }
                            >
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                {/* Actions Area */}
                <div className="p-8 border-t border-white/10 space-y-3">
                    <Link
                        to="/"
                        onClick={closeMobileMenu}
                        className="flex items-center justify-center w-full px-6 py-3 border-2 border-white/20 text-white hover:bg-white/10 hover:border-white/40 rounded-xl text-xs font-bold uppercase tracking-widest transition-all"
                    >
                        View Landing Page
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="w-full px-6 py-3 border-2 border-white/20 text-white hover:bg-red-600 hover:border-red-600 rounded-xl text-xs font-bold uppercase tracking-widest transition-all"
                    >
                        Logout
                    </button>
                </div>
            </aside>

            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex fixed left-0 top-0 h-full w-64 bg-black text-white border-r border-white/10 flex-col z-50 shadow-2xl">
                {/* Logo Area */}
                <div className="p-8 border-b border-white/10">
                    <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-primary">
                        Admin Panel
                    </p>
                    <h1 className="text-3xl font-[arkhip] text-white mt-2 tracking-wide">
                        KVDL
                    </h1>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 py-8 space-y-3">
                    {navItems.map((item) => {
                        const isActive = item.matcher
                            ? currentPath.startsWith(item.matcher)
                            : currentPath.startsWith(item.path);
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center w-full px-6 py-4 rounded-xl text-sm font-bold uppercase tracking-widest transition-colors duration-200
                                    ${isActive
                                        ? "bg-primary text-black shadow-lg"
                                        : "text-gray-400 hover:text-white hover:bg-white/10"
                                    }`
                                }
                            >
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                {/* Actions Area */}
                <div className="p-8 border-t border-white/10 space-y-3">
                    <Link
                        to="/"
                        className="flex items-center justify-center w-full px-6 py-3 border-2 border-white/20 text-white hover:bg-white/10 hover:border-white/40 rounded-xl text-xs font-bold uppercase tracking-widest transition-all"
                    >
                        View Landing Page
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="w-full px-6 py-3 border-2 border-white/20 text-white hover:bg-red-600 hover:border-red-600 rounded-xl text-xs font-bold uppercase tracking-widest transition-all"
                    >
                        Logout
                    </button>
                </div>
            </aside>
        </>
    );
};

export default AdminSidebar;
