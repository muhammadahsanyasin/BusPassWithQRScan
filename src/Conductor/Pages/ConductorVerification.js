import React, { useEffect, useState } from 'react';
import '../Pages/Styles/ConductorVerification.css';
import verified from '../../Assets/verified.png';

function ConductorVerification() {
    const [status, setStatus] = useState('Checking...');
    const [qrInfo, setQrInfo] = useState(null);

    useEffect(() => {
        const storedQrInfo = localStorage.getItem("qrinfo");
        if (storedQrInfo) {
            const parsedQrInfo = JSON.parse(storedQrInfo);
            setQrInfo(parsedQrInfo);

            const passId = parsedQrInfo.passId;
            const busId = parsedQrInfo.busId;

            fetch(`http://localhost/WebApi/api/Conductor/ScanQrCode?passId=${passId}&busId=${busId}`)
                .then(response => response.json())
                .then(data => {
                    if (data.isValid) {
                        setStatus('Valid');
                    } else {
                        setStatus('Invalid');
                    }
                })
                .catch(error => {
                    console.error('Error fetching the API:', error);
                    setStatus('Error');
                });
        }
    }, []);

    return (
        <div className="verification-screen">
            <div className="verification-container">
                <img src={verified} alt="Verification" className="verification-image" />
                <div className="status">Status: {status}</div>
                {qrInfo && (
                    <table className="info-table">
                        <thead>
                            <tr>
                                <th>Student Name</th>
                                <th>Registration No</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{qrInfo.Name}</td>
                                <td>{qrInfo.RegNo}</td>
                            </tr>
                        </tbody>
                        <thead>
                            <tr>
                                <th>Remaining Journey</th>
                                <th>Gender</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{qrInfo.RemainingJourneys}</td>
                                <td>{qrInfo.Gender}</td>
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
                                <td>{qrInfo.PassId}</td>
                                <td>{qrInfo.PassExpiry}</td>
                            </tr>
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default ConductorVerification;
