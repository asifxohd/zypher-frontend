import React, { CSSProperties, useEffect, useState } from 'react';
import OtpInput from 'react-otp-input';
import axios from 'axios'; // Import Axios
import { BASE_URL } from '../../constents';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const OTP: React.FC = () => {
    const [otp, setOtp] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const navigate = useNavigate()
    const { role } = useSelector((store: RootState) => store.user);


    useEffect(() => {
        console.log((role.payload));
        const phoneNumberCookie = Cookies.get('phoneNumber');
        if (phoneNumberCookie) {
            setPhoneNumber(phoneNumberCookie)
        }
    }, []);

    useEffect(()=> {
        const data: any = localStorage.getItem("decodedToken");
        const decodedToken = JSON.parse(data);
        if (decodedToken && decodedToken.role === "investor"){
            navigate('investor')
        }else if (decodedToken && decodedToken.role === "startup"){
            navigate('/startup-home')
        }else if (decodedToken && decodedToken.role === "admin"){
            navigate('/admin')
        }
    }, [])

    const inputStyles: CSSProperties = {
        backgroundColor: '#f0f0f0',
        color: '#333',
        fontSize: 16,
        fontWeight: 'bold',
        width: 50,
        height: 50,
        marginRight: '7px',
        borderRadius: 5,
        appearance: 'textfield'
    };
    const data = {
        otp: otp,
        phone_number: phoneNumber
    };

    const verifyOTP = () => {
       
        axios.post<{ message: string }>(BASE_URL + 'auth/verify/otp/', data)
            .then(response => {
                toast.success(response.data.message);
                console.log(response);
                
                if (role.payload === 'investor'){
                    console.log(response);
                    localStorage.setItem("userIdInvestor", response.data.user)
                    navigate('/investor/step-2-register')
                }else{

                }
            })
            .catch(error => {
                toast.error(error.response.data.message);                
            });
    };

    const handleResendOtp = () => {

        axios.post<{ message: string }>(BASE_URL + 'auth/resend/otp/', data)
            .then(response => {
                toast.success(response.data.message);
                setOtp('')
            })
            .catch(error => {
                toast.error(error.response.data.message);
            });
            
    }

    return (
        <div className="bg-white flex flex-col md:flex-row">
            <div className="p-8 max-md:h-svh flex justify-center max-md:items-center md:justify-center items-center md:w-1/2">
                <div className="form-side">
                    <h2 className="text-2xl font-semibold mb-4">Enter The Code</h2>
                    <p className='mb-3'>Enter the code we sent to your Mobile number <br /> <span className='text-blue-300'>+91 {phoneNumber[0]} **** ***{phoneNumber[8]}{phoneNumber[9]}</span> be careful <br /> not to share the code with anyone </p>

                    <p className='text-center mb-3'>00:00</p>
                    <div className="flex justify-center">
                        <OtpInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={6}
                            renderSeparator={<span></span>}
                            renderInput={(props) => <input  {...props} />}
                            inputStyle={inputStyles}
                        />
                    </div>
                    <div className="mt-4">
                        <button type="submit" onClick={verifyOTP} className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 focus:outline-none">Verify OTP</button>
                    </div>
                    <p className='text-center mt-3 text-gray-500'>Didn't Recive an OTP? <br /><u><button onClick={handleResendOtp} className='text-black'>Resent OTP</button></u></p>
                </div>
            </div>
            <div className="hidden md:block md:w-1/2">
                <img className="object-cover w-full h-svh" src="login-img.png" alt="loginpage-image" />
            </div>
        </div>
    );
}

export default OTP;
