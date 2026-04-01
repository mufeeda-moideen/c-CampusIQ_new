import React, { useState } from "react";
import {
  Users, Search, Filter, Eye, ShieldCheck, UserX, UserCheck,
  Download, ChevronDown, X, CheckCircle, GraduationCap, Mail,
  BookOpen, Zap, FileText, MapPin, Wallet, Award, Clock,
} from "lucide-react";

const MOCK_STUDENTS = [
  { id: 1, name: "Arjun Sharma",  email: "arjun.sharma@gmail.com",  preferredCourse: "BTech CSE",     status: "Active",    avatar: "AS", profileVerified: true,  examType: "JEE",  examScore: "92%", preferredLocation: "Maharashtra", budget: "₹8–12L/yr", joined: "Jan 12, 2024", recommendationsGenerated: 14, clicks: 9, applications: 3, collegesRecommended: ["IIT Bombay","BITS Pilani","NIT Trichy"] },
  { id: 2, name: "Priya Nair",    email: "priya.nair@outlook.com",  preferredCourse: "MBBS",          status: "Active",    avatar: "PN", profileVerified: true,  examType: "NEET", examScore: "88%", preferredLocation: "Kerala",       budget: "₹5–10L/yr", joined: "Feb 3, 2024",  recommendationsGenerated: 7,  clicks: 5, applications: 2, collegesRecommended: ["AIIMS Delhi","CMC Vellore","JIPMER"] },
  { id: 3, name: "Rahul Menon",   email: "rahul.menon@yahoo.com",   preferredCourse: "BTech Mech",    status: "Inactive",  avatar: "RM", profileVerified: false, examType: "JEE",  examScore: "74%", preferredLocation: "Rajasthan",    budget: "₹3–6L/yr",  joined: "Mar 18, 2024", recommendationsGenerated: 5,  clicks: 2, applications: 0, collegesRecommended: ["BITS Pilani","NIT Jaipur"] },
  { id: 4, name: "Sneha Kapoor",  email: "sneha.k@gmail.com",       preferredCourse: "BBA",           status: "Active",    avatar: "SK", profileVerified: true,  examType: "CUET", examScore: "85%", preferredLocation: "Delhi",        budget: "₹4–7L/yr",  joined: "Apr 5, 2024",  recommendationsGenerated: 10, clicks: 7, applications: 2, collegesRecommended: ["DU SRCC","Symbiosis Pune","Christ Bangalore"] },
  { id: 5, name: "Vikram Iyer",   email: "vikram.iyer@proton.me",   preferredCourse: "BTech ECE",     status: "Suspended", avatar: "VI", profileVerified: false, examType: "JEE",  examScore: "61%", preferredLocation: "Tamil Nadu",   budget: "₹2–5L/yr",  joined: "May 22, 2024", recommendationsGenerated: 3,  clicks: 1, applications: 0, collegesRecommended: ["VIT Vellore","SRM Chennai"] },
  { id: 6, name: "Ananya Das",    email: "ananya.das@gmail.com",    preferredCourse: "BA Psychology", status: "Active",    avatar: "AD", profileVerified: true,  examType: "CUET", examScore: "79%", preferredLocation: "West Bengal",  budget: "₹2–4L/yr",  joined: "Jun 9, 2024",  recommendationsGenerated: 8,  clicks: 6, applications: 1, collegesRecommended: ["Jadavpur University","Presidency Kolkata"] },
  { id: 7, name: "Karthik Raj",   email: "karthik.raj@icloud.com",  preferredCourse: "BTech AI/ML",   status: "Active",    avatar: "KR", profileVerified: true,  examType: "JEE",  examScore: "89%", preferredLocation: "Tamil Nadu",   budget: "₹6–10L/yr", joined: "Jul 14, 2024", recommendationsGenerated: 12, clicks: 8, applications: 3, collegesRecommended: ["Anna University","NIT Trichy","SASTRA"] },
  { id: 8, name: "Meera Pillai",  email: "meera.p@gmail.com",       preferredCourse: "BCom Finance",  status: "Inactive",  avatar: "MP", profileVerified: false, examType: "CUET", examScore: "68%", preferredLocation: "Kerala",       budget: "₹1–3L/yr",  joined: "Aug 30, 2024", recommendationsGenerated: 4,  clicks: 3, applications: 0, collegesRecommended: ["Amrita University","MG University"] },
];

const STATUS_COLORS = {
  Active:    "bg-emerald-100 text-emerald-700",
  Inactive:  "bg-gray-100 text-gray-500",
  Suspended: "bg-red-100 text-red-600",
};
const STATUS_DOT = {
  Active:    "bg-emerald-500",
  Inactive:  "bg-gray-400",
  Suspended: "bg-red-500",
};
const AVATAR_GRADIENTS = [
  "from-indigo-400 to-purple-500","from-pink-400 to-rose-500",
  "from-cyan-400 to-blue-500","from-amber-400 to-orange-500",
  "from-emerald-400 to-teal-500","from-violet-400 to-fuchsia-500",
  "from-sky-400 to-indigo-500","from-lime-400 to-green-500",
];
const COURSE_ICON = {
  "BTech CSE":"💻","BTech Mech":"⚙️","BTech ECE":"📡","BTech AI/ML":"🤖",
  "MBBS":"🩺","BBA":"📊","BA Psychology":"🧠","BCom Finance":"💰",
};

/* ── Stat Card ── */
function StatCard({ label, value, icon: Icon, color, sub }) {
  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 shadow-sm border border-white/80 flex items-center gap-4">
      <div className={`p-3 rounded-xl ${color}`}><Icon className="w-5 h-5 text-white" /></div>
      <div>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
        <p className="text-sm text-gray-500">{label}</p>
        {sub && <p className="text-xs text-indigo-500 font-medium mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

/* ── View Modal ── */
function ProfileModal({ user, onClose }) {
  if (!user) return null;
  const grad = AVATAR_GRADIENTS[user.id % AVATAR_GRADIENTS.length];
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 p-1.5 hover:bg-gray-100 rounded-lg transition">
          <X className="w-4 h-4 text-gray-400" />
        </button>

        {/* Avatar */}
        <div className="flex flex-col items-center text-center mb-5">
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${grad} flex items-center justify-center text-white font-bold text-xl shadow-lg mb-3`}>
            {user.avatar}
          </div>
          <div className="flex items-center gap-1.5 mb-1">
            <h2 className="text-lg font-bold text-gray-800">{user.name}</h2>
            {user.profileVerified && <CheckCircle className="w-4 h-4 text-emerald-500" />}
          </div>
          <span className={`inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full font-medium ${STATUS_COLORS[user.status]}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[user.status]}`} />{user.status}
          </span>
        </div>

        {/* Core fields */}
        <div className="space-y-2.5 mb-4">
          {[
            { icon: Mail,     label: "Email",            value: user.email },
            { icon: BookOpen, label: "Preferred Course",  value: `${COURSE_ICON[user.preferredCourse] ?? "🎓"} ${user.preferredCourse}` },
            { icon: MapPin,   label: "Location",          value: user.preferredLocation },
            { icon: Wallet,   label: "Budget",            value: user.budget },
            { icon: Award,    label: `${user.examType} Score`, value: user.examScore },
            { icon: Clock,    label: "Joined",            value: user.joined },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-3 p-3 bg-indigo-50/60 rounded-xl">
              <Icon className="w-4 h-4 text-indigo-400 shrink-0" />
              <div>
                <p className="text-xs text-gray-400">{label}</p>
                <p className="text-sm font-medium text-gray-700">{value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Activity */}
        <div className="flex items-center justify-around p-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl mb-4">
          {[
            { label: "Recs",   value: user.recommendationsGenerated, color: "text-indigo-600" },
            { label: "Clicks", value: user.clicks,                   color: "text-blue-500"   },
            { label: "Apps",   value: user.applications,             color: "text-emerald-500" },
          ].map(({ label, value, color }) => (
            <div key={label} className="text-center">
              <p className={`text-xl font-bold ${color}`}>{value}</p>
              <p className="text-xs text-gray-400">{label}</p>
            </div>
          ))}
        </div>

        {/* Colleges */}
        <div className="mb-5">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Colleges Recommended</p>
          <div className="flex flex-wrap gap-1.5">
            {user.collegesRecommended.map(c => (
              <span key={c} className="text-xs px-2.5 py-1 bg-indigo-50 border border-indigo-100 text-indigo-600 rounded-lg font-medium">{c}</span>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          {!user.profileVerified && (
            <button className="flex-1 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl text-sm font-medium hover:opacity-90 transition flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> Verify
            </button>
          )}
          <button className="flex-1 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl text-sm font-medium hover:opacity-90 transition">
            Edit Profile
          </button>
          {user.status !== "Suspended" && (
            <button className="py-2.5 px-4 bg-red-50 text-red-500 rounded-xl text-sm font-medium hover:bg-red-100 transition">
              Suspend
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Main ── */
export default function UsersPage() {
  const [search,       setSearch]       = useState("");
  const [courseFilter, setCourseFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortField,    setSortField]    = useState("name");
  const [sortAsc,      setSortAsc]      = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);

  const courses = ["All", ...Array.from(new Set(MOCK_STUDENTS.map(u => u.preferredCourse)))];

  const filtered = MOCK_STUDENTS
    .filter(u => {
      const q = search.toLowerCase();
      const matchQ = u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.preferredCourse.toLowerCase().includes(q);
      return matchQ && (courseFilter === "All" || u.preferredCourse === courseFilter) && (statusFilter === "All" || u.status === statusFilter);
    })
    .sort((a, b) => {
      const va = String(a[sortField]), vb = String(b[sortField]);
      return sortAsc ? va.localeCompare(vb) : vb.localeCompare(va);
    });

  const toggleSort = f => { if (sortField === f) setSortAsc(p => !p); else { setSortField(f); setSortAsc(true); } };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Users</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage all registered students on the platform</p>
        </div>
        <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 bg-white text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-50 transition shadow-sm self-start sm:self-auto">
          <Download className="w-4 h-4" /> Export
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total Users"       value={MOCK_STUDENTS.length}                                   icon={Users}      color="bg-gradient-to-br from-indigo-500 to-purple-600" sub="+3 this week" />
        <StatCard label="Active"            value={MOCK_STUDENTS.filter(u => u.status === "Active").length} icon={UserCheck}  color="bg-gradient-to-br from-emerald-400 to-teal-500" />
        <StatCard label="Verified Profiles" value={MOCK_STUDENTS.filter(u => u.profileVerified).length}    icon={ShieldCheck} color="bg-gradient-to-br from-violet-400 to-fuchsia-500" />
        <StatCard label="Suspended"         value={MOCK_STUDENTS.filter(u => u.status === "Suspended").length} icon={UserX} color="bg-gradient-to-br from-rose-400 to-red-500" />
      </div>

      {/* Filters */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/80 shadow-sm p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex items-center gap-2 flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5">
            <Search className="w-4 h-4 text-gray-400 shrink-0" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, email, course..." className="bg-transparent outline-none text-sm w-full text-gray-700 placeholder-gray-400" />
          </div>
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 min-w-44">
            <BookOpen className="w-4 h-4 text-gray-400 shrink-0" />
            <select value={courseFilter} onChange={e => setCourseFilter(e.target.value)} className="bg-transparent outline-none text-sm text-gray-600 w-full cursor-pointer">
              {courses.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 min-w-36">
            <Filter className="w-4 h-4 text-gray-400 shrink-0" />
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="bg-transparent outline-none text-sm text-gray-600 w-full cursor-pointer">
              {["All","Active","Inactive","Suspended"].map(s => <option key={s}>{s}</option>)}
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
                  { label: "Name",            field: "name"            },
                  { label: "Email",           field: "email"           },
                  { label: "Course Interest", field: "preferredCourse" },
                  { label: "Status",          field: "status"          },
                  { label: "Actions",         field: null              },
                ].map(({ label, field }) => (
                  <th key={label} onClick={() => field && toggleSort(field)}
                    className={`px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider ${field ? "cursor-pointer hover:text-indigo-600 select-none" : ""}`}>
                    <span className="flex items-center gap-1">
                      {label}
                      {field && sortField === field && <ChevronDown className={`w-3 h-3 text-indigo-500 transition-transform ${sortAsc ? "" : "rotate-180"}`} />}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(user => {
                const grad = AVATAR_GRADIENTS[user.id % AVATAR_GRADIENTS.length];
                return (
                  <tr key={user.id} className="hover:bg-indigo-50/30 transition-colors group">

                    {/* Name */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${grad} flex items-center justify-center text-white font-semibold text-xs shadow-sm shrink-0`}>
                          {user.avatar}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                          {user.profileVerified && <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />}
                        </div>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="px-5 py-4">
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </td>

                    {/* Course */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-base leading-none">{COURSE_ICON[user.preferredCourse] ?? "🎓"}</span>
                        <p className="text-sm font-medium text-gray-700">{user.preferredCourse}</p>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-medium ${STATUS_COLORS[user.status]}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[user.status]}`} />
                        {user.status}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="px-5 py-4">
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-lg text-xs font-semibold transition"
                      >
                        <Eye className="w-3.5 h-3.5" /> View
                      </button>
                    </td>
                  </tr>
                );
              })}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-16 text-center">
                    <GraduationCap className="w-10 h-10 text-gray-200 mx-auto mb-3" />
                    <p className="text-gray-400 text-sm">No users found matching your filters.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
          <p className="text-xs text-gray-400">Showing {filtered.length} of {MOCK_STUDENTS.length} users</p>
          <div className="flex gap-1">
            {[1, 2, 3].map(p => (
              <button key={p} className={`w-7 h-7 rounded-lg text-xs font-medium transition ${p === 1 ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-sm" : "text-gray-500 hover:bg-indigo-50"}`}>{p}</button>
            ))}
          </div>
        </div>
      </div>

      <ProfileModal user={selectedUser} onClose={() => setSelectedUser(null)} />
    </div>
  );
}