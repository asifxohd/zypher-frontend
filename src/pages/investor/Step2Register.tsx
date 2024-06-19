import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import axios from 'axios';
import { BASE_URL } from '../../constents';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Step2Register: React.FC = () => {

    const [selectedIndustry, setSelectedIndustry] = useState<any[]>([]);
    const [selectedLocation, setSelectedLocation] = useState<any[]>([]);
    const [industryOptions, setIndustryOptions] = useState<any[]>([]);
    const [locationOptions, setLocationOptions] = useState<any[]>([]);
    const [error, setError] = useState(false);

    const navigate: (path: string, options?: { replace?: boolean }) => void = useNavigate();

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

    const handleIndustryChange = (selectedOptions: any) => {
        setSelectedIndustry(selectedOptions);
    };

    const handleLocationChange = (selectedOptions: any) => {
        setSelectedLocation(selectedOptions);
    };

    useEffect(() => {
        
        axios.get(BASE_URL + 'auth/getlocationandindustry/')
            .then(response => {
                
                const { industryData, locationData } = response.data
                const formattedIndustryOptions = industryData.map((industry: any) => ({
                    value: industry.value,
                    label: industry.label
                }));                
                const formattedLocationOptions = locationData.map((location: any) => ({
                    value: location.value,
                    label: location.label
                }));
    
                setIndustryOptions(formattedIndustryOptions);
                setLocationOptions(formattedLocationOptions);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);
    
    
    const handleSubmit = () => {
        if (selectedIndustry.length === 0 || selectedLocation.length === 0) {
            setError(true);
            return;
        }

        const userId = localStorage.getItem("userIdInvestor");
        console.log(userId);
        


        const selectedIndustryValues = selectedIndustry.map(option => option.value);
        const selectedLocationValues = selectedLocation.map(option => option.value);
    
        axios.post(BASE_URL + 'auth/saveIndustryandLocationInvestor', {
            industries: selectedIndustryValues,
            locations: selectedLocationValues,
            user_id:userId
        })
        .then(response => {
            navigate('/login')
        })
        .catch(error => {
            toast.error("please try again")
        });
    };
    
    

    return (
        <div className="bg-black w-full flex flex-row">
            <div className="p-8 max-md:h-svh flex justify-center max-md:w-full items-center md:w-1/2 bg-white text-black">
                <div className="max-w-md">
                    <h2 className="text-3xl font-thin mb-4 text-center">Choose Specific Industries and Locations</h2>
                    <div className="mb-6">
                        <label htmlFor="industry" className="block text-md text-gray-700">Select Industry</label>
                        <Select
                            id="industry"
                            name="industry"
                            className='border'
                            options={industryOptions}
                            value={selectedIndustry}
                            onChange={handleIndustryChange}
                            isMulti
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="location" className="block text-md font-medium text-gray-700">Select Location</label>
                        <Select
                            id="location"
                            name="location"
                            options={locationOptions}
                            value={selectedLocation}
                            onChange={handleLocationChange}
                            isMulti
                        />
                    </div>
                    <div className={error ? 'text-red-500 text-xs mb-2 ml-1': 'hidden'}>
                        please select atleast one location and Industry
                    </div>
                    <div className="mb-4">
                        <button type="submit" className="bg-black text-white py-2 px-7 rounded-lg hover:bg-gray-800 focus:outline-none focus:bg-gray-600" onClick={handleSubmit}>Continue</button>
                    </div>
                </div>
            </div>
            <div className="hidden md:block md:w-1/2">
                <img className="object-cover w-full h-svh" src="/login-img.png" alt="loginpage-image" />
            </div>
        </div>
    );
}

export default Step2Register;
