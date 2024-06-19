import React from 'react';

const StepProgressBar: React.FC = () => {
    return (
        <>
            <div className="w-full mt-2 flex items-center gap-x-1">
                <div className="w-[22%] h-2.5 flex flex-col justify-center overflow-hidden bg-black text-xs text-white text-center whitespace-nowrap transition duration-500" role="progressbar" aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}></div>
                <div className="w-[22%] h-2.5 flex flex-col justify-center overflow-hidden bg-gray-300 text-xs text-white text-center whitespace-nowrap transition duration-500" role="progressbar" aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}></div>
                <div className="w-[22%] h-2.5 flex flex-col justify-center overflow-hidden bg-gray-300 text-xs text-white text-center whitespace-nowrap transition duration-500" role="progressbar" aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}></div>
                <div className="w-[22%] h-2.5 flex flex-col justify-center overflow-hidden bg-gray-300 text-xs text-white text-center whitespace-nowrap transition duration-500" role="progressbar" aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}></div>
                <p className="  text-sm text-black font-thin pl-5">25% completed</p>
            </div>

        </>
    );
};

export default StepProgressBar;
