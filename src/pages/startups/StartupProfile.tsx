import { useEffect, useState } from "react";
import StepProgressBar from "../../components/progressbar/StepProgressBar";
import axios from "axios";
import { BASE_URL } from "../../constents";
import jsCookies from 'js-cookie'


const StartupProfile: React.FC = () => {
    const accessToken = jsCookies.get('accessToken');
    const data: any = localStorage.getItem("decodedToken");
    const decodedToken = JSON.parse(data);
    const userId = decodedToken.user_id;
    const initialFormValues = {
        user_id: userId,
        title: '',
        industry: '',
        country: '',
        city: '',
        website_url: '',
        business_type: '',
        product_type: '',
        company_stage: '',
        annual_revenue: 0,
        seeking_amount: 0,
        employee_count: 0,
        linkedin_url: '',
        facebook_url: '',
        twitter_url: '',
        description: '',
        contact_number: '',
        email_address: '',
        company_name: 'jnwoinwownownw0'
    }
    
    const [isEditing, setIsEditing] = useState(false);
    const [formValues, setFormValues] = useState(initialFormValues);    
    const [errors, setErrors] = useState({});


    const handleSubmit = async () => {
        try {
            
            const response = await axios.post(`${BASE_URL}api/business/`, formValues, {
                headers:{
                    Authorization:`Bearer ${accessToken}`
            }});

            if (response.status === 200) {
                console.log("Form submitted successfully!");
            } else {
                console.error("Failed to submit form. Status:", response.status);
            }
        } catch (error:any) {
            console.error("Error submitting form:", error.message);
        }
    };

    return (
        <>
            <div className="progressbar w-full mb-5">
                <StepProgressBar />
            </div>
            <div className="basic-information  ">
                <div className="card h-60 flex bg-gray-200 rounded-md">

                    <div className="img">
                        <img className="h-56  pt-4 pl-4" src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="" />
                    </div>

                    <div className="w-[60%]">
                        <div className="compnay-name p-4 pt-8 pl-10">
                            <input className="bg-transparent focus:bg-transparent" type="text" value={formValues.company_name} disabled />
                        </div>
                        <div className="pl-11 mb-5 w-full">
                            <div className="relative  w-full min-w-[200px]">
                                <input
                                    placeholder="Your Company website URL"
                                    className={`peer h-full w-full border-b border-blue-gray-200 bg-transparent pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 ${isEditing ? '' : 'disabled:border-0 disabled:bg-blue-gray-50'
                                        }`}
                                    disabled={!isEditing}
                                    value={formValues.website_url}
                                />
                            </div>
                        </div>
                        <div className="pl-11 mb-5 w-full">
                            <input
                                placeholder="Company Contact Number"
                                className={`peer h-full w-full border-b border-blue-gray-200 bg-transparent pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 ${isEditing ? '' : 'disabled:border-0 disabled:bg-blue-gray-50'
                                    }`}
                                disabled={!isEditing}
                                value={formValues.contact_number}
                            />
                        </div>
                        <div className="pl-11 w-full">
                            <div className="relative  w-full min-w-[200px]">
                                <input
                                    placeholder="Company Email Address"
                                    className={`peer h-full w-full border-b border-blue-gray-200 bg-transparent pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 ${isEditing ? '' : 'disabled:border-0 disabled:bg-blue-gray-50'
                                        }`}
                                    disabled={!isEditing}
                                    value={formValues.email_address}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-7  flex px-3 border-b-black border-b-2" >
                    <div>
                        <button className=" rounded-t-2xl text-sm bg-gray-200 mr-2 hover:bg-gray-600 text-black font-bold py-2 px-6 ">
                            Details
                        </button>
                    </div>
                    <div>
                        <button className="text-black mr-2 text-sm hover:bg-gray-600 font-bold py-2 px-4 ">
                            Documents
                        </button>
                    </div>
                    <div>
                        <button className="text-black mr-2 text-sm hover:bg-gray-600  font-bold py-2 px-4 ">
                            Video pitch
                        </button>
                    </div>
                </div>

            </div>

            <div className="details flex justify-between">
                <div>
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                            name="Title"
                            type="text"
                            className="mt-1 p-2 block  lg:min-w-[700px] border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                            disabled={!isEditing}
                            value={formValues.title}
                        />
                    </div>
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">Industry</label>
                        <input
                            name="Industry"
                            type="text"
                            className="mt-1 p-2 block lg:min-w-[700px] border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                            disabled={!isEditing}
                            value={formValues.industry}
                        />
                    </div>
                    <div className="mt-4 flex gap-3">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Country</label>
                            <input

                                type="text"
                                className="mt-1 p-2 block lg:min-w-[343px] border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                                disabled={!isEditing}
                                value={formValues.country}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">City</label>
                            <input

                                type="text"
                                className="mt-1 p-2 block lg:min-w-[344px] border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                                disabled={!isEditing}
                                value={formValues.city}
                            />
                        </div>
                    </div>
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">WebsiteUrl</label>
                        <input
                            name="WebsiteUrl"
                            type="text"
                            className="mt-1 p-2 block lg:min-w-[700px] border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                            disabled={!isEditing}
                            value={formValues.website_url}
                        />
                    </div>
                </div>

                <div>
                    <div className="edit mt-9 md:pr-10">
                        {
                            isEditing ?
                                <button onClick={() => setIsEditing(false)} className="bg-transparent  text-black font-semibold hover:text-white py-2 px-11 text-sm border border-black hover:border-transparent rounded">
                                    Cancel 
                                </button>
                                :
                                
                                <button onClick={() => setIsEditing(!isEditing)} className="bg-transparent text-black font-semibold hover:text-white py-2 px-7 text-sm border border-black hover:border-transparent rounded">
                                Edit Profile
                            </button>
                        }
                    </div>

                    <div className="edit mt-5 md:pr-10">
                        <button className="bg-transparent text-red-500 text-sm font-semibold hover:text-white py-2 px-5 border border-red-500 hover:border-transparent rounded">
                            Unlist Startup
                        </button>
                    </div>
                    <div className="edit mt-5 md:pr-10">
                        <button className="bg-transparent text-sm text-green-900 font-semibold hover:text-white py-2 px-6 border border-green-900 hover:border-transparent rounded">
                            Fund Raised
                        </button>
                    </div>
                    <div className={isEditing ? "mt-5 md:pr-10 " : "mt-5 md:pr-10 hidden"}>
                        <button onClick={handleSubmit} className="bg-transparent text-blue-500 text-sm font-semibold hover:text-white py-2 px-11 border border-blue-500 hover:border-transparent rounded">
                            Submit
                        </button>
                    </div>
                </div>


            </div>

            <div className="additional-details mt-5">
                <h1><u>Additional Details About Business</u></h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">Business Type</label>
                        <input
                            name="WebsiteUrl1"
                            type="text"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                            disabled={!isEditing}
                            value={formValues.business_type}
                        />
                    </div>
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">Product Type</label>
                        <input
                            name="WebsiteUrl2"
                            type="text"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                            disabled={!isEditing}
                            value={formValues.product_type}
                        />
                    </div>
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">Company Stage</label>
                        <input
                            name="WebsiteUrl3"
                            type="text"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                            disabled={!isEditing}
                            value={formValues.company_stage}
                        />
                    </div>
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">Anuall Revenue</label>
                        <input
                            name="WebsiteUrl4"
                            type="text"
                            value={formValues.annual_revenue}
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                            disabled={!isEditing}
                            
                        />
                    </div>
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">Seeking Amount</label>
                        <input
                            name="WebsiteUrl5"
                            type="text"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                            disabled={!isEditing}
                            value={formValues.seeking_amount}
                        />
                    </div>
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">Employees Count</label>
                        <input
                            name="WebsiteUrl6"
                            type="text"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                            disabled={!isEditing}
                            value={formValues.employee_count}
                        />
                    </div>
                </div>
            </div>

            <div className="additional-details mt-5">
                <h1><u>Social Media Links of the  Business</u></h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">LinkedIn URL</label>
                        <input
                            name="WebsiteUrl1"
                            type="text"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                            disabled={!isEditing}
                            value={formValues.linkedin_url}
                        />
                    </div>
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">Facebook URL</label>
                        <input
                            name="WebsiteUrl2"
                            type="text"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                            disabled={!isEditing}
                            value={formValues.facebook_url}
                        />
                    </div>
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">X or Twitter URL</label>
                        <input
                            name="WebsiteUrl3"
                            type="text"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                            disabled={!isEditing}
                            value={formValues.twitter_url}
                        />
                    </div>

                </div>
            </div>

            <div className="details w-full  my-5">
                <h1><u>Description About Your Business</u></h1>
                <div className=" mt-5 w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <textarea
                        className="mt-1 p-2 w-full border  border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                        disabled={!isEditing}
                        rows={4}
                        cols={20}
                        value={formValues.description}
                    ></textarea>
                </div>
            </div>



        </>
    );
};
export default StartupProfile;