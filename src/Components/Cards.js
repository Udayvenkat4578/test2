import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Cards = () => {
  const [stats, setStats] = useState({
    bloodGroups: 0,
    donors: 0,
    cities: 0,
    avgAge: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          'https://vital001-4307f-default-rtdb.firebaseio.com/donors.json'
        );
        const data = res.data;

        const donors = Object.values(data);
        const bloodGroupSet = new Set();
        const citySet = new Set();
        let totalAge = 0;
        let ageCount = 0;

        donors.forEach((donor) => {
          if (donor.bloodGroup) bloodGroupSet.add(donor.bloodGroup);
          if (donor.location) citySet.add(donor.location.toLowerCase());

          const age = parseInt(donor.age);
          if (!isNaN(age)) {
            totalAge += age;
            ageCount++;
          }
        });

        const avgAge = ageCount > 0 ? Math.round(totalAge / ageCount) : 0;

        setStats({
          bloodGroups: bloodGroupSet.size,
          donors: donors.length,
          cities: citySet.size,
          avgAge: avgAge,
        });
      } catch (err) {
        console.error('Error fetching donor data:', err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="py-1  bg-white text-center animate-fade-in">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto px-4">
        {[
          { label: 'Blood Groups', value: stats.bloodGroups },
          { label: 'Donors', value: stats.donors },
          { label: 'Cities', value: stats.cities },
          { label: 'Avg Age', value: stats.avgAge },
        ].map((item, idx) => (
          <div
            key={idx}
            className="bg-blue-50 hover:bg-blue-100 transition duration-300 shadow-sm rounded-2xl p-6 w-full flex flex-col items-center justify-center"
          >
            <span className="text-4xl font-extrabold text-blue-700 mb-2">
              {item.value}+
            </span>
            <span className="text-gray-700 font-medium tracking-wide">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;
