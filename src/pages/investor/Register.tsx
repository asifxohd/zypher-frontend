import React from 'react';

const RegisterPage: React.FC = () => {
    return (
        <div className="bg-white flex flex-row w-full">
            <div className="p-8 max-md:h-svh flex justify-center max-md:items-center md:justify-center max-md:w-full items-center md:w-1/2">
                <div className="form-side">
                    <h2 className="text-2xl p-5 font-semibold w-72 md:w-96 mb-4">Register</h2>

                    <form>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Fullname</label>
                            <input type="text"  className="mt-1 p-2 block w-full border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">PhoneNumber</label>
                            <input type="text"  className="mt-1 p-2 block w-full border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input type="email"  className="mt-1 p-2 block w-full border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input type="password" id="password" name="password" className="mt-1 p-2 block w-full border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                            <input type="password" className="mt-1 p-2 block w-full border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500" required />
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
