import React from 'react';
import { useState } from 'react';
import Modal from 'react-modal';
import RegisterCard from '../stratup&investor/registercard';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
    const [registerModal, setRegisterModal] = useState<boolean>(false);

    const handleInvestorRegister = () => {

    }


    return (
        <>
            <div className="root-landing bg-white ">
                <nav className='flex flex-row  justify-between py-4 md:px-28 sm:px-10'>
                    <div className="logo-div flex items-center">
                        <img className='h-12' src="brand.png" alt="brand-logo" />
                    </div>
                    <div className="button-div flex items-center px-3">
                    <Link to={'/login'}>
                    <button
                            className="select-none  rounded-3xl mr-8 bg-gray-900 h-10 px-7 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            type="button"
                        >
                            Login 
                        </button>
                    </Link>
                        
                    </div>
                </nav>

                <div className="firstview flex flex-col  md:flex-row md:justify-around">
                    <div className="left-side ">
                        <p className='text-6xl sm:text-7xl md:text-8xl  sm:pl-10 p-5 font-light'>Invest in <br /> Tomorrow's <br />Innovations <br /> Connect <br />Today</p>
                        <Link to={'/register'}>
                            <button
                                className="select-none sm:ml-12 rounded-3xl mr-3 bg-gray-900 my-5 ml-5 py-4 px-9 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                type="button"
                            >
                                Get Started
                            </button>
                        </Link>
                    </div>
                    <div className="right-side mt-5">
                        <img className='h-[85%]' src="Image.png" alt="landing-page-image" />
                    </div>
                </div>
            </div>

        </>
    );
};

export default LandingPage;
