import AdminSideBar from "../../components/sideBarAdmin/AdminSideBar";
const AdminInvestors: React.FC = () => {

	const data = [
		{
			id: 1,
			image: 'https://via.placeholder.com/150',
			fullName: 'John Doe',
			email: 'john.doe@example.com',
			phoneNumber: '+1234567890',
			status: true, // Active
		},
		{
			id: 2,
			image: 'https://via.placeholder.com/150',
			fullName: 'Jane Smith',
			email: 'jane.smith@example.com',
			phoneNumber: '+0987654321',
			status: false, // Blocked
		},
		{
			id: 3,
			image: 'https://via.placeholder.com/150',
			fullName: 'Alice Johnson',
			email: 'alice.johnson@example.com',
			phoneNumber: '+1122334455',
			status: true, // Active
		},
	];






	return (
		<>
			<AdminSideBar />
			<div className="p-4 sm:ml-64">
				<div className='p-5 mt-20 h-20' >
					<h2 className="text-2xl font-bold text-gray-600">Investors</h2>
					<p className="text-xs">&nbsp;Home/<span className="font-bold text-xs"> Investors</span></p>
				</div>
				<div className="flex justify-end">
					<input
						type="text"
						placeholder="Search"
						className="border border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:border-black"

					/>
				</div>

				<div className="container mx-auto">
					<table className="min-w-full divide-y  divide-gray-200">
						<thead className="bg-gray-800">
							<tr>
								<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Image</th>
								<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Full Name</th>
								<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Email</th>
								<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Phone Number</th>
								<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Status</th>
								<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Actions</th>
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-200">
							{data.map(item => (
								<tr key={item.id}>
									<td className="px-6 py-4 whitespace-nowrap">
										<img className="h-10 w-10 rounded-full" src={item.image} alt="User Avatar" />
									</td>
									<td className="px-6 py-4 whitespace-nowrap">{item.fullName}</td>
									<td className="px-6 py-4 whitespace-nowrap">{item.email}</td>
									<td className="px-6 py-4 whitespace-nowrap">{item.phoneNumber}</td>
									<td className="px-6 py-4 whitespace-nowrap">{item.status ? "Active" : "Blocked"}</td>
									<td className="px-6 py-4 whitespace-nowrap">
									<button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-1.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Block</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
					
				</div>

			</div>




		</>
	);
}

export default AdminInvestors

