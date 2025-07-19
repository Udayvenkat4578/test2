import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../AuthContext";
import bgImage from "../pics/map1.png";
import { HiChevronDown } from "react-icons/hi2";

const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const [shortArea, setShortArea] = useState("Detecting...");
  const [fullAddress, setFullAddress] = useState("");
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const fetchLocationDetails = async (lat, lon) => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
          {
            headers: {
              "User-Agent": "vitalflow-app",
              "Accept-Language": "en",
            },
          }
        );
        const data = await res.json();
        const a = data.address;
        const area =
          a.neighbourhood || a.suburb || a.city_district || a.town || a.city || a.village || "Unknown";
        setShortArea(area);
        const full = [
          a.road,
          a.neighbourhood,
          a.suburb,
          a.city_district,
          a.city || a.town || a.village,
          a.state,
          a.postcode,
        ]
          .filter(Boolean)
          .join(", ");
        setFullAddress(full);
      } catch {
        setShortArea("Unavailable");
        setFullAddress("Could not fetch address");
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => fetchLocationDetails(coords.latitude, coords.longitude),
        () => {
          setShortArea("Permission Denied");
          setFullAddress("Location permission denied");
        }
      );
    } else {
      setShortArea("Not Supported");
      setFullAddress("Geolocation not supported");
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const leftNavLinks = [
    { name: "Home", path: "/" },
    { name: "Donors", path: "/donors" },
    { name: "Donate", path: "/donate" },
    { name: "Emergency", path: "/emergency" },
  ];

  const baseText = isHome ? "text-white" : "text-gray-700";
  const activeText = "text-[#fb8500]";

  const shareText = encodeURIComponent(`Join Me on VitalFlow!
Be a hero in someone's story.
VitalFlow connects donors and patients instantly — real people, real help, right when it matters.

https://vitalflowtemp.netlify.app`);
  const whatsappLink = `https://wa.me/?text=${shareText}`;

  const getColor = (char) => {
    const colors = [
      "#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5",
      "#2196f3", "#03a9f4", "#00bcd4", "#009688", "#4caf50",
      "#8bc34a", "#cddc39", "#ffc107", "#ff9800", "#ff5722",
      "#795548", "#607d8b"
    ];
    return colors[char.charCodeAt(0) % colors.length];
  };

  const getInitial = (email) => (email ? email[0].toUpperCase() : "?");
  const getShortName = (email) =>
    email ? email.split("@")[0].split(/[._]/)[0] : "User";

  return (
    <div className="relative z-10 border-b border-gray-200">
      {/* Background */}
      {isHome && (
        <>
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `url(${bgImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              opacity: 0.9,
            }}
          />
          <div className="absolute inset-0 bg-black opacity-80 z-0" />
        </>
      )}

      {/* Navbar */}
      <div className="relative z-10 bg-transparent px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Left */}
          <div className="flex items-center gap-8 animate-fade-slide">
            <Link to="/" className="text-2xl font-bold text-[#0096FF]">
              Vitalflow
            </Link>
            <div className={`hidden md:flex gap-6 text-lg font-medium ${baseText}`}>
              {leftNavLinks
                .filter((link) => !(location.pathname === "/" && link.path === "/"))
                .map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`relative group transition-all duration-300 ${
                      location.pathname === link.path ? activeText : ""
                    }`}
                  >
                    {link.name}
                    <span
                      className={`absolute left-0 -bottom-1 h-0.5 bg-white transition-all duration-300 ${
                        location.pathname === link.path ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>
                ))}
            </div>
          </div>

          {/* Right */}
          <div className={`hidden md:flex gap-4 items-center text-lg font-medium animate-fade-slide`}>
            {!user ? (
              <Link
                to="/login"
                className={`relative group transition-all duration-300 ${baseText} ${
                  location.pathname === "/login" ? activeText : ""
                }`}
              >
                Login / SignUp
                <span
                  className={`absolute left-0 -bottom-1 h-0.5 bg-white transition-all duration-300 ${
                    location.pathname === "/login" ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className="flex items-center gap-2"
                >
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white font-semibold border-2 border-white"
                    style={{ backgroundColor: getColor(getInitial(user.email)) }}
                  >
                    {getInitial(user.email)}
                  </div>
                  <span className={`${isHome ? "text-white" : "text-gray-800"} font-medium`}>
                    {getShortName(user.email)}
                  </span>
                  <HiChevronDown className="text-white text-xl" />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg py-2 w-40 z-50">
                    <button
                      onClick={() => {
                        logout();
                        setDropdownOpen(false);
                      }}
                      className="w-full text-left text-red-500 hover:bg-gray-100 px-4 py-2 text-sm font-medium"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 text-white font-medium px-4 py-1 rounded-md shadow-md hover:scale-105 transition-all duration-300"
            >
              Invite
            </a>
          </div>

          {/* Hamburger */}
          <button
            className={`md:hidden text-3xl ${baseText} animate-fade-slide hover:scale-110 transition-transform duration-300`}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden flex flex-col gap-4 mt-4 z-50 bg-black bg-opacity-90 shadow-md py-4 px-6 text-lg text-white rounded-xl animate-slide-down">
            {[...leftNavLinks, !user && { name: "Login", path: "/login" }]
              .filter(Boolean)
              .filter((link) => !(location.pathname === "/" && link.path === "/"))
              .map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`transition-colors duration-300 ${
                    location.pathname === link.path ? "text-[#fb8500] font-semibold" : ""
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-400 font-semibold"
              onClick={() => setMenuOpen(false)}
            >
              Invite
            </a>
            {user && (
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="text-red-400 font-semibold"
              >
                Logout
              </button>
            )}
          </div>
        )}
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fade-slide {
          0% { opacity: 0; transform: translateY(-10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-slide {
          animation: fade-slide 0.5s ease-out both;
        }
        @keyframes slide-down {
          0% { opacity: 0; transform: translateY(-10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-down {
          animation: slide-down 0.3s ease-out both;
        }
      `}</style>
    </div>
  );
};

export default Navbar;
