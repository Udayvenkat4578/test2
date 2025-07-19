import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

const getColor = (group) => ({
  'A+': '#6C9DCB', 'A-': '#7EA671', 'B+': '#DAA67A',
  'B-': '#D98574', 'O+': '#9A84D3', 'O-': '#D39A9A',
  'AB+': '#6BAFBF', 'AB-': '#D4BFA7'
}[group] || '#8DAECC');

const DonorCard = ({ donor }) => {
  const [liked, setLiked] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const navigate = useNavigate();

  const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';

  useEffect(() => {
    if (isLoggedIn) {
      setShowContact(true);
    }

    const pendingId = sessionStorage.getItem('pendingConnectDonorId');
    if (pendingId === donor.id) {
      setShowContact(true);
      sessionStorage.removeItem('pendingConnectDonorId');
    }
  }, [donor.id, isLoggedIn]);

  const handleConnectClick = () => {
    if (!isLoggedIn) {
      sessionStorage.setItem('pendingConnectDonorId', donor.id);
      navigate('/login');
    }
  };

  return (
    <div className="bg-white border border-gray-400 rounded-xl p-4 flex flex-col justify-between text-sm shadow-sm">
      <div className="flex items-start gap-3 relative px-3 pt-1">
        <div className="relative">
          <div
            className="rounded-full w-12 h-12 flex items-center justify-center text-white font-semibold text-base"
            style={{ backgroundColor: getColor(donor.bloodGroup) }}
          >
            {donor.bloodGroup}
          </div>
          <span className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${donor.available ? 'bg-green-500' : 'bg-red-500'}`} />
        </div>
        <div>
          <h2 className="font-bold text-gray-800">{donor.fullName}</h2>
          <p className="text-xs text-gray-500">{donor.age} yrs · {donor.city || 'unknown'}</p>
        </div>
      </div>
      <p className="text-xs italic text-gray-600 mt-2 px-3">"{donor.bio}"</p>
      <div className="mt-3 flex justify-between items-center px-3">
        <button
          onClick={handleConnectClick}
          className="border border-blue-500 text-blue-600 hover:bg-blue-50 text-xs py-1 rounded-full px-3"
        >
          {showContact ? donor.phoneNumber : 'Connect'}
        </button>
        <FaHeart
          onClick={() => setLiked(!liked)}
          className={`cursor-pointer ${liked ? 'text-red-500' : 'text-gray-400'}`}
        />
      </div>
    </div>
  );
};

const DonorList = () => {
  const [donors, setDonors] = useState([]);
  const [locationQuery, setLocationQuery] = useState(sessionStorage.getItem('userLocation') || '');
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [onlyActive, setOnlyActive] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);

  useEffect(() => {
    axios.get('https://vital001-4307f-default-rtdb.firebaseio.com/donors.json')
      .then(res => {
        const formatted = Object.entries(res.data || {}).map(([id, d]) => ({ id, ...d }));
        setDonors(formatted);
      });
  }, []);

  const toggleGroup = (g) => {
    setSelectedGroups((prev) =>
      prev.includes(g) ? prev.filter(x => x !== g) : [...prev, g]
    );
  };

  const filtered = donors.filter(d =>
    (d.city?.toLowerCase().includes(locationQuery.toLowerCase()) || d.location?.toLowerCase().includes(locationQuery.toLowerCase())) &&
    (selectedGroups.length === 0 || selectedGroups.includes(d.bloodGroup)) &&
    (!onlyActive || d.available)
  );

  const visibleDonors = filtered.slice(0, visibleCount);
  const loadMore = () => setVisibleCount(prev => prev + 12);

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="text-center text-blue-600 space-y-1 mb-6">
        <div className="text-[#fb8500] text-2xl md:text-3xl font-bold">Need a donor? You’re in the right place.</div>
        <div className="text-gray-600 text-sm">Yes, the right donor exists—and you’re about to find them.</div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-4 items-center">
        <div className="flex flex-wrap items-center gap-4 justify-center">
          <input
            type="text"
            placeholder="Search by location"
            value={locationQuery}
            onChange={e => {
              setLocationQuery(e.target.value);
              sessionStorage.setItem('userLocation', e.target.value);
            }}
            className="border-2 border-gray-300 rounded-lg px-4 py-2 md:w-96 w-64 bg-white"
          />
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-700 font-medium">Only Active</label>
            <button
              onClick={() => setOnlyActive(prev => !prev)}
              className={`w-10 h-6 flex items-center rounded-full ${onlyActive ? 'bg-blue-600' : 'bg-gray-300'}`}
            >
              <span className={`w-4 h-4 rounded-full bg-white transform transition-transform duration-200 ${onlyActive ? 'translate-x-5' : 'translate-x-1'}`} />
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 w-full justify-center mt-2">
          {bloodGroups.map((g) => (
            <button
              key={g}
              onClick={() => toggleGroup(g)}
              className={`px-4 py-1 rounded-full text-sm border transition-all ${
                selectedGroups.includes(g)
                  ? 'bg-green-500 text-white border-green-600'
                  : 'bg-white text-gray-600 border-gray-300 hover:bg-blue-50'
              }`}
              style={{ minWidth: '80px', textAlign: 'center' }}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      <div className="text-center text-md text-blue-700 font-semibold mb-6">
        Here are the total Life Savers: <span className="text-[#fb8500]">{filtered.length}</span>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:px-8 px-3">
        {visibleDonors.map(d => <DonorCard key={d.id} donor={d} />)}
      </div>

      {visibleCount < filtered.length && (
        <div className="text-center mt-6">
          <button onClick={loadMore} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

export default DonorList;
