import React from 'react';
import { HeartPulse, MapPin, Users } from 'lucide-react';

const reasons = [
  {
    title: "Life-Saving Connections, Instantly",
    description: "VitalFlow connects donors and patients in real-time, ensuring help reaches those in urgent need—fast.",
    icon: <HeartPulse className="w-8 h-8 md:w-10 md:h-10 text-blue-600" />,
  },
  {
    title: "Location-Based Matching",
    description: "We use smart geolocation to find donors nearby, reducing critical delays and improving emergency response.",
    icon: <MapPin className="w-8 h-8 md:w-10 md:h-10 text-blue-600" />,
  },
  {
    title: "Trusted, Community-Driven Platform",
    description: "VitalFlow is built on trust, privacy, and purpose—empowering a caring community to make a real impact.",
    icon: <Users className="w-8 h-8 md:w-10 md:h-10 text-blue-600" />,
  },
];

const WhyVitalFlow = () => {
  return (
    <div className="py-10 px-4 max-w-6xl mx-auto">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-2 text-[#fb8500]">
        Why VitalFlow Matters
      </h2>
      <h3 className="text-center mb-8 text-gray-600 font-medium  sm:text-lg">
        The Vital Difference
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reasons.map((reason, index) => (
          <div
            key={index}
            className="bg-white p-5 sm:p-6 rounded-2xl shadow-sm hover:shadow-lg transition duration-300 border border-gray-300"
          >
            <div className="flex items-center justify-center mb-3 sm:mb-4">
              {reason.icon}
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-800 text-center">
              {reason.title}
            </h3>
            <p className="text-sm sm:text-base text-gray-600 text-center">{reason.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyVitalFlow;
