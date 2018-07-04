import React from 'react';
import PropTypes from 'prop-types';
import * as css from './style.css';

export default class Calendar extends React.PureComponent {
    static propTypes = {
        className: PropTypes.string,
        date: PropTypes.instanceOf(Date),
        onChange: PropTypes.func,
    };

    constructor(props) {
        const date = props.date || new Date;

        super(props);
        this.state = {
            /**
             * @type Date
             */
            selected: date,
            /**
             * @type Date
             */
            currentMonth: date,
            /**
             * @type {{ date: Date }[][]}
             */
            weeks: this.generateCells(date),
        };
    }

    /**
     * @param {Date} date
     * @returns {{ date: Date }[][]}
     */
    generateCells(date) {
        const first = new Date(date.getFullYear(), date.getMonth());
        const monday = new Date(+first - ((first.getDay() || 7)-1)*86400000);
        const weeks = [];
        let current = monday;

        do {
            const week = [];

            weeks.push(week);
            for (let i = 0; i < 7; ++i) {
                week.push({ date: new Date(+current + i*86400000) });
            }
            current = new Date(+week[week.length-1].date + 86400000);
        } while(current.getMonth() === date.getMonth());

        return weeks;
    }

    /**
     * @param {Date} date
     */
    setDate(date) {
       this.setState({ selected: date }, () => this.props.onChange(date));
    }

    /**
     * @param {number} i
     */
    moveMonth(i) {
        const currentMonth = new Date(this.state.currentMonth);

        currentMonth.setMonth(currentMonth.getMonth()+i);
        this.setState({
            currentMonth,
            weeks: this.generateCells(currentMonth),
        });
    }

    render() {
        const { selected, currentMonth, weeks } = this.state;
        const { className } = this.props;

        return <div className={className}>
            <div className={css.header}>
                <span className={css.navigation} onClick={() => this.moveMonth(-1)}>&lsaquo;</span>

                <time dateTime={`${currentMonth.getFullYear()} ${currentMonth.getMonth()}`}>
                    {`${currentMonth.toLocaleString('en-us', { month: "long" })} ${currentMonth.getFullYear()}`}
                </time>

                <span className={css.navigation} onClick={() => this.moveMonth(1)}>&rsaquo;</span>
            </div>

            <table className={css.month}>
            <tbody>
                <tr>
                    {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(dayName =>
                        <td className={css.dayName} key={dayName}>{dayName}</td>
                    )}
                </tr>
                {weeks.map((week, i) =>
                    <tr key={i}>
                        {week.map(cell =>
                            <td onClick={() => this.setDate(cell.date)}
                                key={+cell.date}
                                className={`
                                    ${css.cell}
                                    ${cell.date.getMonth() !== currentMonth.getMonth() ? css.cellAnotherMonth : ''}
                                    ${+cell.date === +selected ? css.cellSelected : ''}
                                `}>
                                {cell.date.getDate()}
                            </td>)}
                    </tr>)}
            </tbody>
            </table>
        </div>
    }
}