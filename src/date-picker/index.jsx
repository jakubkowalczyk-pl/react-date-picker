import React from 'react';
import PropTypes from 'prop-types';
import Calendar from '../calendar';
import * as css from './style.css';

export default class DatePicker extends React.PureComponent {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            /**
             * @type {Date}
             */
            date: undefined,
            active: false,
        };
    }

    toggle() {
        this.setState({ active: !this.state.active });
    }

    render() {
        const date = this.state.date ? `
            ${this.state.date.getFullYear()}-${this.state.date.getMonth()+1}-${this.state.date.getDate()}` :
            '';
        const { active } = this.state;
        const { label } = this.props;

        return <div className={css.container}>
            <span className={css.label} onClick={this.toggle}>{label}</span>

            <time dateTime={date}
                  onClick={this.toggle}
                  className={css.date}>
                {date}
            </time>

            {active && <Calendar
                className={css.calendar}
                date={this.state.date}
                onChange={date => this.setState({ date, active: false })}
            />}
        </div>
    }
}

DatePicker.propTypes = {
    label: PropTypes.string,
};