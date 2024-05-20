import React from 'react';
import '../Pages/Styles/ConductorVerification.css';
import verified from '../../Assets/verified.png'
function ConductorVerification() {
    return (
        <div className="verification-screen">
        <div className="verification-container">
            <img src={verified} alt="Verification" className="verification-image" />
            <div className="status">Status: Valid</div>
            <table className="info-table">
                <thead>
                    <tr>
                        <th>Student Name</th>
                        <th>Registration No</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>John Doe</td>
                        <td>12345678</td>
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
                        <td>10</td>
                        <td>Male</td>
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
                        <td>ABCD1234</td>
                        <td>2024-12-31</td>
                    </tr>
                </tbody>
            </table>
        </div>
        </div>
    );
}

export default ConductorVerification;
