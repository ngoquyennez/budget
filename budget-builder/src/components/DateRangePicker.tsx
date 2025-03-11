import React, { useState } from 'react';

const DateRangePicker: React.FC<{ onDateChange: (startDate: Date, endDate: Date) => void }> = ({ onDateChange }) => {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const date = new Date(event.target.value);
        setStartDate(date);
        if (endDate) {
            onDateChange(date, endDate);
        }
    };

    const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const date = new Date(event.target.value);
        setEndDate(date);
        if (startDate) {
            onDateChange(startDate, date);
        }
    };

    return (
        <div className="flex flex-wrap gap-6 items-center">
            <h3 className="text-xl font-semibold text-gray-700">Select Date Range</h3>
            <div className="flex gap-4 flex-1">
                <label className="flex-1">
                    <span className="input-label block">Start Date:</span>
                    <input 
                        type="date" 
                        onChange={handleStartDateChange}
                        className="input-category w-full" 
                    />
                </label>
                <label className="flex-1">
                    <span className="input-label block">End Date:</span>
                    <input 
                        type="date" 
                        onChange={handleEndDateChange}
                        className="input-category w-full" 
                    />
                </label>
            </div>
        </div>
    );
};

export default DateRangePicker;