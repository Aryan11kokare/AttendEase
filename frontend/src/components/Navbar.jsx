import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setTimeout(() => {
      router("/");
    }, 500);
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link to={"/"} className="text-2xl font-bold text-blue-600">
                AttendEase
              </Link>
            </div>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-4">
            <button
              onClick={handleLogout}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Logout
            </button>
          </div>

          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none transition-colors"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a
              href="#"
              className="text-gray-900 hover:bg-blue-50 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium transition-colors"
            >
              Dashboard
            </a>
            <a
              href="#"
              className="text-gray-700 hover:bg-blue-50 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium transition-colors"
            >
              Mark Attendance
            </a>
            <a
              href="#"
              className="text-gray-700 hover:bg-blue-50 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium transition-colors"
            >
              View Records
            </a>
            <a
              href="#"
              className="text-gray-700 hover:bg-blue-50 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium transition-colors"
            >
              Reports
            </a>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-5">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                JD
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">
                  John Doe
                </div>
                <div className="text-sm font-medium text-gray-500">
                  john@example.com
                </div>
              </div>
            </div>
            <div className="mt-3 px-2 space-y-1">
              <button className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                Notifications
              </button>
              <button className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
