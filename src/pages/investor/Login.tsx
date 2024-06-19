import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode'
import Modal from 'react-modal';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { BASE_URL } from '../../constents';
import jsCookies from 'js-cookie';
import { toast } from 'react-toastify';

interface UserData {
    username: string;
    email: string;
    phone_number: string;
    password: string;
    full_name: string;
    role: string; 
    jti?: string;
    given_name?: string;
}

interface DecodeCredntials {
    name: string;
    email: string;
}
const Login: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userInfoGoogleAuth, setUserInfoGoogleAuth] = useState<UserData>({});
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [userType, setUserType] = useState<string>('investor'); // Assuming userType is a string
    const [phoneNumberError, setPhoneNumberError] = useState<string>('');
    const [userTypeError, setUserTypeError] = useState<string>('');

    useEffect(()=> {
        const data: any = localStorage.getItem("decodedToken");
        const decodedToken = JSON.parse(data);
        
        if (decodedToken && decodedToken.role === "investor"){
            navigate('/investor')
        }else if (decodedToken && decodedToken.role === "startup"){
            navigate('/startup-home')
        }else if (decodedToken && decodedToken.role === "admin"){
            navigate('/admin')
        }
    }, [])

    const handleModalSubmit = async (event: any) => {
        event.preventDefault();
        let isValid = true;

        const phoneNumberRegex = /^[0-9]{10}$/;
        if (!phoneNumberRegex.test(phoneNumber)) {
            setPhoneNumberError('Phone number must be 10 digits');
            isValid = false;
        } else {
            setPhoneNumberError('');
        }

        if (isValid) {
            const data = {
                username: userInfoGoogleAuth.email,
                email: userInfoGoogleAuth.email,
                phone_number: phoneNumber,
                password: userInfoGoogleAuth.jti,
                full_name: userInfoGoogleAuth.given_name,
                role: userType
            };

            console.log(data);


            try {
                const response = await axios.post(`${BASE_URL}auth/googleauthvalidation/`, data);
                console.log('Data sent successfully:', response.data);
                const accessToken = response.data.access;
                const refreshToken = response.data.refresh
                const decodedToken: any = jwtDecode(accessToken);
                localStorage.setItem('decodedToken', JSON.stringify(decodedToken));
                jsCookies.set('accessToken', accessToken);
                jsCookies.set('refreshToken', refreshToken);

                if (decodedToken.role == "investor") {
                    navigate("/investor/step-2-register")

                } else if (decodedToken.role == "startup") {
                    navigate("/startup-home")

                } else {
                    navigate("/")
                }

            } catch (error: any) {
                if (error.response) {
                    console.log(error.response.data.detail)
                    toast.error(error.response.data.detail);

                } else if (error.request) {
                    console.error('Request Error:', error.request);
                } else {
                    console.error('Error:', error.message);
                }
            }
        }
    };

    const navigate = useNavigate();

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleLoginButton = async (values: any, { setSubmitting, setErrors }: any): Promise<void> => {
        console.log(values);
        try {
            const response = await axios.post(BASE_URL + 'api/token/', { username: values.email, password: values.password });
            const accessToken = response.data.access;
            const refreshToken = response.data.refresh
            const decodedToken: any = jwtDecode(accessToken);
            localStorage.setItem('decodedToken', JSON.stringify(decodedToken));
            jsCookies.set('accessToken', accessToken);
            jsCookies.set('refreshToken', refreshToken);

            if (decodedToken.role == "investor") {
                navigate("/investor")

            } else if (decodedToken.role == "startup") {
                navigate("/startup-home")

            } else {
                navigate("/")
            }

        } catch (error: any) {
            if (error.response) {
                console.log(error.response.data.detail)
                toast.error(error.response.data.detail);

            } else if (error.request) {
                console.error('Request Error:', error.request);
            } else {
                console.error('Error:', error.message);
            }
        } finally {
            setSubmitting(false);
        }
    };

    const validationSchema = Yup.object().shape({
        phoneNumber: Yup.string()
            .required('Phone number is required')
            .matches(/^[0-9]+$/, 'Must be only digits')
            .min(10, 'Must be at least 10 characters')
            .max(12, 'Must be at most 12 characters'),
        userType: Yup.string()
            .required('User type is required')
            .test('is-selected', 'User type is required', value => value !== '')

    });

    const LoginvalidationSchema = Yup.object().shape({
        email: Yup.string().required('Email is required').email('Invalid email address'),
        password: Yup.string()
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{}|\\[\]:";'<>?,./])[A-Za-z\d!@#$%^&*()\-_=+{}|\\[\]:";'<>?,./]{6,}$/,
                'Invalid Password Format'
            )
            .required('Password is required')
    });



    // const handleUserCheck = async () => {
    //     try {



    //     } catch (error) {
    //         openModal();
    //     }
    // };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: LoginvalidationSchema,

        onSubmit: handleLoginButton,
    });

    return (
        <div className="bg-white w-full flex flex-row">
            <div className="p-8 max-md:h-svh flex justify-center max-md:w-full items-center md:w-1/2">
                <div className="form-side">
                    <h2 className="text-2xl font-semibold mb-4">Welcome to ZHYPER <br /> Login To continue</h2>
                    <p className='mb-4'>Don't have an Account ? <u><Link to={'/register'}>Create a new account</Link></u></p>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input value={formik.values.email} onChange={formik.handleChange} type="email" id="email" name="email" className="mt-1 p-2 block w-full border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500" required />
                            {formik.errors.email && formik.touched.email ? (
                                <div className="text-red-500 text-sm">{formik.errors.email}</div>
                            ) : null}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input value={formik.values.password} onChange={formik.handleChange} type="password" id="password" name="password" className="mt-1 p-2 block w-full border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500" required />
                            {formik.errors.password && formik.touched.password ? (
                                <div className="text-red-500 text-sm">{formik.errors.password}</div>
                            ) : null}
                        </div>
                        <p className='text-sm text-end mb-4'>Forgot password?</p>
                        <div className="mb-4">
                            <button type="submit" className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 focus:outline-none focus:bg-indigo-600">Sign In </button>
                        </div>
                        <div className='' >
                            <GoogleLogin
                                onSuccess={async (credentialResponse: any) => {
                                    if (credentialResponse) {
                                        const decodedData = jwtDecode(credentialResponse.credential) as DecodeCredntials;
                                        console.log(decodedData);
                                        const { given_name, email, jti } = decodedData;
                                        setUserInfoGoogleAuth({ given_name, email, jti });
                                        console.log(userInfoGoogleAuth);

                                        try {
                                            const response = await axios.post(BASE_URL + 'auth/checkuser/', {
                                                email
                                            });
                                            const accessToken = response.data.access;
                                            const refreshToken = response.data.refresh
                                            const decodedToken: any = jwtDecode(accessToken);
                                            localStorage.setItem('decodedToken', JSON.stringify(decodedToken));
                                            jsCookies.set('accessToken', accessToken);
                                            jsCookies.set('refreshToken', refreshToken);

                                            if (decodedToken.role == "investor") {
                                                navigate("/investor")

                                            } else if (decodedToken.role == "startup") {
                                                navigate("/startup-home")

                                            } else {
                                                navigate("/")
                                            }
                                            console.log('Response:', response.data);

                                            //  handleUserCheck();


                                        } catch (error:any) {
                                            console.log(error);
                                            if (error.response.status === 403){
                                                toast.error("User Blocked")
                                            }else{
                                                openModal();

                                            }

                                        }
                                    } else {
                                        console.log('Login have been cancelled by user.');
                                    }
                                }}
                                onError={() => {
                                    console.log('Login Failed');
                                }}
                            />
                        </div>
                    </form>
                </div>
            </div>
            <div className="hidden md:block md:w-1/2">
                <img className="object-cover w-full h-svh " src="login-img.png" alt="loginpage-image" />
            </div>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                className="fixed inset-0 z-50 overflow-y-auto"
            >
                <div className="flex items-center justify-center min-h-screen">
                    <div className="bg-white p-6 rounded-lg max-w-md w-full">
                        <h2 className="text-2xl font-semibold mb-4">Authentication Successful!</h2>
                        <p className="mb-4">You are now authenticated with Google.</p>
                        <form onSubmit={handleModalSubmit}>
                            <div className="mb-4">
                                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
                                <input
                                    type="tel"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    className="mt-1 p-2 block w-full border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                                    required
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                                <div id="phoneNumberError" className="text-red-500">{phoneNumberError}</div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">User Type</label>
                                <div>
                                    <label className="inline-flex items-center mt-2">
                                        <input
                                            type="radio"
                                            className="form-radio h-5 w-5 text-gray-600"
                                            name="userType"
                                            value="startup"
                                            checked={userType === 'startup'}
                                            onChange={() => setUserType('startup')}
                                        />
                                        <span className="ml-2">Startup</span>
                                    </label>
                                    <label className="inline-flex items-center mt-2 ml-4">
                                        <input
                                            type="radio"
                                            className="form-radio h-5 w-5 text-gray-600"
                                            name="userType"
                                            value="investor"
                                            checked={userType === 'investor'}
                                            onChange={() => setUserType('investor')}
                                        />
                                        <span className="ml-2">Investor</span>
                                    </label>
                                </div>
                                <div id="userTypeError" className="text-red-500">{userTypeError}</div>
                            </div>

                            <div className="flex justify-between">
                                <button type="submit" className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 focus:outline-none focus:bg-gray-600">Submit</button>
                                <button type="button" onClick={closeModal} className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 focus:outline-none focus:bg-gray-400">Close</button>
                            </div>
                        </form>

                    </div>
                </div>
            </Modal>


        </div>

    );
}

export default Login;
