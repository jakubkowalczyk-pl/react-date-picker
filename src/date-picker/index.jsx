import React from 'react';
import PropTypes from 'prop-types';
import Calendar from '../calendar';
import * as css from './style.css';

export default class DatePicker extends React.PureComponent {
    static propTypes = {
        label: PropTypes.string,
        className: PropTypes.string,
    };

    static defaultProps = {
        label: 'Date',
        className: '',
    };

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
        const { label, className } = this.props;

        return <div className={`${css.container} ${className}`}>
            <div className={css.button} onClick={this.toggle}>
                <span className={css.label}>{label}</span>

                <time dateTime={date}
                      className={css.date}>
                    {date}
                </time>
            </div>

            {active && <Calendar
                className={css.calendar}
                date={this.state.date}
                onChange={date => this.setState({ date, active: false })}
            />}
        </div>
    }
}