import React from 'react';
import AdTemplate from './AdTemplate';
import CreateAdButtonComponent from '../CreateAdButtonComponent';
import 'bootstrap/dist/css/bootstrap.css';

export default function DisplayAdsComponent({ads,auth}) {

	return (
		<div className="container p-0 m-auto position-relative">
			<div className="row p-0 m-0">
				{ads.map((each,idx) => (
					<AdTemplate key={idx} {...each} />
				))}
			</div>
			<CreateAdButtonComponent auth={auth}/>
		</div>


	);
}
