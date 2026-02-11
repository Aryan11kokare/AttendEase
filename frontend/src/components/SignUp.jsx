import { useEffect, useState } from "react";
import {
  ClipboardCheck,
  Mail,
  Lock,
  AlertCircle,
  CheckCircle,
  Hash,
  User,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/actions/authActions.js";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const authState = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setSuccess(false);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 4) {
      setError("Password must be at least 4 characters long");
      return;
    }

    if (role === "Student") {
      await dispatch(register({ username, email, password, role, rollNo }));
    } else {
      await dispatch(register({ username, email, password, role }));
    }
    setLoading(false);
    navigate("/login");
  };

  useEffect(() => {
    if (authState?.error === true) {
      setError(authState.message);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [authState.error, authState.message]);

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Account Created!
            </h2>
            <p className="text-slate-600 mb-6">
              Your account has been successfully created. You can now sign in
              with your credentials.
            </p>
            <a
              href="/login"
              className="inline-block w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all"
            >
              Go to Login
            </a>
          </div>
        </div>
      </div>
    );
  }

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
            Create Account
          </h1>
          <p className="text-slate-600">
            Join us to manage attendance effortlessly
          </p>
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
                htmlFor="role"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                I am a
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none bg-white"
                >
                  <option>Select Your Role</option>
                  <option value="Student">Student</option>
                  <option value="Teacher">Teacher</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="username"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Username
              </label>
              <div className="relative">
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full pl-4 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder="John Deo"
                />
              </div>
            </div>

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

            {role == "Student" && (
              <div>
                <label
                  htmlFor="rollNo"
                  className="block text-sm font-semibold text-slate-700 mb-2"
                >
                  Roll Number
                </label>
                <div className="relative">
                  <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    id="rollNo"
                    type="rollNo"
                    value={rollNo}
                    onChange={(e) => setRollNo(e.target.value)}
                    required
                    className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder="FY79"
                  />
                </div>
              </div>
            )}

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
                  placeholder="At least 6 characters"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder="Re-enter your password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-slate-600">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
              >
                Sign in
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
