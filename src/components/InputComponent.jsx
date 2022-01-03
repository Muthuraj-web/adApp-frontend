import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'

export default function InputComponent({
	label,
	stateKey,
	value,
	setValue,
	type,
	placeholder,
	color,
	element
}) {
	const handleChange = (e) => {
		const newEdit = {
			[stateKey]: { value: e.currentTarget.value, color: 'black' }
		};
		setValue((prevState) => ({ ...prevState, ...newEdit }));
	};

	return (
		<div className='p-2 mt-1 mb-1'>
			{label?<label htmlFor={label}>{label}</label>:<></>}
			<element.type 
				style={{ border: `1px solid ${color}`,width:"100%" }}
				type={type}
				placeholder={placeholder}
				value={value}
				onChange={handleChange}
			/>
		</div>
	);
}
