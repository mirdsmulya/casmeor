import React from 'react';

const TextInput = ({ label, name, type, placeholder, className, onChange,value}) => {
    return (
        <div className="">
            <div>
            <label htmlFor={name}>{label}</label>
            </div>
            <input 
            name={name}
            type={type}
            placeholder={placeholder}
            className={className}
            onChange={onChange}
            value={value}
            
            />
        </div>
    );
};
export default TextInput;