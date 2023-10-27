import logo from '../svgAssets/logo.svg';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Register from './Register';
import Login from './login';
import PinGenerationComponent from './PinGenerationComponent';
import PinVerification from './PinVerification';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
function LoginRegistrationComponent() {

  const [activeTab, setActiveTab] = useState('register');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  return (
    <div className='flex items-center justify-center flex-col h-[100vh]'>
      <img src={logo} alt="logo" className='my-4' />
      <div className='border-2 border-black rounded-3xl px-10 py-8'>
        <div className="form_heading | flex justify-between items-center border-2 border-black rounded-xl py-3 px-2 mb-[30px]">
          <motion.h3
            className={`text-2xl w-[50%] text-center py-[11px] px-[24.5px] rounded-md cursor-pointer ${activeTab === 'register' || activeTab === 'pin-gen'
              ? 'bg-[#292D32] text-white'
              : 'bg-white text-black'
              }`}
            onClick={() => handleTabClick('register')}
            initial={{ x: 100 }}
            animate={{ x: (activeTab === 'login' || activeTab === 'pin-verify') ? '0%' : 0 }}
            transition={{ duration: 0.5 }}
          >
            Register
          </motion.h3>
          <motion.h3
            className={`text-2xl w-[50%] text-center py-[11px] px-[24.5px] rounded-md cursor-pointer ${(activeTab === 'login' || activeTab === 'pin-verify')
              ? 'bg-[#292D32] text-white'
              : 'bg-white text-black'
              }`}
            onClick={() => handleTabClick('login')}
            initial={{ x: -100 }}
            animate={{ x: (activeTab === 'register' || activeTab === 'pin-gen') ? '0%' : 0 }}
            transition={{ duration: 0.5 }}
          >
            Login
          </motion.h3>
        </div>
        {activeTab === 'register' && (
          <motion.div
            className="register-content"
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.5 }}
          >
            <p className='text-xl mb-[6px]'>Personal Details</p>
            <Register setRegisterSuccess={handleTabClick} />
          </motion.div>
        )}

        {activeTab === "pin-gen" && (
          <motion.div
            className="register-content"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
            transition={{ duration: 0.5 }}
          >
            <p className='text-xl mb-[6px]'>Enter the new pin</p>
            <PinGenerationComponent setPinGen={handleTabClick} />
          </motion.div>
        )}
        {activeTab === 'login' && (
          <motion.div
            className="login-content"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
            transition={{ duration: 0.5 }}
          >
            <p className='text-xl mb-[6px]'>Personal Details</p>
            <Login setTab={handleTabClick} />
          </motion.div>
        )}

        {activeTab === 'pin-verify' && (
          <motion.div
            className="login-content"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
            transition={{ duration: 0.5 }}
          >
            <p className='text-xl mb-[6px]'>Enter the pin for verfication</p>
            <PinVerification />
          </motion.div>
        )}
      </div>
      <ToastContainer />
    </div>
  )
}



export default LoginRegistrationComponent
