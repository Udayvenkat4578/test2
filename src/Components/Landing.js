import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Search from './Search';
import Cards from './Cards';
import { Link } from 'react-router-dom';
import bgImage from '../pics/map1.png';
import kidblood from '../pics/kidblood.png';
import kidblood1 from '../pics/kidblood1.png';
import kidblood2 from '../pics/kidblood2.png';
import Working from './Working';
import Learn from './learn';
import Blog from './Blog';
import Subscribe from './Subscribe';
import Confetti from 'react-confetti';
import { useWindowSize } from '@react-hook/window-size';

const Landing = () => {
  const location = useLocation();
  const [showWelcome, setShowWelcome] = useState(false);
  const [userName, setUserName] = useState('');
  const [width, height] = useWindowSize();

  useEffect(() => {
    if (location.state?.userName) {
      setUserName(location.state.userName);
      setShowWelcome(true);
    }
  }, [location.state]);

  return (
    <div className=''>
      {/* Confetti */}
      {showWelcome && <Confetti width={width} height={height} numberOfPieces={250} />}

      {/* Modal */}
      {showWelcome && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full animate-fade-in">
            <h2 className="text-3xl font-bold text-blue-700 mb-2">
              Welcome, {userName}!
            </h2>
            <p className="text-gray-600 italic mb-4">
              “Together, we flow stronger. Thank you for joining the cause.”
            </p>
            <button
              onClick={() => setShowWelcome(false)}
              className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-all"
            >
              Let’s Go
            </button>
          </div>
        </div>
      )}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.4s ease-out;
        }
      `}</style>

      {/* Hero Section */}
      <div className='min-h-screen'>
        <div className='relative pt-3 '>
          <div
            className='absolute inset-0 z-0'
            style={{
              backgroundImage: `url(${bgImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              opacity: 0.9
            }}
          />
          <div className='absolute inset-0 bg-black opacity-80 z-0' />
          <div className='relative z-10 grid grid-cols-1 place-items-center mx-auto md:pl-0 pl-4'>
            <div className='grid grid-cols-1 md:grid-cols-3 pt-5 md:p-2 p-3 md:pt-11 place-items-center gap-11'>
              <div className='md:col-span-2 text-white'>
                <div className='main-heading'>
                  <div className='font-bold text-3xl md:text-4xl text-[#ffffff]'>Blood Sharing, Reinvented</div>
                  <div className='font-bold text-3xl md:text-4xl text-[#ffffff]'>for a Connected World effortlessly.</div>
                </div>
                <div className='font-normal md:font-medium text-white pt-2'>
                  <div>We at VitalFlow are revolutionizing the future of blood sharing</div>
                </div>
                <div className='flex flex-row gap-4 mt-6 md:p-1 '>
                  <button className='bg-[#fb8500] text-white font-semibold px-5 md:px-6 py-2 rounded-xl shadow-gray-800 shadow-sm hover:bg-[#fb8500] transition-all duration-300'>
                    <Link to='donate'>Become a Donor</Link>
                  </button>
                  <button className='border-2 border-[#fb8500] text-[#fb8500] font-semibold px-5 md:px-6 py-1 rounded-xl '>
                    <Link to='donors'>Find Donors</Link>
                  </button>
                </div>
                <div className='text-white pl-1 pt-1'>Try <span className='text-[#fb8500]'><Link to='/emergency'>Emergency</Link></span> for faster result</div>
              </div>
              <div className='text-white hidden md:grid grid-cols-2 place-items-center md:pt-0 pt-7'>
                <div><img className='h-48 w-auto brightness-150 ' src={kidblood2} /></div>
                <div>
                  <div><img className='h-36 w-auto brightness-150 ' src={kidblood} /></div>
                  <div><img className='h-36 w-auto  brightness-150' src={kidblood1} /></div>
                </div>
              </div>
            </div>
          </div>
          <div className='relative z-10'><Search /></div>
        </div>
      </div>

      {/* Other Sections */}
      <div><Cards /></div>
      <div><Learn /></div>
      <div><Working /></div>
      <div><Subscribe /></div>
    </div>
  );
};

export default Landing;
