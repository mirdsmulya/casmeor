import React, {PropTypes} from 'react';


const SelectInput = ({name, value, defaultOption, options, label, onChange, error}) => {

  return (
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <div className="field">
          <select name={name}
                  value={value}
                  onChange={onChange}>
          <option value={value}>{value}</option>
          {options.map(option => {
            return (
              <option key={option.input} value={option.input}>
                {option.input}
              </option>
            );
          })}

          </select>
          {error && <div className="alert alert-danger">{error}</div>}
        </div>
      </div>

  );
};

SelectInput.propTypes = {
  name: React.PropTypes.string.isRequired,
  value: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func,
  defaultOption: React.PropTypes.string,
  option: React.PropTypes.string,
  error: React.PropTypes.string,
  label: React.PropTypes.string,
  options: React.PropTypes.array.isRequired

};

export default SelectInput;
