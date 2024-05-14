import React, { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import '../Pages/Styles/ParentHistory.css';
function ParentHistory() {
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const [showFromDatePicker, setShowFromDatePicker] = useState(false);
    const [showToDatePicker, setShowToDatePicker] = useState(false);

    const handleFromDateChange = (selectedDate) => {
        setFromDate(selectedDate);
        setShowFromDatePicker(false);
    };

    const handleToDateChange = (selectedDate) => {
        setToDate(selectedDate);
        setShowToDatePicker(false);
    };

    const showFromDatepicker = () => {
        setShowFromDatePicker(true);
    };

    const showToDatepicker = () => {
        setShowToDatePicker(true);
    };

    return (
        <div className="historypagecontainer">
            <div className="picker-container">
                <div className="picker-wrapper">
                    <label className="picker-text">From :</label>
                    <div className="date-picker-wrapper">
                        <button className="picker" onClick={showFromDatepicker}>
                            {fromDate.toDateString()}
                        </button>
                        {showFromDatePicker && (
                            <DateTimePicker
                                onChange={handleFromDateChange}
                                value={fromDate}
                                format="y-MM-dd"
                                className="date-time-picker"
                            />
                        )}
                    </div>
                </div>
                <div className="picker-wrapper">
                    <label className="picker-text">To :</label>
                    <div className="date-picker-wrapper">
                        <button className="picker" onClick={showToDatepicker}>
                            {toDate.toDateString()}
                        </button>
                        {showToDatePicker && (
                            <DateTimePicker
                                onChange={handleToDateChange}
                                value={toDate}
                                format="y-MM-dd"
                                className="date-time-picker"
                            />
                        )}
                    </div>
                </div>
            </div>
            <div className="flat-list">
                {data.map((item, index) => (
                    <div className="flat-list-row" key={index}>
                        <p className="date-time">Today, 11:30 AM</p>
                        <p className="history-type">History Type</p>
                        <p className="history-description">Description</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ParentHistory