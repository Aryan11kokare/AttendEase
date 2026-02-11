import {
  GraduationCap,
  Users,
  ShieldCheck,
  ClipboardCheck,
  ChevronRight,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <nav className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ClipboardCheck className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-slate-800 bg-clip-text text-transparent">
              AttendEase
            </span>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            Streamline Attendance
            <span className="block bg-gradient-to-r from-blue-600 to-slate-700 bg-clip-text text-transparent">
              Management
            </span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            A comprehensive platform for students, teachers, and administrators
            to track and manage attendance effortlessly
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <DashboardCard
            icon={<GraduationCap className="w-12 h-12" />}
            title="Student Portal"
            description="View your attendance records, check status, and receive notifications"
            color="blue"
            path="/student"
          />
          <DashboardCard
            icon={<Users className="w-12 h-12" />}
            title="Teacher Portal"
            description="Mark attendance, manage classes, and generate detailed reports"
            color="emerald"
            path="/teacher"
          />
          <DashboardCard
            icon={<ShieldCheck className="w-12 h-12" />}
            title="Admin Portal"
            description="Oversee all operations, manage users, and access analytics"
            color="slate"
            path="/admin"
          />
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-12 border border-slate-200">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Why Choose AttendEase?
              </h2>
              <div className="space-y-4">
                <Feature text="Real-time attendance tracking" />
                <Feature text="Automated notifications and alerts" />
                <Feature text="Comprehensive analytics dashboard" />
                <Feature text="Secure and reliable platform" />
                <Feature text="Mobile-friendly interface" />
                <Feature text="Export reports in multiple formats" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <StatCard number="10K+" label="Active Students" />
              <StatCard number="500+" label="Teachers" />
              <StatCard number="98%" label="Accuracy Rate" />
              <StatCard number="50+" label="Institutions" />
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-slate-200 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <ClipboardCheck className="w-6 h-6 text-blue-600" />
              <span className="text-lg font-semibold text-slate-800">
                AttendEase
              </span>
            </div>
            <p className="text-slate-600 text-sm">
              © 2024 AttendEase. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

function DashboardCard({ icon, title, description, color, path }) {
  const colorClasses = {
    blue: "from-blue-50 to-blue-100 border-blue-200 text-blue-600 hover:shadow-blue-200",
    emerald:
      "from-emerald-50 to-emerald-100 border-emerald-200 text-emerald-600 hover:shadow-emerald-200",
    slate:
      "from-slate-50 to-slate-100 border-slate-200 text-slate-600 hover:shadow-slate-200",
  };

  const rourter = useNavigate();

  return (
    <div
      onClick={() => rourter(path)}
      className={`bg-gradient-to-br ${colorClasses[color]} border rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 cursor-pointer group`}
    >
      <div
        className={`${
          colorClasses[color].split(" ")[2]
        } mb-6 transform group-hover:scale-110 transition-transform duration-300`}
      >
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-600 mb-6 leading-relaxed">{description}</p>
      <button className="flex items-center gap-2 text-slate-900 font-semibold group-hover:gap-3 transition-all duration-200">
        Access Portal
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}

function Feature({ text }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
        <div className="w-2 h-2 rounded-full bg-blue-600" />
      </div>
      <span className="text-slate-700">{text}</span>
    </div>
  );
}

function StatCard({ number, label }) {
  return (
    <div className="bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="text-3xl font-bold text-slate-900 mb-2">{number}</div>
      <div className="text-sm text-slate-600">{label}</div>
    </div>
  );
}

export default Home;
