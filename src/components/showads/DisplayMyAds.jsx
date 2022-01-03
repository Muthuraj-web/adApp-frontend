import { useParams } from 'react-router';
import { getMyAdsByuserID } from '../../utils';
import React,{useState,useEffect} from 'react'
import DisplayAdsComponent from './DisplayAdsComponent'

export default function DisplayMyAds({auth}){

    const params = useParams()
    const [ads, setAds] = useState([]);
	const [err, setErr] = useState(false);

	useEffect(() => {
        console.log('ssss')
		getMyAdsByuserID(params.userID)
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