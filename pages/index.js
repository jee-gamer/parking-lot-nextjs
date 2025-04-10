import Image from "next/image";
import "./globals.css";
import React, {useEffect, useState} from "react";
import axios from "axios";

export default function Home() {
	const [parkingSpots, setParkingSpots] = useState([]);
	const [licensePlate, setLicensePlate] = useState([]);
	const [createLicensePlate, setCreateLicensePlate] = useState([]);
	const [vehicleType, setVehicleType] = useState([]);

	const handleLicensePlate = (e) => {
		setLicensePlate(e.target.value);  // Update state with input value
	};
	const handleVehicleType = (e) => {
		setVehicleType(e.target.value);  // Update state with input value
	};
	const handleCreateLicensePlate = (e) => {
		setCreateLicensePlate(e.target.value);  // Update state with input value
	};

	const handlePark = async () => {
			const body = {
				licensePlate: licensePlate,
				park: true,
			}
			await axios.post("/api/park", body)
				.then( function (response) {
					const {message} = response.data;
					alert(message);
				}
			)
				.catch(
				function (error) {
					alert(error.response.data.message);
				}
			)
		window.location.reload();
	};

	const handleUnpark = async () => {
		const body = {
			licensePlate: licensePlate,
			park: false,
		}
		await axios.post("/api/park", body)
			.then( function (response) {
					const {message} = response.data;
					alert(message);
				}
			)
			.catch(
				function (error) {
					alert(error.response.data.message);
				}
			)
		window.location.reload();
	};

	const handleCreateVehicle = async () => {
		const body = {
			licensePlate: licensePlate,
			vehicleType: vehicleType,
		}
		await axios.post("/api/vehicle", body)
			.then( function (response) {
					const {message} = response.data;
					alert(message);
				}
			)
			.catch(
				function (error) {
					alert(error.response.data.message);
				}
			)
	};

	useEffect(() => {
		const fetchParkingSpots = async () => {
			try {
				const response = await fetch("/api/parkingSpots");
				console.log("response", response);
				if (!response.ok) {
					return
				}
				const { data } = await response.json();
				console.log("parkingSpots: ", data);
				setParkingSpots(data); // Set the fetched parking spots into state

			} catch (error) {
				console.error("Error fetching parking spots:", error);
			}
		};

		fetchParkingSpots();
	}, []);

	return (
		<div id="main" className="flex flex-col items-center justify-center p-5">
			<span className="text-8xl pb-10">Parking Lot</span>

			<div className="flex flex-row items-center justify-center p-5 gap-2">
				<label htmlFor="parkingSpots" className="text-3xl mr-5">Register Vehicle: </label>
				<input
					type="text"
					value={createLicensePlate}
					onChange={handleCreateLicensePlate}
					className="border px-4 py-2 rounded"
					placeholder="License Plate"
				/>
				<input
					type="text"
					value={vehicleType}
					onChange={handleVehicleType}
					className="border px-4 py-2 rounded"
					placeholder="Vehicle Type"
				/>
				<button
					onClick = {handleCreateVehicle}
					className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
				>
					Register
				</button>
			</div>

			<div className="flex flex-row items-center justify-center p-5 gap-2">
				<label htmlFor="parkingSpots" className="text-3xl mr-5">Park Vehicle: </label>
				<input
					type="text"
					value={licensePlate}
					onChange={handleLicensePlate}
					className="border px-4 py-2 rounded"
					placeholder="License Plate"
				/>
				<button
					onClick = {handlePark}
					className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
				>
					Park
				</button>
				<button
					onClick = {handleUnpark}
					className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
				>
					Unpark
				</button>
			</div>

			<table className="table-auto border border-collapse border-gray-400 min-w-300 w-4/5">
				<thead>
				<tr className="bg-gray-100">
					<th>ParkingSpot ID</th>
					<th>SpotSize</th>
					<th>Row</th>
					<th>SpotNumber</th>
					<th>LicensePlate</th>
					<th>Type</th>
				</tr>
				</thead>
				<tbody>
				{parkingSpots.map((row) => (
					<tr key={row._id}>
						<td>{row._id}</td>
						<td>{row.spotSize}</td>
						<td>{row.row}</td>
						<td>{row.spotNumber}</td>
						<td>{row.vehicle?.licensePlate || "None"}</td>
						<td>{row.vehicle?.__t || "None"}</td>
					</tr>
				))}
				</tbody>
			</table>
		</div>
	);
}
