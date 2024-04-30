import React from 'react';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
    
    return (
        <div className="bg-white w-full flex flex-row">
            <div className="p-8 max-md:h-svh flex justify-center max-md:w-full items-center md:w-1/2">
                <div className="form-side">
                    <h2 className="text-2xl font-semibold mb-4">Welcome to ZHYPER <br /> Login To continue</h2>
                    <p className='mb-4'>Don't have an Account ? <u><Link to={'/register'}>Create a new account</Link></u></p>
                    <form>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input type="email" id="email" name="email" className="mt-1 p-2 block w-full border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input type="password" id="password" name="password" className="mt-1 p-2 block w-full border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500" required />
                        </div>
                        <p className='text-sm text-end mb-4'>Forgot password?</p>
                        <div className="mb-4">
                            <button type="submit" className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 focus:outline-none focus:bg-indigo-600">Register</button>
                        </div>
                        
                    </form>
                </div>
            </div>
            <div className="hidden md:block md:w-1/2">
                <img className="object-cover w-full h-svh " src="login-img.png" alt="loginpage-image" />
            </div>

        </div>
    );
}

export default Login;
