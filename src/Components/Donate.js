import React, { useState, useEffect } from 'react';
import axios from 'axios';

const motivationMessages = [
  "Every drop counts. You're not just donating blood — you're giving life.",
  "Heroes don’t always wear capes — some just fill out this form.",
  "Be the reason someone smiles tomorrow — donate today.",
  "You have the power to save lives. Use it.",
  "Blood donation is the real act of humanity.",
  "Kindness flows through your veins. Let it flow into someone else's.",
  "Donate blood. It’s safe, simple, and saves lives.",
  "A life may depend on a moment of your time.",
  "Your blood could be someone’s miracle today.",
  "Small action. Big impact. Donate blood."
];

const DonorRegistrationPage = () => {
  const [motivation, setMotivation] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    dob: '',
    age: '',
    bloodGroup: '',
    city: '',
    location: '',
    lastDonationDate: '',
    available: false,
    bio: '',
  });

  const [showModal, setShowModal] = useState(false);
  const [eligible, setEligible] = useState(true);
  const [confirmAvailability, setConfirmAvailability] = useState(false);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * motivationMessages.length);
    setMotivation(motivationMessages[randomIndex]);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (name === 'dob') {
      const birthDate = new Date(value);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      setFormData((prev) => ({ ...prev, age }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
        console.log(formData)

    if (parseInt(formData.age) < 18) {
      setEligible(false);
      setShowModal(true);
    } else if (!formData.available) {
      setConfirmAvailability(true);
    } else {
      setEligible(true);
      setShowModal(true);
    }
  };

  const handleConfirm = async () => {
  try {
    const finalData = {
      ...formData,
      phoneNumber: formData.phoneNumber.startsWith('+91')
        ? formData.phoneNumber
        : '+91' + formData.phoneNumber.replace(/^0+/, '') // remove leading zeros
    };

    await axios.post(
      'https://vital001-4307f-default-rtdb.firebaseio.com/donors.json',
      finalData
    );
    console.log('✅ Donor registered!');
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    setFormData({
      fullName: '',
      phoneNumber: '',
      dob: '',
      age: '',
      bloodGroup: '',
      city: '',
      location: '',
      lastDonationDate: '',
      available: false,
      bio: '',
    });
    setShowModal(false);
    setConfirmAvailability(false);
  }
};


  const handleEdit = () => {
    setShowModal(false);
    setConfirmAvailability(false);
  };

  const detectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
          const data = await res.json();
          const fullAddr = data.display_name || 'Unknown area';
          setFormData((prev) => ({ ...prev, location: fullAddr }));
        } catch {
          alert('Error fetching location.');
        }
      }, () => {
        alert('Location permission denied.');
      });
    } else {
      alert('Geolocation not supported.');
    }
  };

  return (
    <div className=''>
                <div className='text-[#fb8500] sm:text-2xl md:text-3xl font-bold text-center mb-2 py-6'>Register and Become a Donor </div>

    <div className="max-w-5xl mx-auto px-4 pb-3 sm:px-6 lg:px-10 ">
      {/* Motivation Banner */}
      <div className="bg-blue-50 border-l-4 border-blue-300 text-blue-700 px-4 py-3 rounded-xl mb-8 border-2">
        <p className="text-sm sm:text-base md:text-lg font-medium italic text-center">{motivation}</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          required
          className="border placeholder-gray-900 border-gray-400 px-3 py-2 text-sm rounded-lg"
        />
        <input
          type="tel"
          name="phoneNumber"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
          className="border placeholder-gray-900 border-gray-400 px-3 py-2 text-sm rounded-lg"
        />

        {/* DOB with heading */}
        <div>
          <label className="block text-sm font-medium mb-1 text-blue-500">Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
            className="w-full border placeholder-gray-900 border-gray-400 px-3 py-2 text-sm rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-blue-500">Age</label>

        <input
          type="number"
          name="age"
          placeholder="Age (auto-filled)"
          value={formData.age}
          readOnly
          className="border  placeholder-gray-900 border-gray-400 px-3 py-2 text-sm rounded-lg "
        /></div>

        <input
          type="text"
          name="city"
          placeholder="City Name"
          value={formData.city}
          onChange={handleChange}
          required
          className="border placeholder-gray-900 border-gray-400 px-3 py-2 text-sm rounded-lg"
        />

        <select
          name="bloodGroup"
          value={formData.bloodGroup}
          onChange={handleChange}
          required
          className="border border-gray-400 px-3 py-2 text-sm rounded-lg bg-white text-gray-900 "
        >
          <option value="">Select Blood Group</option>
          {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map((group) => (
            <option key={group} value={group}>{group}</option>
          ))}
        </select>

        {/* Location input with detect icon */}
<div className="relative col-span-1 md:col-span-2">
  <input
    type="text"
    name="location"
    placeholder="Full Location (Autofilled or Manual)"
    value={formData.location}
    onChange={handleChange}
    required
    className="w-full border border-gray-400 px-3 py-2 text-sm rounded-lg pr-36 placeholder-gray-900"
  />
  <button
    type="button"
    onClick={detectLocation}
    className="absolute right-2 top-1/2 -translate-y-1/2 text-white font-medium text-sm bg-blue-600 py-1 px-3 rounded-md hover:bg-blue-700 transition"
    title="Detect Location"
  >
    Detect Location
  </button>
</div>
        {/* Availability checkbox */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            name="available"
            checked={formData.available}
            onChange={handleChange}
            id="available"
            className="h-4 w-4"
          />
          <label htmlFor="available" className="text-sm text-gray-900">
            Available to donate
          </label>
        </div>

        {/* Last donation and Bio */}
        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-blue-500">
              When was your last donation?
            </label>
            <input
              type="date"
              name="lastDonationDate"
              value={formData.lastDonationDate}
              onChange={handleChange}
              className="w-full border border-gray-400 px-3 py-2 text-sm rounded-lg"
            />
          </div>
          <textarea
            name="bio"
            placeholder="BIO: e.g., I donate regularly in Chennai..."
            value={formData.bio}
            onChange={handleChange}
            rows="2"
            className="w-full border border-gray-400 px-3 py-3 text-sm rounded-lg resize-none placeholder-gray-900"
          />
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2">
          <button
            type="submit"
            className="float-right px-7 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-300"
          >
            Register as Donor
          </button>
        </div>
      </form>

      {/* Modals */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-3">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg">
            {eligible ? (
              <>
                <h2 className="text-lg font-bold mb-4 text-blue-700">Confirm Your Details</h2>
                <ul className="text-sm text-gray-700 space-y-1 mb-4">
                  <li><strong>Name:</strong> {formData.fullName}</li>
                  <li><strong>Phone:</strong> {formData.phoneNumber}</li>
                  <li><strong>DOB:</strong> {formData.dob}</li>
                  <li><strong>Age:</strong> {formData.age}</li>
                  <li><strong>Blood Group:</strong> {formData.bloodGroup}</li>
                  <li><strong>City:</strong> {formData.city}</li>
                  <li><strong>Location:</strong> {formData.location}</li>
                  <li><strong>Available to Donate:</strong> {formData.available ? 'Yes' : 'No'}</li>
                  <li><strong>Last Donation:</strong> {formData.lastDonationDate}</li>
                  <li><strong>Bio:</strong> {formData.bio}</li>
                </ul>
                <div className="flex justify-end gap-3">
                  <button
                    onClick={handleEdit}
                    className="px-4 py-1 rounded-md border border-gray-400 text-gray-700 hover:bg-gray-100"
                  >
                    Edit
                  </button>
                  <button
                    onClick={handleConfirm}
                    className="px-4 py-1 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Done
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center text-red-600 px-3">
                <h3 className="text-lg font-semibold mb-2">You're almost there!</h3>
                <p className="text-sm">
                  You're currently under the minimum age (18) for blood donation. Thank you for your interest!
                </p>
                <button
                  onClick={() => setShowModal(false)}
                  className="mt-4 px-4 py-1 rounded-md border border-gray-400 text-gray-700 hover:bg-gray-100"
                >
                  Got it
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {confirmAvailability && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-3">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md text-center">
            <h3 className="text-lg font-bold text-yellow-600 mb-3">Confirm Availability</h3>
            <p className="text-sm text-gray-700 mb-4">
              You haven’t marked yourself as available to donate. Are you sure you want to continue?
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={handleEdit}
                className="px-4 py-1 rounded-md border border-gray-400 text-gray-700 hover:bg-gray-100"
              >
                Go Back
              </button>
              <button
                onClick={() => {
                  setConfirmAvailability(false);
                  setShowModal(true);
                }}
                className="px-4 py-1 rounded-md bg-blue-600 text-white hover:bg-blue-700"
              >
                Yes, Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default DonorRegistrationPage;
