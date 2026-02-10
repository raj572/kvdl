import { Menu, X } from "lucide-react";
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
        { name: "Inquiries", path: "/admin/contacts" },
        { name: "Careers", path: "/admin/careers" },
    ];

    const closeMobileMenu = () => setMobileMenuOpen(false);

    return (
        <>
            {/* Mobile Hamburger Button */}
            <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden fixed top-4 right-4 z-50 bg-black text-white p-3 rounded-xl shadow-lg hover:bg-primary hover:text-black transition-all"
                aria-label="Toggle menu"
            >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

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

                {/* Logout Area */}
                <div className="p-8 border-t border-white/10">
                    <button
                        onClick={handleLogout}
                        className="w-full px-6 py-4 border-2 border-white/20 text-white hover:bg-red-600 hover:border-red-600 rounded-xl text-xs font-bold uppercase tracking-widest transition-all"
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

                {/* Logout Area */}
                <div className="p-8 border-t border-white/10">
                    <button
                        onClick={handleLogout}
                        className="w-full px-6 py-4 border-2 border-white/20 text-white hover:bg-red-600 hover:border-red-600 rounded-xl text-xs font-bold uppercase tracking-widest transition-all"
                    >
                        Logout
                    </button>
                </div>
            </aside>
        </>
    );
};

export default AdminSidebar;
