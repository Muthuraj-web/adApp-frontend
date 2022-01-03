import Axios from 'axios';
import {verify} from 'jsonwebtoken'
export const getAdsAPI = 'https://adapp-backend.herokuapp.com/ad/getAll';
export const getAdByadIDAPI = (adID)=> `https://adapp-backend.herokuapp.com/ad/${adID}`
export const getMyAdsByuserIDAPI = (userID) =>`https://adapp-backend.herokuapp.com/ad/myAds/${userID}`
export const updateAdAPI = 'https://adapp-backend.herokuapp.com/ad/update'
export const deleteAdByIDAPI = 'https://adapp-backend.herokuapp.com/ad/delete'
export const createNewAdAPI = 'https://adapp-backend.herokuapp.com/ad/new'

export const getCommentsbyIDAPI = (adID) =>`https://adapp-backend.herokuapp.com/comment/${adID}`
export const addCommentAPI = 'https://adapp-backend.herokuapp.com/comment/add'

export const signupEndPoint = 'https://adapp-backend.herokuapp.com/auth/signup';
export const loginEndPoint = 'https://adapp-backend.herokuapp.com/auth/login'


export async function getAds() {
	try {
		const result = (await Axios.get(getAdsAPI)).data;
		if ('err' in result) throw new Error(result.err)
		console.log(result)
		return result
	} catch (e) {
		console.log(e.message)
		throw new Error(e.message);
	}
}

export async function getAdByadID(adID) {
	try {
		const result = (await Axios.get(getAdByadIDAPI(adID))).data;
		if ('err' in result) throw new Error(result.err)
		return result
	} catch (e) {
		throw new Error(e.message);
	}
}

export async function getMyAdsByuserID(userID){
	try {
		const result = await Axios.get(getMyAdsByuserIDAPI(userID));
		
		if ('err' in result.data) throw new Error(result.data.err)
		return result.data
	} catch (e) {
		throw new Error(e.message);
	}
}

export const updateChanges = async(adID,title,description)=>{
	try{
		const token = localStorage.getItem('token')
		if(token===null) throw new Error("Please Signup/Login to do this action")

		const result = await Axios.post(updateAdAPI,{token,adID,title,description})
		return result.data
	}
	catch(e){
		return {err:e.message}
	}
}

export const createNewAd = async(userID,title,description)=>{
	try{
		const token = localStorage.getItem('token')
		if(token===null) throw new Error("Please Signup/Login to do this action")

		const result = await Axios.post(createNewAdAPI,{token,userID,title,description})
		return result.data
	}
	catch(e){
		return {err:e.message}
	}
}

export const deleteAdByID = async(adID)=>{
	try{
		const token = localStorage.getItem('token')
		if(token===null) throw new Error("Please Signup/Login to do this action")

		const result = await Axios.post(deleteAdByIDAPI,{token,adID})
		return result.data
	}
	catch(e){
		return {err:message}
	}
}

export async function getCommentsbyadID(adID){
	try {
		const result = (await Axios.get(getCommentsbyIDAPI(adID))).data;
		if ('err' in result) throw new Error(result.err)
		return result

	} catch (e) {
		throw new Error(e.message);
	}
}

export const addComment = async(userID,adID,comments)=>{
	try{
		const token = localStorage.getItem('token')
		if(token===null) throw new Error("Please Signup/Login to do this action")

		const result = await Axios.post(addCommentAPI,{token,userID,adID,comments})
		return result.data
	}
	catch(e){
		return {err:e.message}
	}
}

const months = ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sept","Oct","Nov","Dec"]

export const checkAndSetErr = (condition,setState,key,value,setErr,message) =>{
	if (!condition) return false
	setErr(message);
	setState((prevState) => ({
		...prevState,
		...giveErrorState(key, value)
	}));
	return true
}

export const giveErrorState = (key, value) => {
	return { [key]: { value, color: 'red' } };
};

export const getDateString = date =>{
	const dateObj = new Date(date)
	return `${dateObj.getDate()},${months[dateObj.getMonth()]} ${dateObj.getFullYear()}`
}

export const getAdsandComments = async(adID) =>{
	try{
		const info = await getAdByadID(adID)
		const comments = await getCommentsbyadID(adID)
		return {info:info[0],comments}
	}
	catch(e){
		throw new Error(e.message)
	}
}

export const getTokenValues = ()=>{
	try{
		const result = verify(localStorage.getItem('token'),'JWTprivatekey')
		console.log(result,'getToken')
		return result
	}
	catch(e){
		return {err:e.message}
	}
}




export const initialValues = { value: '', color: 'black' };

export const initialSignupState = {
	name: { ...initialValues },
	email: { ...initialValues },
	password: { ...initialValues }
};

export const initialLoginState = {
	email: { ...initialValues },
	password: { ...initialValues }
};

export const initialAddFormState ={
	title : {...initialValues},
	description : {...initialValues}
}