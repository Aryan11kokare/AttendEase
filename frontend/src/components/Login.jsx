import { useEffect, useState } from "react";
import { ClipboardCheck, Mail, Lock, AlertCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions/authActions";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const authState = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    dispatch(login({ email, password }));
  };

  useEffect(() => {
    if (authState?.error === true) {
      setError(authState.message);
      setLoading(false);
    } else {
      setLoading(false);
    }

    if (localStorage.getItem("role") === "Student") {
      router("/student");
    }

    if (localStorage.getItem("role") === "Admin") {
      router("/admin");
    }

    if (localStorage.getItem("role") === "Teacher") {
      router("/teacher");
    }
  }, [authState.error, authState.message]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <ClipboardCheck className="w-10 h-10 text-blue-600" />
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-slate-800 bg-clip-text text-transparent">
              AttendEase
            </span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Welcome Back
          </h1>
          <p className="text-slate-600">Sign in to access your dashboard</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-slate-600">
              Don't have an account?{" "}
              <a
                href="/signup"
                className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <a
            href="/"
            className="text-slate-600 hover:text-slate-900 transition-colors"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
