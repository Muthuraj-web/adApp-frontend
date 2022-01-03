import React, { useState } from 'react';
import {useNavigate} from 'react-router'
import InputComponent from '../InputComponent';
import { checkAndSetErr,initialSignupState, signupEndPoint } from '../../utils';
import Axios from 'axios';

export default function SignUp({auth,setAuth,setErr,}) {
	const [state, setState] = useState(() => {
		return { ...initialSignupState };
	});
	const navigate = useNavigate()

	const handleSubmit = async (e) => {
		e.preventDefault();

		const name = state.name.value;
		const email = state.email.value;
		const password = state.password.value;

		if (checkAndSetErr(name.length===0,setState,'name',name,setErr,'Name Field is Empty')) return
		if (checkAndSetErr(email.length===0,setState,'email',email,setErr,'Email Field is Empty')) return
		if (checkAndSetErr(password.length<8,setState,'password',password,setErr,'Password Field Must contain more than 8 characters')) return

		try {
			const result = await Axios.post(signupEndPoint, {name,email,password});

			if ('err' in result.data) throw new Error(result.data.err)
			else {
				localStorage.setItem('token',result.data.token)
				setAuth({})
				navigate('/')
			}
		} catch (err) {
			setErr(err.message)
		}
	};

	return (
		<form onSubmit={handleSubmit} className='border border-top-0 m-0'>
			<InputComponent
				label={'Name'}
				stateKey={'name'}
				value={state.name.value}
				color={state.name.color}
				setValue={setState}
				type={'text'}
				placeholder={'Type your Name'}
				element={<input />}
			/>
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
