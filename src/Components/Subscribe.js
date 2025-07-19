import React, { useState } from "react";
import { ArrowRight } from "lucide-react";

const Subscribe = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Subscribed with: ${email}`);
    setEmail("");
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <h2 className=" text-[#fb8500] mb-4 text-center text-3xl md:text-4xl font-bold">
        Get in Touch
      </h2>
      <p className=" mb-6 text-center text-gray-600 font-medium  sm:text-lg">
        Subscribe to our newsletter for the latest updates.
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-center max-w-md mx-auto"
      >
        <input
          type="email"
          required
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-grow px-4 py-3 text-sm sm:text-base text-gray-700 border border-gray-300 rounded-l-full focus:outline-none"
        />
        <button
          type="submit"
          className="bg-[#fb8500] border border-[#fb8500] text-white px-5 py-3 rounded-r-full hover:bg-orange-600 transition-all flex items-center justify-center"
        >
          {/* Show text on medium and up, show only arrow on small screens */}
          <span className="hidden sm:inline font-semibold">Subscribe</span>
          <ArrowRight className="sm:ml-2 w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default Subscribe;
