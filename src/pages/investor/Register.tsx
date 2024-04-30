import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { registerUser } from '../../Features/Action';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { useNavigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';

interface FormValues {
    username: string;
    full_name: string;
    phone_number: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: string;
}


const RegisterPage: React.FC = () => {
    const validationSchema = Yup.object().shape({
        full_name: Yup.string().required('full_name is required').min(3, 'full_name must be at least 3 characters long'),
        phone_number: Yup.string().required('Phone number is required').matches(/^\d{10}$/, 'Invalid phone number'),
        email: Yup.string().required('Email is required').email('Invalid email address'),
        password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters long'),
        confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match'),
        role: Yup.string().required('Please select user type'),
    });
    const dispatch = useDispatch<any>();
    const navigate: (path: string, options?: { replace?: boolean }) => void = useNavigate();

    const { validation_errors } = useSelector((store: RootState) => store.user);

    const formik = useFormik<FormValues>({
        initialValues: {
            full_name: '',
            phone_number: '',
            email: '',
            password: '',
            confirmPassword: '',
            role: '',
            username: '',
        },
        validationSchema: validationSchema,

        onSubmit: async (values, { setSubmitting, setStatus }) => {
            values.username = values.email;
            try {
                setSubmitting(true);
                const response = await dispatch(registerUser(values));
                console.log("this is response", response)

                if (response.type == 'user/register/fulfilled') {
                    navigate('/verify-otp');
                    const phoneNumber: string = response.meta.arg.phone_number;
                    Cookies.set('phoneNumber', phoneNumber);


                } else {
                    setStatus({ errors: response.errors || ['Unknown error occurred'] });
                }
            } catch (error) {
                console.error('Registration error:', error);
                setStatus({ errors: ['Unknown error occurred'] });
            } finally {
                setSubmitting(false);
            }
        },
    });


    return (
        <div className="bg-white flex flex-row w-full">
            <div className="p-8 max-md:h-svh flex justify-center max-md:items-center md:justify-center max-md:w-full items-center md:w-1/2">
                <div className="form-side">
                    <h2 className="text-2xl font-semibold  md:w-96 mb-4">Register</h2>

                    <form onSubmit={formik.handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Full Name</label>
                            <input
                                name="full_name"
                                type="text"
                                className="mt-1 p-2 block w-full border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                                required
                                value={formik.values.full_name}
                                onChange={formik.handleChange}
                            />
                            {validation_errors ? (
                                <div className='text-red-500' >{validation_errors.full_name}</div>
                            ) : (
                                ""
                            )}

                            {formik.errors.full_name && formik.touched.full_name ? (
                                <div className="text-red-500 text-sm">{formik.errors.full_name}</div>
                            ) : null}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Phone Number</label>
                            <input
                                name="phone_number"
                                type="text"
                                className="mt-1 p-2 block w-full border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                                required
                                value={formik.values.phone_number}
                                onChange={formik.handleChange}

                            />
                            {validation_errors ? (
                                <div className='text-red-500' >{validation_errors.phone_number}</div>
                            ) : (
                                ""
                            )}
                            {formik.errors.phone_number && formik.touched.phone_number ? (
                                <div className="text-red-500 text-sm">{formik.errors.phone_number}</div>
                            ) : null}

                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                name="email"
                                type="email"
                                className="mt-1 p-2 block w-full border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                                required
                                value={formik.values.email}
                                onChange={formik.handleChange}
                            />
                            {validation_errors ? (
                                <div className='text-red-500' >{validation_errors.email}</div>
                            ) : (
                                ""
                            )}

                            {formik.errors.email && formik.touched.email ? (
                                <div className="text-red-500 text-sm">{formik.errors.email}</div>
                            ) : null}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="mt-1 p-2 block w-full border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                                required
                                value={formik.values.password}
                                onChange={formik.handleChange}
                            />
                            {validation_errors ? (
                                <div className='text-red-500'>{validation_errors.password}</div>
                            ) : (
                                ""
                            )}
                            {formik.errors.password && formik.touched.password ? (
                                <div className="text-red-500 text-sm">{formik.errors.password}</div>
                            ) : null}
                        </div>
                        <div className="mb-">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                            <input
                                name="confirmPassword"
                                type="password"
                                className="mt-1 p-2 block w-full border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                                required
                                value={formik.values.confirmPassword}
                                onChange={formik.handleChange}
                            />
                            {formik.errors.confirmPassword && formik.touched.confirmPassword ? (
                                <div className="text-red-500 text-sm">{formik.errors.confirmPassword}</div>
                            ) : null}
                        </div>
                        <div className='mb-2'>
                            <div className="inline-flex items-center">
                                <label className="relative flex items-center p-2 rounded-full cursor-pointer" htmlFor="react">
                                    <input
                                        name="role"
                                        type="radio"
                                        value="investor"
                                        checked={formik.values.role === "investor"}
                                        onChange={formik.handleChange}
                                        className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-gray-900 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                                    />

                                    <span
                                        className="absolute text-gray-900 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor">
                                            <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                                        </svg>
                                    </span>
                                </label>
                                <label className="mt-px font-light text-gray-700 cursor-pointer select-none" htmlFor="react">
                                    Investor
                                </label>

                            </div>
                            <div className="inline-flex items-center">
                                <label className="relative flex items-center p-3 rounded-full cursor-pointer" htmlFor="react">
                                    <input
                                        name="role"
                                        type="radio"
                                        value="startup"
                                        checked={formik.values.role === "startup"}
                                        onChange={formik.handleChange}
                                        className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-gray-900 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                                    />
                                    <span
                                        className="absolute text-gray-900 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor">
                                            <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                                        </svg>
                                    </span>
                                </label>
                                <label className="mt-px font-light text-gray-700 cursor-pointer select-none" htmlFor="react">
                                    Startup
                                </label>
                            </div>
                            {formik.errors.role && formik.touched.role ? (
                                <div className="text-red-500 text-sm">{formik.errors.role}</div>
                            ) : null}

                        </div>
                        <div className="mb-3">
                            <button type="submit" className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 focus:outline-none focus:bg-gray-600">Register</button>
                        </div>
                        <p className='text-sm'>Already have an Account <u><Link to={'/login'}>Sign in</Link></u></p>
                    </form>
                </div>
            </div>
            <div className="hidden md:block md:w-1/2">
                <img className="object-cover w-full h-svh " src="login-img.png" alt="loginpage-image" />
            </div>

        </div>
    );
}

export default RegisterPage;
