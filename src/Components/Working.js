import React, { useState } from 'react';
import {
  LocateFixed,
  HeartHandshake,
  ShieldCheck,
} from 'lucide-react';

const steps = [
  {
    title: 'Find a Donor Near You',
    icon: <LocateFixed className="w-6 h-6 text-blue-600" />,
    description: 'Enable location to instantly discover willing donors near your area.',
  },
  {
    title: 'Request or Reach Out',
    icon: <HeartHandshake className="w-6 h-6 text-blue-600" />,
    description: 'Send a direct request or message donors who match your need.',
  },
  {
    title: 'Donate Safely & Confidently',
    icon: <ShieldCheck className="w-6 h-6 text-blue-600" />,
    description: 'Coordinate and donate with trust, backed by our secure system.',
  },
];

const Working = () => {
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('');
  const [messageSent, setMessageSent] = useState(false);
  const [error, setError] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSendMessage = async () => {
    if (!message.trim()) {
      setError('Message cannot be empty.');
      return;
    }

    setIsSending(true);
    setError('');

    try {
      // Simulate API/email sending delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Simulate success (replace this with your actual logic)
      console.log('Message sent to: udayvenkat4578@gmail.com');
      console.log('Message:', message);

      setMessageSent(true);
      setMessage('');
    } catch (err) {
      setError('Something went wrong. Please try again later.');
    } finally {
      setIsSending(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setMessageSent(false);
    setMessage('');
    setError('');
  };

  return (
    <div className="md:px-11 mx-4 md:py-1">
      <div className="grid md:grid-cols-2 gap-10 items-center bg-orange-50 rounded-xl py-11">
        
        {/* Left Side */}
        <div>
          <div className="md:pl-7 pl-4">
            <h2 className="text-3xl md:text-4xl font-bold text-[#fb8500] mb-4 px-4">
              How It Works?
            </h2>
            <p className="text-gray-600 mb-6 md:text-[16px] text-sm px-4">
              VitalFlow connects blood donors and recipients through a secure, location-based system. Users can easily find, contact, and request donations from nearby donors.
            </p>
            <div className="px-4">
              <button
                className="bg-[#fb8500] text-white font-semibold px-6 py-2 rounded-xl shadow-md hover:bg-[#e67600] transition-all duration-300"
                onClick={() => setShowModal(true)}
              >
                Talk to Us
              </button>
            </div>
          </div>
        </div>

        {/* Right Side Cards */}
        <div className="px-4 w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pr-2 md:pr-5">
            {steps.map((step, index) => (
              <div
                key={index}
                className="bg-white border border-blue-100 rounded-xl px-6 py-5 text-center flex flex-col items-center h-full"
              >
                <div className="mb-3">{step.icon}</div>
                <h3 className="font-semibold text-gray-800 text-base md:text-lg mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm md:text-[14px] leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal: Message Form */}
      {showModal && !messageSent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 md:w-1/2 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Send Us a Message</h2>
            <textarea
              className="w-full h-24 border border-gray-300 rounded-md p-2 mb-2"
              placeholder="Write your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            {error && (
              <p className="text-red-500 text-sm mb-2">{error}</p>
            )}
            <div className="flex justify-end">
              <button
                className="bg-[#fb8500] text-white font-semibold px-6 py-2 rounded-xl shadow-md hover:bg-[#e67600] mr-2 disabled:opacity-50"
                onClick={handleSendMessage}
                disabled={isSending}
              >
                {isSending ? 'Sending...' : 'Send'}
              </button>
              <button
                className="bg-gray-200 text-gray-800 font-semibold px-6 py-2 rounded-xl shadow-md hover:bg-gray-300"
                onClick={closeModal}
                disabled={isSending}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Success Message */}
      {showModal && messageSent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 md:w-1/3 rounded-lg text-center shadow-lg">
            <h2 className="text-xl font-semibold text-[#fb8500] mb-3">
              Thanks for contacting!
            </h2>
            <p className="text-gray-700 mb-6">
              We will reach you soon.
            </p>
            <button
              className="bg-[#fb8500] text-white px-6 py-2 rounded-xl shadow-md hover:bg-[#e67600]"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Working;
