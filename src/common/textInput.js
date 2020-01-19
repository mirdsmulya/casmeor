import React from 'react';

const TextInput = ({name, type, placeholder, className, onChange,value}) => {
    return (
        <div className="">
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