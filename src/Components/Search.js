import React, { useState, useRef, useEffect } from 'react';
import { FaMapMarkerAlt, FaCrosshairs } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

const Search = () => {
  const navigate = useNavigate();

  const savedLocation = sessionStorage.getItem('userLocation') || '';
  const [location, setLocation] = useState(savedLocation);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const toggleGroup = (group) => {
    setSelectedGroups((prev) =>
      prev.includes(group) ? prev.filter((g) => g !== group) : [...prev, group]
    );
  };

  const handleSearch = () => {
    if (!location.trim()) return;
    navigate('/donors', {
      state: {
        location: location.trim(),
        bloodGroup: selectedGroups,
      },
    });
  };

  const detectLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation not supported.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await res.json();
          const fullAddress = data.display_name || '';
          setLocation(fullAddress);
          sessionStorage.setItem('userLocation', fullAddress);
        } catch (error) {
          alert('Failed to detect location');
        }
      },
      () => {
        alert('Permission denied');
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center px-4 py-4 p-4">
      <div className="text-center text-3xl font-bold text-[#0096FF] mb-11">Discover Your Donor</div>

      <div className="flex flex-wrap md:flex-nowrap items-center justify-center gap-4 w-full max-w-5xl pb-7">
        {/* Blood Group Dropdown */}
        <div className="relative w-72" ref={dropdownRef}>
          <div
            onClick={() => setShowDropdown(!showDropdown)}
            className="border-2 border-white rounded-lg px-4 py-2 bg-white cursor-pointer flex flex-wrap gap-1 min-h-[44px] transition"
          >
            {selectedGroups.length > 0 ? (
              selectedGroups.map((group) => (
                <span
                  key={group}
                  className="bg-[#e0f0ff] text-[#007BFF] px-3 py-1 rounded-full text-sm flex items-center gap-1"
                >
                  {group}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleGroup(group);
                    }}
                    className="text-blue-500 hover:text-red-600 font-bold leading-none"
                  >
                    ×
                  </button>
                </span>
              ))
            ) : (
              <span className="text-gray-400 font-semibold">Select blood group(s)</span>
            )}
          </div>

          {showDropdown && (
            <div className="absolute mt-2 left-0 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
              {bloodGroups.map((group) => (
                <div
                  key={group}
                  onClick={() => toggleGroup(group)}
                  className={`px-4 py-2 cursor-pointer hover:bg-blue-100 ${
                    selectedGroups.includes(group) ? 'bg-blue-50 font-medium text-blue-700' : ''
                  }`}
                >
                  {group}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Location Input */}
        <div className="relative w-72">
          <input
            type="text"
            placeholder="Enter your location"
            className="text-gray-400 border-2 border-white rounded-lg px-4 py-2 w-full pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
              sessionStorage.setItem('userLocation', e.target.value);
            }}
          />
          <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" />
          <button
            onClick={detectLocation}
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-blue-700"
            title="Detect Location"
          >
            <FaCrosshairs />
          </button>
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white font-semibold hover:bg-[#1a25c9] px-8 py-2.5 rounded-lg transition-all"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default Search;
