import React from 'react';


const Timetable: React.FC = () => {

    const timeRange = [
        '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00',
        '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'
    ];

    return (
        <div style={{position:"absolute", top:"15vh",}}>
            {timeRange.map((time, index) => (
                <div key={index} style={{
                    display: 'flex', alignItems: 'center', lineHeight: '4.5',  opacity: 0.3  }}>
                    <div style={{ marginRight: '8px' }}>{time}</div>
                    <hr style={{ width: '100%', margin: 0 , opacity: 0.5 }} />
                </div>
            ))}
        </div>
    );
};

export default Timetable;