import React from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import TextField from '@material-ui/core/TextField';

const NumberFormatCustom = (props) => {
  const { inputRef, onChange, prefix, decimalScale, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix={prefix}
      decimalScale={decimalScale}
    />
  );
};

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  prefix: PropTypes.string.isRequired,
  decimalScale: PropTypes.number,
};

NumberFormatCustom.defaultProps = {
  decimalScale: 2
};

const NumberInput = (props) => {
  const { value, setValue, prefix, decimalScale, label } = props;

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <TextField
      label={label}
      value={value}
      onChange={handleChange}
      prefix={prefix}
      name="numberformat"
      id="formatted-numberformat-input"
      InputProps={{
        inputComponent: NumberFormatCustom,
        inputProps: {
          prefix: prefix,
          decimalScale: decimalScale,
        },
      }}
    />
  );
};

NumberInput.propTypes = {
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  prefix: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  decimalScale: PropTypes.number,
};

NumberInput.defaultProps = {
  decimalScale: 2
};

export default NumberInput;
