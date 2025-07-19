import React from "react";

const values = [
  {
    title: "Integrity",
    desc: "We uphold honesty and transparency in every interaction.",
    img: "https://source.unsplash.com/100x100/?trust,business",
  },
  {
    title: "Empathy",
    desc: "We act with compassion to serve those in need.",
    img: "https://source.unsplash.com/100x100/?care,people",
  },
  {
    title: "Innovation",
    desc: "We use technology to save lives faster and smarter.",
    img: "https://source.unsplash.com/100x100/?technology,innovation",
  },
];

const team = [
  {
    name: "Uday Venkat",
    role: "Founder & Visionary",
    img: "https://source.unsplash.com/200x200/?ceo,man",
  },
  {
    name: "Aarti Rao",
    role: "Tech Lead",
    img: "https://source.unsplash.com/200x200/?developer,woman",
  },
  {
    name: "Ravi Kumar",
    role: "Community Manager",
    img: "https://source.unsplash.com/200x200/?people,leader",
  },
];

const Company = () => {
  return (
    <div className="text-gray-800 font-sans">
      {/* Hero */}
      <section className="relative bg-gradient-to-r from-blue-700 to-blue-500 text-white py-24 px-6 text-center overflow-hidden">
        <img
          src="https://source.unsplash.com/1600x600/?blood,donation"
          alt="hero-bg"
          className="absolute inset-0 object-cover w-full h-full opacity-20"
        />
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold mb-4">VitalFlow</h1>
          <p className="text-xl">
            Bridging lives with tech and humanity — one drop at a time.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <img
          src="https://source.unsplash.com/600x400/?healthcare,teamwork"
          alt="mission"
          className="rounded-xl shadow-md w-full object-cover"
        />
        <div>
          <h2 className="text-3xl font-bold text-blue-600 mb-4">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            To build a seamless, trustworthy, and impactful blood donation network
            driven by technology and compassion — reaching every corner that needs us.
          </p>
        </div>
      </section>

      <section className="py-12 px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-3xl font-bold text-blue-600 mb-4">Our Vision</h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            A future where no life is lost due to blood unavailability. VitalFlow
            envisions a connected world where life-saving blood is just a tap away.
          </p>
        </div>
        <img
          src="https://source.unsplash.com/600x400/?future,hope"
          alt="vision"
          className="rounded-xl shadow-md w-full object-cover"
        />
      </section>

      {/* Journey */}
      <section className="bg-blue-50 py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-blue-600 mb-6">Our Journey</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Started in 2024 with a WhatsApp message and a mission, VitalFlow quickly
            scaled into a platform uniting donors, hospitals, and communities. Today,
            we’re proud to serve thousands across regions — driven by technology and
            fueled by empathy.
          </p>
          <img
            src="https://source.unsplash.com/800x300/?startup,journey"
            alt="timeline"
            className="mt-10 rounded-lg shadow-md mx-auto"
          />
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-blue-600 mb-12">Our Core Values</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 text-center">
          {values.map((val, idx) => (
            <div
              key={idx}
              className="bg-white border border-blue-100 p-6 rounded-xl shadow-sm hover:shadow-lg transition"
            >
              <img
                src={val.img}
                alt={val.title}
                className="w-16 h-16 mx-auto mb-4 rounded-full"
              />
              <h3 className="text-xl font-semibold text-blue-600">{val.title}</h3>
              <p className="text-gray-600 mt-2 text-sm">{val.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-blue-600 mb-12">Meet Our Team</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
            {team.map((member, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-100 p-6 rounded-xl shadow hover:shadow-xl transition"
              >
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-lg font-semibold text-gray-800">{member.name}</h3>
                <p className="text-sm text-gray-500">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Company;
