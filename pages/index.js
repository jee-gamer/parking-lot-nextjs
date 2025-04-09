import Image from "next/image";
import React, {useEffect, useState} from "react";

export default function Home() {
	const [parkingSpots, setParkingSpots] = useState([]);

	useEffect(() => {
		const fetchParkingSpots = async () => {
			try {
				const response = await fetch("/api/parkingSpots"); // Call the API route
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

		fetchParkingSpots(); // Call the function to fetch parking spots
	}, []); // Empty dependency array ensures this only runs once when the component mounts

	return (
		<div id="main">
			<h1>Parking Lot</h1>
			<table>
				<thead>
				<tr>
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
