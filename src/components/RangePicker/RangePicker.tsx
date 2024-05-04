import React from 'react';
import { DatePicker } from 'antd';
import type { DatePickerProps } from 'antd';
import type { Dayjs } from 'dayjs';

const { RangePicker } = DatePicker;
interface DateRangePickerProps {
    startDate: Dayjs | null;
    endDate: Dayjs | null;
    onDateRangeChange: (start: Dayjs | null, end: Dayjs | null) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ startDate, endDate, onDateRangeChange }) => {
    const disabledDate: DatePickerProps['disabledDate'] = (current, { from }) => {
        if (from) {
            return Math.abs(current.diff(from, 'days')) >= 7;
        }
        return false;
    };

    return (
        <RangePicker
            value={[startDate, endDate]}
            onChange={(dates) => onDateRangeChange(dates ? dates[0] : null, dates ? dates[1] : null)}
            disabledDate={disabledDate}
        />
    );
};

export default DateRangePicker;