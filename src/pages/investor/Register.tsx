import React from 'react';

const RegisterPage: React.FC = () => {

    return (
        <div className="bg-white flex flex-row w-full">
            <div className="p-8 max-md:h-svh flex justify-center max-md:items-center md:justify-center max-md:w-full items-center md:w-1/2">
                <div className="form-side">
                    <h2 className="text-2xl font-semibold  md:w-96 mb-4">Register</h2>

                    <form>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Fullname</label>
                            <input type="text" className="mt-1 p-2 block w-full border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">PhoneNumber</label>
                            <input type="text" className="mt-1 p-2 block w-full border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input type="email" className="mt-1 p-2 block w-full border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input type="password" id="password" name="password" className="mt-1 p-2 block w-full border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500" required />
                        </div>
                        <div className="mb-">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                            <input type="password" className="mt-1 p-2 block w-full border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500" required />
                        </div>
                        <div className='mb-2'>
                            <div className="inline-flex items-center">
                                <label className="relative flex items-center p-2 rounded-full cursor-pointer" htmlFor="react">
                                    <input name="type" type="radio"
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
                                    <input name="type" type="radio"
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
                            
                        </div>
                        <div className="mb-3">
                            <button type="submit" className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 focus:outline-none focus:bg-gray-600">Register</button>
                        </div>
                        <p className='text-sm'>Already have an Account <u>Sign in </u></p>
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
