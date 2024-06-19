import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { LiaEdit } from "react-icons/lia";
import Modal from 'react-modal';
import Select from 'react-select';
import { BASE_URL } from '../../constents';
import jsCookies from 'js-cookie'


interface ProfileInfo {
    full_name: string;
    phone_number: string;
    email: string;
}

interface Location {
    name: string;
}

interface Industry {
    name: string;
}

const UserProfile: React.FC = () => {

    const [isPassworModal, setIsPassworModal] = useState(false)
    const [isEditProfileModal, setIsEditProfileModal] = useState(false)
    const accessToken = jsCookies.get('accessToken');
    const data: any = localStorage.getItem("decodedToken");
    const decodedToken = JSON.parse(data);
    const userId = decodedToken.user_id;
    const [profileInfo, setProfileInfo] = useState<ProfileInfo>({ full_name: '', phone_number: '', email: '' });
    const [locations, setLocations] = useState<Location[]>([]);
    const [industries, setIndustries] = useState<Industry[]>([]);
    const [preferences, setPreferences] = useState<any>({ preferred_locations: [], preferred_industries: [] });

    const [selectedLocations, setSelectedLocations] = useState([]);
    const [selectedIndustries, setSelectedIndustries] = useState([]);
    const [industryOptions, setIndustryOptions] = useState([]);
    const [locationOptions, setLocationOptions] = useState([]);
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BASE_URL}api/investors/${userId}/`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                console.log(response.data);
                
                setProfileInfo(response.data.user_details)
                setLocations(response.data.user_details.preferences[0].preferred_locations)
                setIndustries(response.data.user_details.preferences[0].preferred_industries)
                setSelectedLocations(response.data.user_details.preferences[0].preferred_locations.map(item => ({ value: item.name, label: item.name })));
                setSelectedIndustries(response.data.user_details.preferences[0].preferred_industries.map(item => ({ value: item.name, label: item.name })));

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();

        return () => {
        };
    }, []);

    const handleLocationChange = (selected:any) => {
        setSelectedLocations(selected);
    };

    const handleIndustryChange = (selected:any) => {
        setSelectedIndustries(selected);
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



    return (
        <>
            <div className="flex justify-between w-full max-md:flex-col-reverse p-4  border-gray-300 rounded-lg  mt-5 bg-gray-100">
                <div className="about-section">
                    <h1 className='text-3xl mb-1'>Manage Profile</h1>
                    <p className='font-thin text-sm pl-1 mb-6'>investor/ <span className='font-semibold'>Manage profile</span></p>
                    <hr className="border-t-2 border-black" />

                    <div className='flex justify-between'>
                        <div className="head font-sans  text-bold pl-4 mt-5 mb-4">About Me </div>
                        <div className="but pr-5 pt-5">
                            <button onClick={() => setIsEditProfileModal(true)} type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-1 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Edit Profile</button>
                        </div>
                    </div>

                    <div className='flex max-md:flex-col-reverse max-md:text-sm gap-10 bg-white rounded-lg shadow-md p-6'>
                        <div className="para max-md:w-full  font-light  ">
                            Please complete this description to inform businesses or startups about your area of
                            interest in investments. Clarify the types of companies you are seeking to invest in,
                            specifying industries, sectors, and preferred locations within India. This information
                            will help attract potential investment opportunities and facilitate meaningful partnerships.
                            Thank you for your attention to this matter.
                        </div>
                        <div className="profile-img min-w-52  ">
                            <img className='h-52 w-52' src="https://media.istockphoto.com/id/1327592506/vector/default-avatar-photo-placeholder-icon-grey-profile-picture-business-man.jpg?s=612x612&w=0&k=20&c=BpR0FVaEa5F24GIw7K8nMWiiGmbb8qmhfkpXcp1dhQg=" alt="profile image" />
                        </div>
                    </div>
                </div>


            </div>
            <div className='bg-white rounded-lg shadow-md p-6 mx-4'>
                <div className="basic-info px-3 flex flex-wrap">
                    <div className="w-full md:w-1/2 pr-2">
                        <label htmlFor="full_name" className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input type="text" value={profileInfo.full_name} className="mt-1 text-sm p-2 block w-full border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500" required disabled />
                    </div>
                    <div className="w-full md:w-1/2 ">
                        <label htmlFor="mobile_number" className="block text-sm font-medium text-gray-700">Mobile Number</label>
                        <input type="tel" id="mobile_number" value={profileInfo.phone_number} className="mt-1 p-2 block w-full text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500" required disabled />
                    </div>
                    <div className="w-full mt-3 md:w-1/2 pr-2">
                        <label htmlFor="email_address" className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input type="email" id="email_address" value={profileInfo.email} className="mt-1 p-2 text-sm block w-full border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500" required disabled />
                    </div>
                    <div onClick={() => setIsPassworModal(true)}>
                        <div className="flex w-full gap-5 bg-gray-100 rounded-sm  shadow-md mt-9 py-1.5 px-3  items-center justify-between">
                            <h1 className="text-sm font-semibold">Change Password</h1>
                            <div className=''>
                                <LiaEdit className="w-6 h-6" />
                            </div>
                        </div>
                    </div>

                </div>

                <div className="right w-full flex flex-col md:w-1/2 ">
                    <div className="locationandindustrys p-3 mt-3">
                        <h1 className="text-lg  font-semibold">Location Preferences</h1>
                        <ul className="mt-2 flex max-md:flex-col gap-4 max-md:text-sm font-thin">
                            {locations.map((item, index) => (
                                <li key={index} className="text-sm">{item.name}</li>
                            ))}

                        </ul>
                    </div>
                    <div className="locationandindustrys p-3">
                        <h1 className="text-lg font-semibold">Industry Preferences</h1>
                        <ul className="mt-2 flex max-md:flex-col gap-4 max-md:text-sm font-thin">
                            {industries.map((item, index) => (
                                <li key={index} className="text-sm">{item.name}</li>
                            ))}

                        </ul>
                    </div>

                </div>
            </div>





            {/* modal comonents */}
            <Modal
                isOpen={isPassworModal}
                onRequestClose={() => setIsPassworModal(false)}
                contentLabel="Change Password"
                className="md:w-96 max-md:w-72 max-md:mt-28  mx-auto md:mt-44"
            >
                <div className="bg-white p-6 rounded-lg shadow-xl">
                    <h2 className="text-xl font-bold mb-4">Change Password</h2>
                    <form >
                        <div className="mt-4">
                            <label htmlFor="current-password" className="block text-sm font-medium text-gray-700">Enter Current password</label>
                            <input type="password" id="current-password" className="mt-1 p-2 block w-full border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500" required />
                        </div>
                        <div className="mt-4">
                            <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">Enter New password</label>
                            <input type="password" id="new-password" className="mt-1 p-2 block w-full border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500" required />
                        </div>
                        <div className="mt-4">
                            <label htmlFor="confirm-new-password" className="block text-sm font-medium text-gray-700">Confirm New password</label>
                            <input type="password" id="confirm-new-password" className="mt-1 p-2 block w-full border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500" required />
                        </div>
                        <div className="mt-4 flex justify-end">
                            <button onClick={() => setIsPassworModal(false)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2">Cancel</button>
                            <button type="submit" className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Submit</button>
                        </div>
                    </form>
                </div>
            </Modal>





            {/* edit profile modal  */}

            <Modal
                isOpen={isEditProfileModal}
                onRequestClose={() => setIsEditProfileModal(false)}
                contentLabel="Change Profile Section"
                className="w-full max-md:mt-10 md:w-[60%]  lg:w-[40%] mx-auto md:mt-16"
            >
                <div className="bg-white p-6 rounded-lg shadow-xl">
                    <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
                    <form>
                        <div className="mt-4">
                            <label htmlFor="profile-image" className="block text-sm font-medium text-gray-700">Profile Image</label>
                            <input type="file" value={preferences.image ? preferences.image : ""} id="profile-image" accept="image/*" className="mt-1 p-2 block w-full border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500" required />
                        </div>
                        <div className="mt-4">
                            <label htmlFor="full-name" className="block text-sm font-medium text-gray-700">Full Name</label>
                            <input value={profileInfo.full_name} type="text" id="full-name" className="mt-1 p-2 block w-full border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500" required />
                        </div>
                        <div className="mt-4">
                            <label htmlFor="industry" className="block text-md font-medium text-gray-700">Select Industry</label>
                            <Select
                                id="industry"
                                name="industry"
                                className='border'
                                options={locationOptions}
                                value={selectedLocations}
                                isMulti
                                onChange={handleLocationChange}

                            />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="location" className="block text-md font-medium text-gray-700">Select Location</label>
                            <Select
                                id="location"
                                name="location"
                                options={industryOptions}
                                value={selectedIndustries}
                                isMulti
                                onChange={handleIndustryChange}

                            />
                        </div>
                        <div className="mt-4">
                            <label htmlFor="description" className="block text-md font-medium text-gray-700">Description</label>
                            <textarea value={preferences.description ? preferences.description : ''} id="description" rows={4} className="mt-1 p-2 block w-full border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500" required />
                        </div>
                        <div className="mt-4 flex justify-end">
                            <button onClick={() => setIsEditProfileModal(false)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2">Cancel</button>
                            <button type="submit" className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Submit</button>
                        </div>
                    </form>

                </div>
            </Modal>


        </>
    );
};

export default UserProfile;
