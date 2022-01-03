import React, { useEffect, useState,Fragment,useCallback } from 'react';
import { useParams,useNavigate } from 'react-router';
import { getAdsandComments, addComment, getDateString, updateChanges, initialValues, checkAndSetErr,deleteAdByID } from '../../utils';
import CommentTemplate from '../comments/CommentTemplate';
import CreateAdButtonComponent from '../CreateAdButtonComponent';
import InputComponent from '../InputComponent';

export default function DescriptiveTemplate({auth}) {

	const params = useParams();
	const navigate = useCallback(useNavigate(),[])
	const [info, setInfo] = useState({});
	const [comments,setComments] = useState([])
	const [err, setErr] = useState(false);
	const [edit,setEdit] = useState(false)
	const [state,setState] = useState({
		title:{...initialValues},
		description:{...initialValues},
		comment:{...initialValues}
	})


	useEffect(() => {
		getAdsandComments(params.adID)
		    .then(({info,comments})=>{

				setInfo(info)
				setComments([...comments])

				const newState = {...state}
				newState.title.value = info.title
				newState.description.value = info.description

				setState(newState)
			})
			.catch((e)=>{
				setErr(e.message)
			})
	},[]);

	const handleCommentSubmit = async(e) =>{
		e.preventDefault()

		const comment = state.comment.value

		if (checkAndSetErr(comment.length===0,setState,'comment',comment,setErr,'Comment Field is Empty')) return

		try{
			const result = await addComment(auth.userID,info.adID,comment)

			if ('err' in result) throw new Error(result.err)

			const {userID,name,email} = auth
			const {adID} = info

			setComments([{userID,adID,comments:comment,name,email,created:Date.now()},...comments])
			setState((prevState)=>({...prevState,comment:{value:"",color:"black"}}))

		}
		catch(e){
			setErr(e.message)
		}

	}

	const handleEditSubmit = async(e)=>{
		e.preventDefault()

		if(auth.userID && auth.userID!==info.userID) setErr("Not Allowed to Edit others Content")

		const title = state.title.value
		const description = state.description.value
		const {adID} = info

		if (checkAndSetErr(title.length===0,setState,'title',title,setErr,'Title Field is Empty')) return
		if (checkAndSetErr(description.length===0,setState,'description',description,setErr,'Description Field is empty')) return

		try{
			const result = await updateChanges(adID,title,description)

			if ('err' in result) throw new Error(result.err)

			setInfo({...info,title,description,edited:Date.now()})
			setEdit(false)
		}
		catch(e){
			console.log(e)
			setErr(e.message)
		}
	}

	const handleDeleteSubmit = async(e)=>{
		e.preventDefault()
		const {adID,userID} = info
		if (!auth.userID || userID!=auth.userID) return setErr("Not Authorized to Delete Contents")
		try{
			const result = await deleteAdByID(adID) 
			if ('err' in result) throw new Error(result.err)
			navigate('/')
		}
		catch(e){
			console.log(e)
			setErr(e.message)
		}
	}

	return(
		<div className='container p-0 m-auto' style={{postion:"relative"}}>
			{err?<p>{err}</p>:<Fragment/>}

			{
				Object.keys(info).length ===0 ? <Fragment/> :
				<>
				<div className='contanier'>
					<span>created - <span className='p-1 m-0 border rounded-pill'>{getDateString(info.created)}</span></span>
					{info.edited?<span className='m-2'>edited - <span className='p-1 m-0 border rounded-pill'>{getDateString(info.edited)}</span></span>:<></>}

					{edit ?
					    <>
						<form onSubmit={handleEditSubmit}>

							<InputComponent
							stateKey= {'title'}					
							value = {state.title.value}
							setValue = {setState}
							type = {'text'}
							placeholder = {'Enter your Advertisement Title'}
							color = {state.title.color}
							element={<textarea/>} />

							<InputComponent
							stateKey= {'description'}					
							value = {state.description.value}
							setValue = {setState}
							type = {'text'}
							placeholder = {'Enter your description Title'}
							color = {state.description.color}
							element={<textarea/>}/>

							<button className='btn btn-dark p-2 m-2' type={'submit'}>Apply Changes</button>

						</form>

						</>
					     :
						<>
					    <h5>{info.title}</h5>
					    <pre>{info.description}</pre>
						</>
					
				    }

					<p>{info.name} - {info.email}</p>

					{
					    auth.userID  && auth.userID===info.userID ? 
						<>
						<button className='btn btn-dark p-2' type={'button'} onClick={()=>{setEdit(!edit)}}>Edit</button>
						<button className='btn btn-dark p-2' type={'button'} onClick={handleDeleteSubmit}>Delete</button>
						</>  :
						
						<></>
					}
				</div>

				<p>comments :</p>

				<div className='container m-auto'>
					{
						auth.userID ?

						<form onSubmit={handleCommentSubmit}>

							<InputComponent 
							stateKey= {'comment'}					
							value = {state.comment.value}
						    setValue = {setState}
						    type = {'text'}
						    placeholder = {'Add your comment'}
						    color = {state.comment.color}
						    element={<textarea/>}/>

						    <button className='btn btn-dark p-2 m-2' type={'submit'}>post</button>

						</form>  :

						<></>
					}
					{
						comments.map((each,idx) => <CommentTemplate key={idx} {...each}/>)
					}
				</div>
				</>
			}
			<CreateAdButtonComponent auth={auth}/>
		</div>
	);
}