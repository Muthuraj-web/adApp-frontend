import './styles.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DescriptiveTemplate from './components/showads/DescriptiveTemplate';
import AuthComponent from './components/auth/AuthComponent';
import { useState } from 'react';
import { getTokenValues } from './utils';
import AddFormComponent from './components/AddFormComponent';
import DisplayMyAds from './components/showads/DisplayMyAds';
import DisplayAllAds from './components/showads/DisplayAllAds';
import TopNavComponent from './components/TopNavComponent';

export default function App() {
	const [auth,setAuth] = useState({})

	if(Object.keys(auth).length===0 && localStorage.getItem('token')) setAuth(getTokenValues())

	const wrapAroundTopNav = (children) => <><TopNavComponent auth={auth} setAuth={setAuth}/>{children}</>

	return (
		<>
		<BrowserRouter>
		    <Routes>
			    <Route path="/myAds/:userID" element={wrapAroundTopNav(<DisplayMyAds auth={auth}/>)}/>
			    <Route path="/ad/:adID" element={wrapAroundTopNav(<DescriptiveTemplate auth={auth}/>)}/>
				<Route path="/auth" element={wrapAroundTopNav(<AuthComponent auth={auth} setAuth={setAuth}/>)}/>
				<Route path="/add" element={wrapAroundTopNav(<AddFormComponent auth={auth}/>)}/>
				<Route path="/" element={wrapAroundTopNav(<DisplayAllAds auth={auth}/>)}/>
			</Routes>
		</BrowserRouter>
		</>
	);
}
