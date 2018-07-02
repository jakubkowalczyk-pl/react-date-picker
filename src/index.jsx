import React from 'react';
import ReactDOM from 'react-dom';
import DatePicker from './date-picker';

ReactDOM.render(
    [
        <DatePicker label='Check In' key='checkin'/>,
        <DatePicker label='Check Out' key='checkout'/>,
    ],
    document.getElementById('root')
);