import React, { useState } from 'react';
import InputComponent from '../InputComponent';
import {getTokenValues,checkAndSetErr, initialLoginState,loginEndPoint} from '../../utils'
import Axios  from 'axios';
import { useNavigate } from 'react-router';

export default function Login({setErr,setAuth}) {

	const [state, setState] = useState(() => {
		return {...initialLoginState };
	});

	const navigate = useNavigate()

	const handleSubmit = async (e) => {
		e.preventDefault();

		const email = state.email.value;
		const password = state.password.value;

		if (checkAndSetErr(email.length===0,setState,'email',email,setErr,'Email Field is Empty')) return true
		if (checkAndSetErr(password.length<0,setState,'password',password,setErr,'Password Field Must contain more than 8 characters')) return true

		try {
			const result = await Axios.post(loginEndPoint, {email,password});
			if ('err' in result.data) throw new Error(result.data.err)
			else {
				localStorage.setItem('token',result.data.token)
				setAuth({})
				navigate('/')
			}
		} 
		catch(e) {
			setErr(e.message)
		}
	};

	return (
		<form onSubmit={handleSubmit} className='border border-top-0'>
			<InputComponent
				label={'Email'}
				stateKey={'email'}
				value={state.email.value}
				color={state.email.color}
				setValue={setState}
				type={'email'}
				placeholder={'Type your email'}
				element={<input />}
			/>
			<InputComponent
				label={'Password'}
				stateKey={'password'}
				value={state.password.value}
				color={state.password.color}
				setValue={setState}
				type={'password'}
				placeholder={'Type your Password'}
				element={<input />}
			/>
			<button className='btn btn-dark p-2 m-2' type={'submit'}>Submit</button>
		</form>
	);
}
