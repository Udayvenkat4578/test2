import React from "react";
import {
  Instagram,
  Twitter,
  Facebook,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* About Section */}
        <div>
          <h2 className="text-2xl font-bold text-[#fb8500] mb-4">VitalFlow</h2>
          <p className="mb-4 max-w-sm leading-relaxed">
            Connecting blood donors and recipients with ease and trust. Join our
            community and save lives one drop at a time.
          </p>
          <div className="flex space-x-5 mt-4 text-[#fb8500]">
            <Link to="/facebook" aria-label="Facebook" className="hover:text-orange-400 transition">
              <Facebook className="w-6 h-6" />
            </Link>
            <Link to="/twitter" aria-label="Twitter" className="hover:text-orange-400 transition">
              <Twitter className="w-6 h-6" />
            </Link>
            <Link to="/instagram" aria-label="Instagram" className="hover:text-orange-400 transition">
              <Instagram className="w-6 h-6" />
            </Link>
            <Link to="/linkedin" aria-label="LinkedIn" className="hover:text-orange-400 transition">
              <Linkedin className="w-6 h-6" />
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-white">Quick Links</h3>
          <ul className="space-y-3 text-gray-400">
            <li>
              <Link to="/home" className="hover:text-[#fb8500] transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/donors" className="hover:text-[#fb8500] transition">
                Donors
              </Link>
            </li>
            <li>
              <Link to="/donate" className="hover:text-[#fb8500] transition">
                Donate
              </Link>
            </li>
            <li>
              <Link to="/emergency" className="hover:text-[#fb8500] transition">
                Emergency
              </Link>
            </li>
            <li>
              <Link to="/company" className="hover:text-[#fb8500] transition">
                Company
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-white">Contact Us</h3>
          <ul className="space-y-4 text-gray-400">
            <li className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-[#fb8500]" />
              <span>123 VitalFlow Street, City, Country</span>
            </li>
            <li className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-[#fb8500]" />
              <a href="tel:+916281608599" className="hover:text-[#fb8500] transition">
                +91 6281608599
              </a>
            </li>
            <li className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-[#fb8500]" />
              <a
                href="mailto:udayvenkat4578@gmail.com"
                className="hover:text-[#fb8500] transition"
              >
                support@vitalflow.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <hr className="my-8 border-gray-700" />

      <p className="text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} VitalFlow. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
