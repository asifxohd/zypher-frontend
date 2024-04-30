import React from 'react';

const Step2Register: React.FC = () => {
    return (
        <>
            <div className="bg-white w-full flex flex-row">
                <div className="p-8 max-md:h-svh flex justify-center max-md:w-full items-center md:w-1/2 bg-white text-white">
                    <div className="max-w-md">
                        <h2 className="text-xl font-semibold mb-4">Choose Particular Industries</h2>
                        {/* Your industries selection component can go here */}
                        {/* For example, a dropdown menu */}
                        <select className="w-full border border-gray-300 rounded-md py-2 px-4 mb-4">
                            <option value="">Industry 1</option>
                            <option value="">Industry 2</option>
                            {/* Add more options as needed */}
                        </select>
                        <h2 className="text-xl font-semibold mb-4">Choose Particular Locations</h2>
                        {/* Your locations selection component can go here */}
                        {/* For example, a dropdown menu */}
                        <select className="w-full border border-gray-300 rounded-md py-2 px-4 mb-4">
                            <option value="">Location 1</option>
                            <option value="">Location 2</option>
                            {/* Add more options as needed */}
                        </select>
                        {/* Continue button */}
                        <button className="bg-white text-black py-2 px-4 rounded-lg hover:bg-gray-300 focus:outline-none focus:bg-indigo-600">Continue</button>
                    </div>
                </div>
                <div className="hidden md:block md:w-1/2">
                    <img className="object-cover w-full h-svh" src="login-img.png" alt="loginpage-image" />
                </div>
            </div>
        </>
    );
}

export default Step2Register;
