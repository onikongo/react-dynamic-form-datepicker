import React from 'react';
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Util from '@ninetynine/util';

const FormDatePicker = ({ name, placeholder, value, valid, onChange }) => {
    const onInternalChange = date => {
        const event = document.createEvent('Event');
        const value = date.toISOString()
            .slice(0, 19)
            .replace('T', ' ');

        event.initEvent('onChange', true, true);
        window.dispatchEvent(event);

        Object.defineProperty(event, 'target', {
            writable: false,
            value: {
                value,
                name,
            },
        });

        Object.defineProperty(event, 'persist', {
            writable: false,
            value: () => null,
        });

        onChange(event);
    };

    const className = classNames([
        'rdf-input',
        { 
            'input-invalid': !valid,
            'input-valid': valid
        },
    ]);

    return (
        <DatePicker
            className={className}
            placeholderText={placeholder || 'Select a date'}
            selected={Util.isEmpty(value) ? null : new Date(value)}
            onChange={onInternalChange}
        />
    );
};

FormDatePicker.defaultProps = {
    name: 'date',
    placeholder: 'Select a date',
    value: null,
    valid: true,
    onChange: () => null,
};

FormDatePicker.propTypes = {
    name: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    valid: PropTypes.bool,
    onChange: PropTypes.func,
};

export { FormDatePicker as default };