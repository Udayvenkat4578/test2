import React from 'react';

const blogPosts = [
  {
    title: "The Science of Blood Types",
    summary: "Understand the differences between A, B, AB, and O blood types and why compatibility matters.",
  },
  {
    title: "Why Regular Donation Saves Lives",
    summary: "Learn how frequent donors help maintain a steady blood supply in hospitals.",
  },
  {
    title: "Myths About Blood Donation",
    summary: "Debunking common myths that stop people from donating.",
  },
  {
    title: "First-Time Donor Tips",
    summary: "Everything you need to know before your first blood donation.",
  },
];

const Blog = () => {
  return (
    <div className="py-12 px-4 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-3 gap-8 items-start">
        {/* Left side - Title/Intro */}
        <div className="md:col-span-1">
          <h2 className="text-3xl font-bold text-blue-700 mb-4">Know About Blood</h2>
          <p className="text-gray-600 text-base">
            Discover insightful facts, expert tips, and essential knowledge about blood and donation through our curated blog.
          </p>
        </div>

        {/* Right side - Carousel style scrollable blog cards */}
        <div className="md:col-span-2 overflow-x-auto">
          <div className="flex md:gap-6 gap-4 w-max md:w-full">
            {blogPosts.map((post, index) => (
              <div
                key={index}
                className="min-w-[250px] md:min-w-[300px] bg-white border border-blue-100 rounded-xl shadow-sm hover:shadow-md transition duration-300 p-5"
              >
                <h3 className="text-lg font-semibold text-blue-800 mb-2">{post.title}</h3>
                <p className="text-sm text-gray-600">{post.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
