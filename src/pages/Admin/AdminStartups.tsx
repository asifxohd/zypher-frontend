import React, { useEffect, useState } from "react";
import AdminSideBar from "../../components/sideBarAdmin/AdminSideBar";
import jsCookies from 'js-cookie'
import { BASE_URL } from "../../constents";
import axios from "axios";
import Swal from 'sweetalert2'


interface Startups {
	id: number;
	full_name: string;
	email: string;
	phone_number: string;
	status: boolean;
}

const AdminStartups: React.FC = () => {
	const accessToken = jsCookies.get('accessToken');
    const [searchQuary, setSearchQuary] = useState('')
    const [startupData, setStartupData] = useState<Startups[]>([]);
    const [nextPage, setNextPage] = useState<string | null>(null);
    const [prevPage, setPrevPage] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
	const [flag, setFlag] = useState(false)


    useEffect(()=> {
        const fetchData = async ()=> {
            try {
                const response = await axios.get(`${BASE_URL}api/get-startups/`, {
                    headers:{
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                console.log(response.data);
                setStartupData(response.data.results)
                setNextPage(response.data.next);
                setPrevPage(response.data.previous);
                if (response.data.count) {
                    setTotalPages(Math.ceil(response.data.count / 6)); 
                }
                
            } catch (error) {
                console.error('Error fetching data:', error);

            }
        }
        fetchData();

    }, [flag])

    const handleNextPage = async () => {
        if (nextPage) {
            try {
                const response = await axios.get(nextPage, {
					headers:{
						Authorization:`Bearer ${accessToken}`
					}
				});
                setStartupData(response.data.results);
                setNextPage(response.data.next);
                setPrevPage(response.data.previous);
                setCurrentPage(currentPage + 1);
            } catch (error) {
                console.error('Error fetching next page:', error);
            }
        }
    };

    const handlePrevPage = async () => {
        if (prevPage) {
            try {
                const response = await axios.get(prevPage, {
					headers:{
						Authorization:`Bearer ${accessToken}`
					}
				});
                setStartupData(response.data.results);
                setNextPage(response.data.next);
                setPrevPage(response.data.previous);
                setCurrentPage(currentPage - 1);
            } catch (error) {
                console.error('Error fetching previous page:', error);
            }
        }
    };

    const handlePageClick = async (page: number) => {
        try {
            const response = await axios.get(`${BASE_URL}api/get-startups/?page=${page}`, {
				headers:{
					Authorization:`Bearer ${accessToken}`
				}
			});
            setStartupData(response.data.results);
            setNextPage(response.data.next);
            setPrevPage(response.data.previous);
            setCurrentPage(page);
        } catch (error) {
            console.error('Error fetching page:', error);
        }
    };



    const handleBlockButton = (id: number) => {
		Swal.fire({
			title: 'Are you sure?',
			text: 'You are about to change the status of this investor!',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#d33',
			cancelButtonColor: '#3085d6',
			confirmButtonText: 'Yes, proceed!'
		}).then((result) => {
			if (result.isConfirmed) {
				sendBlockRequest(id);
			}
		});
	}

	const sendBlockRequest = async (id: number) => {
		console.log(id);

		try {
			const response = await axios.patch(`${BASE_URL}api/change-status/`, { id },{
				headers:{
					Authorization:`Bearer ${accessToken}`
				}
			} );
			if (response.data.success) {
				if (flag){
					setFlag(false)
				}else{
					setFlag(true)
				}
			}
		} catch (error) {
			console.error('Error blocking/unblocking startup:', error);
		}
	};




    useEffect(() => {
		const delayTimer = setTimeout(() => {
			if (searchQuary.trim() !== '') {
				axios.get(`${BASE_URL}api/get-startups-info/?search=${searchQuary}`, {
					headers:{
						Authorization:`Bearer ${accessToken}`
					}
				})
					.then(response => {
						setStartupData(response.data);
					})
					.catch(error => {
						console.error('Error fetching search results:', error);
					});
			} else {

				if (flag){
					setFlag(false)
				}else{
					setFlag(true)
				}
			}
		}, 500);

		return () => clearTimeout(delayTimer);
	}, [searchQuary]);


    return (
        <>
            <AdminSideBar />
            <div className="p-4 sm:ml-64">
                <div className="p-5 mt-20 h-20">
                    <h2 className="text-2xl font-bold text-gray-600">Startups</h2>
                    <p className="text-xs">&nbsp;Home/<span className="font-bold text-xs"> Startups</span></p>
                </div>

                <div className="flex justify-end">
                    <input
                        type="text"
                        placeholder="Search"
                        onChange={(e)=> setSearchQuary(e.target.value)}
                        value={searchQuary}
                        className="border border-gray-300 lg:w-96 rounded-md px-4 py-2 mb-4 focus:outline-none focus:border-black"
                    />
                </div>

                <div className="container mx-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-800">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Image</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Full Name</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Email</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Phone Number</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Status</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Actions</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider ">Business <br /> Profile</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {startupData.map(item => (
                                <tr key={item.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <img className="h-10 w-10 rounded-full" src="https://via.placeholder.com/150" alt="User Avatar" />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.full_name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.phone_number}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.status ? "Active" : "Blocked"}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {item.status ? (
                                            <button onClick={()=> handleBlockButton(item.id)}  type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-xs px-4 py-1.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Block</button>
                                        ) : (
                                            <button  onClick={()=> handleBlockButton(item.id)}  type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-xs px-4 py-1.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900">UnBlock</button>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap" > <button className="bg-indigo-500 text-white px-4 py-1 text-xs rounded-lg focus:outline-none hover:bg-indigo-600 transition-colors">
                                        View More
                                    </button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    
                </div>
                <div>

            {
                searchQuary == '' ? <div className="flex justify-end mt-4">
                <nav className="relative z-0 inline-flex shadow-sm">
                    <div className="-space-x-px">
                        {prevPage && (
                            <button
                                onClick={handlePrevPage}
                                className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                Previous
                            </button>
                        )}
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                            <button
                                key={page}
                                onClick={() => handlePageClick(page)}
                                className={`relative inline-flex items-center px-4 py-2 border ${currentPage === page ? 'bg-indigo-500 text-white' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                    } text-sm font-medium focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500`}
                            >
                                {page}
                            </button>
                        ))}
                        {nextPage && (
                            <button
                                onClick={handleNextPage}
                                className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                Next
                            </button>
                        )}
                    </div>
                </nav>
            </div>
            : ''
            }
				</div>

            </div>
            
        </>
    );
};

export default AdminStartups;
