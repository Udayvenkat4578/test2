import React from 'react';
import Confetti from 'react-confetti';
import { motion } from 'framer-motion';

const SuccessModal = ({ message, onContinue }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Confetti numberOfPieces={250} recycle={false} />
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', duration: 0.5 }}
        className="bg-white p-8 rounded-xl shadow-xl max-w-sm text-center"
      >
        <h2 className="text-2xl font-bold text-green-600 mb-3">{message}</h2>
        <p className="text-gray-600 mb-6">You're now logged in to VitalFlow.</p>
        <button
          onClick={onContinue}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Go to Dashboard
        </button>
      </motion.div>
    </div>
  );
};

export default SuccessModal;
