import React, { useState } from "react";
import {
  Users,
  Search,
  Filter,
  Plus,
  MoreVertical,
  Mail,
  Phone,
  Shield,
  ShieldCheck,
  Trash2,
  Edit3,
  Eye,
  ChevronDown,
  UserCheck,
  UserX,
  Download,
  RefreshCw,
  X,
} from "lucide-react";

const MOCK_USERS = [
  { id: 1, name: "Arjun Sharma", email: "arjun.sharma@gmail.com", phone: "+91 98765 43210", role: "Student", college: "IIT Bombay", status: "Active", joined: "Jan 12, 2024", avatar: "AS" },
  { id: 2, name: "Priya Nair", email: "priya.nair@outlook.com", phone: "+91 87654 32109", role: "Admin", college: "NIT Calicut", status: "Active", joined: "Feb 3, 2024", avatar: "PN" },
  { id: 3, name: "Rahul Menon", email: "rahul.menon@yahoo.com", phone: "+91 76543 21098", role: "Student", college: "BITS Pilani", status: "Inactive", joined: "Mar 18, 2024", avatar: "RM" },
  { id: 4, name: "Sneha Kapoor", email: "sneha.k@gmail.com", phone: "+91 65432 10987", role: "Moderator", college: "Delhi University", status: "Active", joined: "Apr 5, 2024", avatar: "SK" },
  { id: 5, name: "Vikram Iyer", email: "vikram.iyer@proton.me", phone: "+91 54321 09876", role: "Student", college: "VIT Vellore", status: "Suspended", joined: "May 22, 2024", avatar: "VI" },
  { id: 6, name: "Ananya Das", email: "ananya.das@gmail.com", phone: "+91 43210 98765", role: "Student", college: "Jadavpur University", status: "Active", joined: "Jun 9, 2024", avatar: "AD" },
  { id: 7, name: "Karthik Raj", email: "karthik.raj@icloud.com", phone: "+91 32109 87654", role: "Admin", college: "Anna University", status: "Active", joined: "Jul 14, 2024", avatar: "KR" },
  { id: 8, name: "Meera Pillai", email: "meera.p@gmail.com", phone: "+91 21098 76543", role: "Student", college: "Amrita University", status: "Inactive", joined: "Aug 30, 2024", avatar: "MP" },
];

const ROLE_COLORS = {
  Admin: "bg-purple-100 text-purple-700",
  Moderator: "bg-blue-100 text-blue-700",
  Student: "bg-indigo-100 text-indigo-700",
};

const STATUS_COLORS = {
  Active: "bg-emerald-100 text-emerald-700",
  Inactive: "bg-gray-100 text-gray-500",
  Suspended: "bg-red-100 text-red-600",
};

const AVATAR_GRADIENTS = [
  "from-indigo-400 to-purple-500",
  "from-pink-400 to-rose-500",
  "from-cyan-400 to-blue-500",
  "from-amber-400 to-orange-500",
  "from-emerald-400 to-teal-500",
  "from-violet-400 to-fuchsia-500",
  "from-sky-400 to-indigo-500",
  "from-lime-400 to-green-500",
];

function StatCard({ label, value, icon: Icon, color, sub }) {
  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 shadow-sm border border-white/80 flex items-center gap-4">
      <div className={`p-3 rounded-xl ${color}`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
        <p className="text-sm text-gray-500">{label}</p>
        {sub && <p className="text-xs text-indigo-500 font-medium mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

function UserDetailModal({ user, onClose }) {
  if (!user) return null;
  const gradIdx = user.id % AVATAR_GRADIENTS.length;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 relative animate-fade-in">
        <button onClick={onClose} className="absolute top-4 right-4 p-1.5 hover:bg-gray-100 rounded-lg">
          <X className="w-4 h-4 text-gray-500" />
        </button>
        <div className="flex flex-col items-center gap-3 mb-6">
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${AVATAR_GRADIENTS[gradIdx]} flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
            {user.avatar}
          </div>
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
            <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${ROLE_COLORS[user.role]}`}>{user.role}</span>
          </div>
        </div>
        <div className="space-y-3">
          {[
            { label: "Email", value: user.email, icon: Mail },
            { label: "Phone", value: user.phone, icon: Phone },
            { label: "College", value: user.college, icon: Shield },
            { label: "Status", value: user.status, icon: UserCheck },
            { label: "Joined", value: user.joined, icon: RefreshCw },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="flex items-center gap-3 p-3 bg-indigo-50/50 rounded-xl">
              <Icon className="w-4 h-4 text-indigo-400 shrink-0" />
              <div>
                <p className="text-xs text-gray-400">{label}</p>
                <p className="text-sm font-medium text-gray-700">{value}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-2 mt-5">
          <button className="flex-1 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl text-sm font-medium hover:opacity-90 transition">
            Edit User
          </button>
          <button className="py-2.5 px-4 bg-red-50 text-red-500 rounded-xl text-sm font-medium hover:bg-red-100 transition">
            Suspend
          </button>
        </div>
      </div>
    </div>
  );
}

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedUser, setSelectedUser] = useState(null);
  const [sortField, setSortField] = useState("name");
  const [sortAsc, setSortAsc] = useState(true);
  const [actionMenu, setActionMenu] = useState(null);

  const filtered = MOCK_USERS
    .filter((u) => {
      const q = search.toLowerCase();
      const matchQ = u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.college.toLowerCase().includes(q);
      const matchRole = roleFilter === "All" || u.role === roleFilter;
      const matchStatus = statusFilter === "All" || u.status === statusFilter;
      return matchQ && matchRole && matchStatus;
    })
    .sort((a, b) => {
      const va = a[sortField], vb = b[sortField];
      return sortAsc ? va.localeCompare(vb) : vb.localeCompare(va);
    });

  const toggleSort = (field) => {
    if (sortField === field) setSortAsc(!sortAsc);
    else { setSortField(field); setSortAsc(true); }
  };

  const activeCount = MOCK_USERS.filter(u => u.status === "Active").length;
  const adminCount = MOCK_USERS.filter(u => u.role === "Admin").length;
  const suspendedCount = MOCK_USERS.filter(u => u.status === "Suspended").length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Users</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage all registered users across the platform</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 bg-white text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-50 transition shadow-sm">
            <Download className="w-4 h-4" /> Export
          </button>
          
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total Users" value={MOCK_USERS.length} icon={Users} color="bg-gradient-to-br from-indigo-500 to-purple-600" sub="+3 this week" />
        <StatCard label="Active" value={activeCount} icon={UserCheck} color="bg-gradient-to-br from-emerald-400 to-teal-500" />
        <StatCard label="Admins" value={adminCount} icon={ShieldCheck} color="bg-gradient-to-br from-violet-400 to-fuchsia-500" />
        <StatCard label="Suspended" value={suspendedCount} icon={UserX} color="bg-gradient-to-br from-rose-400 to-red-500" />
      </div>

      {/* Filters + Search */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/80 shadow-sm p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="flex items-center gap-2 flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5">
            <Search className="w-4 h-4 text-gray-400 shrink-0" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, college..."
              className="bg-transparent outline-none text-sm w-full text-gray-700 placeholder-gray-400"
            />
          </div>
          {/* Role filter */}
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 min-w-36">
            <Filter className="w-4 h-4 text-gray-400 shrink-0" />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="bg-transparent outline-none text-sm text-gray-600 w-full cursor-pointer"
            >
              {["All", "Student", "Admin", "Moderator"].map(r => <option key={r}>{r}</option>)}
            </select>
          </div>
          {/* Status filter */}
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 min-w-36">
            <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent outline-none text-sm text-gray-600 w-full cursor-pointer"
            >
              {["All", "Active", "Inactive", "Suspended"].map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-2 ml-1">{filtered.length} user{filtered.length !== 1 ? "s" : ""} found</p>
      </div>

      {/* Table */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gradient-to-r from-indigo-50/60 to-purple-50/60">
                {[
                  { label: "User", field: "name" },
                  { label: "College", field: "college" },
                  { label: "Role", field: "role" },
                  { label: "Status", field: "status" },
                  { label: "Joined", field: "joined" },
                  { label: "", field: null },
                ].map(({ label, field }) => (
                  <th
                    key={label}
                    onClick={() => field && toggleSort(field)}
                    className={`px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider ${field ? "cursor-pointer hover:text-indigo-600 select-none" : ""}`}
                  >
                    <span className="flex items-center gap-1">
                      {label}
                      {field && sortField === field && (
                        <ChevronDown className={`w-3 h-3 text-indigo-500 transition-transform ${sortAsc ? "" : "rotate-180"}`} />
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((user, i) => {
                const gradIdx = user.id % AVATAR_GRADIENTS.length;
                return (
                  <tr
                    key={user.id}
                    className="hover:bg-indigo-50/30 transition-colors group"
                  >
                    {/* User */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${AVATAR_GRADIENTS[gradIdx]} flex items-center justify-center text-white font-semibold text-xs shadow-sm`}>
                          {user.avatar}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                          <p className="text-xs text-gray-400">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    {/* College */}
                    <td className="px-5 py-4">
                      <p className="text-sm text-gray-600">{user.college}</p>
                    </td>
                    {/* Role */}
                    <td className="px-5 py-4">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${ROLE_COLORS[user.role]}`}>
                        {user.role}
                      </span>
                    </td>
                    {/* Status */}
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-medium ${STATUS_COLORS[user.status]}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${user.status === "Active" ? "bg-emerald-500" : user.status === "Suspended" ? "bg-red-500" : "bg-gray-400"}`} />
                        {user.status}
                      </span>
                    </td>
                    {/* Joined */}
                    <td className="px-5 py-4">
                      <p className="text-sm text-gray-500">{user.joined}</p>
                    </td>
                    {/* Actions */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => setSelectedUser(user)}
                          className="p-1.5 hover:bg-indigo-100 rounded-lg text-indigo-500 transition"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          className="p-1.5 hover:bg-blue-100 rounded-lg text-blue-500 transition"
                          title="Edit"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          className="p-1.5 hover:bg-red-100 rounded-lg text-red-400 transition"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-16 text-center">
                    <Users className="w-10 h-10 text-gray-200 mx-auto mb-3" />
                    <p className="text-gray-400 text-sm">No users found matching your filters.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
          <p className="text-xs text-gray-400">Showing {filtered.length} of {MOCK_USERS.length} users</p>
          <div className="flex gap-1">
            {[1, 2, 3].map((p) => (
              <button
                key={p}
                className={`w-7 h-7 rounded-lg text-xs font-medium transition ${p === 1 ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-sm" : "text-gray-500 hover:bg-indigo-50"}`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* User Detail Modal */}
      <UserDetailModal user={selectedUser} onClose={() => setSelectedUser(null)} />
    </div>
  );
}