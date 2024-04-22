import React, { useState } from 'react';
import OTPInput from "otp-input-react";


const OTP: React.FC = () => {
    const [OTP, setOTP] = useState<string>("");
    const inputStyles: React.CSSProperties = {
        backgroundColor: '#f0f0f0', 
        color: '#333', 
        fontSize: 16, 
        fontWeight: 'bold', 
        width: 50, 
        height: 50, 
        marginRight: '7px', 
        borderRadius: 5, 
    };
    


    return (
        <div className="bg-white flex flex-col md:flex-row">
            <div className="p-8 max-md:h-svh flex justify-center max-md:items-center md:justify-center items-center md:w-1/2">
                <div className="form-side">
                    <h2 className="text-2xl font-semibold mb-4">Enter The Code</h2>
                    <p className='mb-3'>Enter the code we sent to your email <br /> <span className='text-blue-300'>m**********654@gmail.com</span> be careful <br /> not to share the code with anyone </p>
                    
                    <p className='text-center mb-3'>00:00</p>
                    <div className="flex justify-center">
                    <OTPInput
                        value={OTP}
                        onChange={setOTP}
                        autoFocus
                        OTPLength={6}
                        otpType="number"
                        disabled={false}
                        inputStyles ={inputStyles}
                    />
                    </div>
                    <div className="mt-4">
                            <button type="submit" className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 focus:outline-none">Verify OTP</button>
                    </div>
                    <p className='text-center mt-3 text-gray-500'>Didn't Recive an OTP? <br /><u><span className='text-black'>Resent OTP</span></u></p>
                </div>
            </div>
            <div className="hidden md:block md:w-1/2">
                <img className="object-cover w-full h-svh" src="login-img.png" alt="loginpage-image" />
            </div>
        </div>
    );
}

export default OTP;
