import React, { useState } from 'react';
import InputComponent from './InputComponent';
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router';
import { initialAddFormState,getTokenValues,checkAndSetErr, initialLoginState,loginEndPoint, createNewAd } from '../utils';

export default function AddFormComponent({auth}) {

	const [state, setState] = useState(() => {
		return {...initialAddFormState };
	});

    const [err,setErr] = useState(false)

	const navigate = useNavigate()

	const handleSubmit = async (e) => {
		e.preventDefault();

		const title = state.title.value;
		const description = state.description.value;

		if (checkAndSetErr(title.length===0,setState,'title',title,setErr,'title Field is Empty')) return true
		if (checkAndSetErr(description.length===0,setState,'description',description,setErr,'description Field is Empty')) return true

		try {
			const result = await createNewAd(auth.userID,title,description);
			if ('err' in result) throw new Error(result.err)

            navigate('/')
		} 
		catch(e) {
			setErr(e.message)
		}
	};

	return (
        <div className="container p-1 m-auto w-sm-50 w-75">
            <form onSubmit={handleSubmit}>
			    <InputComponent
				    label={'Title'}
				    stateKey={'title'}
				    value={state.title.value}
				    color={state.title.color}
				    setValue={setState}
				    type={'text'}
			 	    placeholder={'Type your Ads title'}
				    element={<textarea />}
			    />
			    <InputComponent
				    label={'description'}
				    stateKey={'description'}
				    value={state.description.value}
				    color={state.description.color}
			 	    setValue={setState}
				    type={'text'}
				    placeholder={'Type your Ads description'}
				    element={<textarea />}
			    />
			<button type={'submit'}>Submit</button></form>
        </div>

	);
}
