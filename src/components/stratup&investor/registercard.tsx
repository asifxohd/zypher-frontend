import { FC } from 'react';

interface CardProps {
    heading: string;
    subheading: string;
    buttonText: string;
    onClick: () => void;
}

const RegisterCard: FC<CardProps> = ({ heading, subheading, buttonText, onClick  }) => {



    return (
        <div className="rounded-lg shadow-md bg-white p-10 w-[20%] ">
            <div className="flex flex-col">
                <h2 className="text-3xl  font-semibold mb-2">{heading}</h2>
                <p className="text-gray-600  mb-4">{subheading}</p>
                <button
                    className="bg-black  text-white rounded-md py-2 px-4 hover:bg-gray-700 transition-colors"
                    onClick={onClick}
                >
                    {buttonText}
                </button>
            </div>
        </div>
    );
};

export default RegisterCard;
