import React, { useEffect, useState } from 'react';
import '../Pages/Styles/ConductorVerification.css';
import verified from '../../Assets/verified.png';

function ConductorVerification() {
    const [status, setStatus] = useState('Checking...');
    const [qrInfo, setQrInfo] = useState(null);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null); // State to store API response data

    useEffect(() => {
        const storedQrInfo = localStorage.getItem("qrinfo");
        if (storedQrInfo) {
            const parsedQrInfo = JSON.parse(storedQrInfo);
            setQrInfo(parsedQrInfo);

            const passId = parsedQrInfo.PassId;
            const conductorDetails = localStorage.getItem("user");

            if (conductorDetails) {
                const busId = JSON.parse(conductorDetails).Conductors.BusId;

                console.log(`Fetching API with passId=${passId} and busId=${busId}`);
                fetch(`http://localhost/WebApi/api/Conductor/ScanQrCode?passId=${passId}&busId=${busId}`)
                    .then(response => {
                        if (!response.ok) {
                            return response.json().then(errorData => {
                                throw new Error(`Server error: ${errorData}`);
                            });
                        }
                        return response.json();
                    })
                    .then(data => {
                        console.log('here========================');
                        console.log(data);
                        setData(data); // Set the fetched data
                        if (data.PassStatus === "Active") {
                            setStatus('Valid');
                        } else {
                            setStatus('Invalid');
                        }
                    })
                    .catch(error => {
                        console.error('Error fetching the API:', error);
                        setError(error.message);
                        setStatus('Error');
                    });
            } else {
                console.error('Error: No conductor details found');
                setError('No conductor details found');
                setStatus('Error');
            }
        } else {
            console.error('Error: No QR info found');
            setError('No QR info found');
            setStatus('Error');
        }
    }, []);

    return (
        <div className="verification-screen">
            <div className="verification-container">
                <img src={Image} alt="Verification" className="verification-image" />
                <div className="status">Status: {status}</div>
                {error && <div className="error-message">Error: {error}</div>}
                {data && (
                    <table className="info-table">
                        <thead>
                            <tr>
                                <th>Student Name</th>
                                <th>Registration No</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{data.Name}</td>
                                <td>{data.RegNo}</td>
                            </tr>
                        </tbody>
                        <thead>
                            <tr>
                                <th>Remaining Journeys</th>
                                <th>Gender</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{data.RemainingJourneys}</td>
                                <td>{data.Gender}</td>
                            </tr>
                        </tbody>
                        <thead>
                            <tr>
                                <th>Pass ID</th>
                                <th>Pass Expiry Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{data.PassId}</td>
                                <td>{data.PassExpiry}</td>
                            </tr>
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default ConductorVerification;
