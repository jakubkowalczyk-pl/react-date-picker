import React from 'react';
import ReactDOM from 'react-dom';
import DatePicker from './date-picker';
import * as css from './style.css';

ReactDOM.render(
    <div className={css.container}>
        <DatePicker label='Check In' className={css.datePicker}/>
        <DatePicker label='Check Out' className={css.datePicker}/>
    </div>,
    document.getElementById('root')
);