import { useState, useEffect } from 'react';
import { useNavigate, Link, Outlet, useLocation } from 'react-router-dom';
import {
  Image as ImageIcon,
  Menu,
  X,
  LogOut,
  ChevronLeft,
  Bell,
} from 'lucide-react';

/**
 * Admin panel layout: sidebar navigation + top bar + localStorage auth guard.
 *
 * @param {object} props
 * @param {Array}  props.menuItems - [{ name, path, icon }] where icon is a lucide component.
 * @param {string} [props.brandName='Admin'] - Sidebar brand text.
 * @param {string} [props.loginPath='/admin/login'] - Redirect target when not logged in.
 * @param {string} [props.dashboardPath='/admin/dashboard'] - Brand link target.
 * @param {string} [props.userStorageKey='admin_user'] - localStorage key for the user object.
 * @param {string} [props.tokenStorageKey='admin_token'] - localStorage key for the auth token.
 * @param {string} [props.siteUrl='/'] - "View website" link target.
 */
const AdminLayout = ({
  menuItems = [],
  brandName = 'Admin',
  loginPath = '/admin/login',
  dashboardPath = '/admin/dashboard',
  userStorageKey = 'admin_user',
  tokenStorageKey = 'admin_token',
  siteUrl = '/',
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [adminUser, setAdminUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Auth guard: redirect to login when no stored user
    const user = localStorage.getItem(userStorageKey);
    if (!user) {
      navigate(loginPath);
    } else {
      setAdminUser(JSON.parse(user));
    }
  }, [navigate, loginPath, userStorageKey]);

  const handleLogout = () => {
    localStorage.removeItem(tokenStorageKey);
    localStorage.removeItem(userStorageKey);
    navigate(loginPath);
  };

  if (!adminUser) return null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex">
      {/* SIDEBAR */}
      <aside
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } bg-slate-900 border-r border-slate-800 transition-all duration-300 flex flex-col fixed h-full z-50`}
      >
        {/* Sidebar Header */}
        <div className="p-6 flex items-center justify-between">
          {isSidebarOpen && (
            <Link to={dashboardPath} className="text-xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              {brandName}
            </Link>
          )}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors mx-auto"
            aria-label={isSidebarOpen ? 'Tutup sidebar' : 'Buka sidebar'}
          >
            {isSidebarOpen ? <ChevronLeft className="w-5 h-5" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Sidebar Nav */}
        <nav className="flex-1 px-3 space-y-1 mt-4 overflow-y-auto custom-scrollbar">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? 'bg-green-800 text-white shadow-lg shadow-green-900/20'
                    : 'hover:bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {isSidebarOpen && <span className="font-medium text-sm">{item.name}</span>}
              </Link>
            );
          })}

          <div className="pt-4 mt-4 border-t border-slate-800">
             <a
                href={siteUrl}
                target="_blank"
                className="flex items-center gap-4 px-4 py-3 rounded-xl text-blue-400 hover:bg-blue-500/10 transition-all"
             >
                <ImageIcon className="w-5 h-5 flex-shrink-0" />
                {isSidebarOpen && <span className="font-medium text-sm">Lihat Website</span>}
             </a>
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {isSidebarOpen && <span className="font-medium text-sm">Logout</span>}
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
        {/* Top Navbar */}
        <header className="h-16 bg-slate-900/50 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-8 sticky top-0 z-40">
          <h2 className="text-lg font-semibold text-white">
            {menuItems.find(m => m.path === location.pathname)?.name || 'Admin'}
          </h2>

          <div className="flex items-center gap-6">
            <button className="relative p-2 text-slate-400 hover:text-white transition-colors" aria-label="Notifikasi">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-slate-900"></span>
            </button>
            <div className="flex items-center gap-3 pl-6 border-l border-slate-800">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-white">{adminUser.name}</p>
                <p className="text-xs text-slate-500">Administrator</p>
              </div>
              <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-green-400 font-bold border border-slate-700">
                {adminUser.name.charAt(0)}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
