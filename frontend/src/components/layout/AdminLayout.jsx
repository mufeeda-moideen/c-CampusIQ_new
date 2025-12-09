import React, { useState } from "react";
import {
  LayoutDashboard,
  Video,
  Users,
  BookOpen,
  Building2,
  Target,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function AdminLayout({ children, handleLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { label: "Overview", icon: LayoutDashboard, path: "/admin" },
    { label: "Career Guidance", icon: Video, path: "/admin/career-guidance" },
    { label: "Colleges", icon: Building2, path: "/admin/colleges" },
    { label: "Users", icon: Users, path: "/admin/users" },
    { label: "Predictions", icon: Target, path: "/admin/predictions" },
    { label: "Reports", icon: FileText, path: "/admin/reports" },
  ];
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* ================= TOP HEADER ================= */}
      <div className="bg-white/80 backdrop-blur-lg border-b border-indigo-100 sticky top-0 z-50 shadow-sm">
        <div className="px-6 py-4 flex items-center justify-between">
          {/* Left */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-indigo-50 rounded-lg transition-all lg:hidden"
            >
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  CampusIQ Admin
                </h1>
                <p className="text-xs text-gray-600">Management Portal</p>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 bg-gray-100 rounded-lg px-4 py-2">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent border-none outline-none text-sm w-48"
              />
            </div>

            <button className="relative p-2 hover:bg-indigo-50 rounded-lg">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100 flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* ================= BODY ================= */}
      <div className="flex">
        {/* ============= SIDEBAR ============= */}
        <aside
          className={`${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } fixed lg:sticky top-[73px] left-0 h-[calc(100vh-73px)] w-64 bg-white border-r border-indigo-100 transition-transform duration-300 z-40 shadow-lg lg:translate-x-0`}
        >
          <div className="p-4 h-full overflow-y-auto">
            <nav className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive =
                  item.path === "/admin"
                    ? location.pathname === "/admin"
                    : location.pathname.startsWith(item.path);


                return (
                    <button
                    key={item.path}
                    onClick={() => {
                        navigate(item.path);
                        if (window.innerWidth < 1024) setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                        isActive
                        ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                        : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                    }`}
                    >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                    </button>
                );
                })}

            </nav>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-gray-700 hover:bg-gray-100">
                <Settings className="w-5 h-5" />
                <span>Settings</span>
              </button>
            </div>

            <div className="mt-6 p-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl text-white shadow-lg">
              <div className="text-sm mb-2 opacity-90">System Status</div>
              <div className="text-2xl font-bold mb-1">All Good ✓</div>
              <div className="text-xs opacity-80">Last updated: Just now</div>
            </div>
          </div>
        </aside>

        {/* ============= MAIN CONTENT ============= */}
        <main className="flex-1 p-6 lg:p-8 overflow-auto">
          {children}
        </main>
      </div>

      {/* ============= MOBILE OVERLAY ============= */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
