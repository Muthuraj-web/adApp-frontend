import React, { useState,Fragment } from 'react';
import Signup from './Signup';
import Login from './Login';
import 'bootstrap/dist/css/bootstrap.css';

export default function AuthComponent({auth,setAuth}) {
	const [state, setState] = useState(true);
	const [err,setErr] = useState(false)  

	console.log(state,err)

	return (
		<div className="contaniner auth-container">
			{err?<p>{err}</p>:<Fragment/>}
			<div className="row p-0 m-0">
				<button
					onClick={() => {
						setState(true);
					}}
					className={`btn rounded-0 col-6 p-0 m-0 ${state?'border border-bottom-0':'border-bottom'}`}
				>
					SignUp
				</button>
				<button
					onClick={() => {
						setState(false);
					}}
					className={`btn rounded-0 col-6 p-0 m-0 ${!state?'border border-bottom-0':'border-bottom'}`}
				>
					Login
				</button>
			</div>
			{
			    state ? 
				<Signup setErr={setErr} setAuth={setAuth} auth={auth}/> : 
				<Login setErr={setErr} setAuth={setAuth} auth={auth}/>
			}
		</div>
	);
}
