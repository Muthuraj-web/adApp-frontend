import React,{useState,useEffect} from 'react'
import DisplayAdsComponent from './DisplayAdsComponent'
import {getAds} from '../../utils'

export default function DisplayAllAds({auth}){

    const [ads, setAds] = useState([]);
	const [err, setErr] = useState(false);

	useEffect(() => {
		getAds()
			.then(data=> {
				console.log(data);
				setAds([...data]);
			})
			.catch((e) => {
				setErr(e.message);
			});
	}, []);

    return <DisplayAdsComponent auth={auth} ads={ads} />
}