import React from 'react';
import { Link } from 'react-router-dom';
import "../../styles.css"
import { getDateString } from '../../utils';

export default function AdTemplate(props){
	return (
		<div className='col-sm-4 p-1 '>
			<Link className='cancel-a-behavior' to={`/ad/${props.adID}`}>
				<div className="p-3 rounded h-100 w-100" 
				style={{borderLeft:"5px solid black",borderTop:"1px solid black",
				       borderRight:"1px solid black",borderBottom:"1px solid black",boxShadow:"10px 10px 10px lightgreen"}}>
					<span>created - <span className='p-1 m-0 border rounded-pill'>{getDateString(props.created)}</span></span>
					{props.edited ? <span className='m-2'>edited - <span className='p-1 m-0 border rounded-pill'>{getDateString(props.edited)}</span></span>:<></>}
					
					<h5 className='mt-3'>{props.title}</h5>
					<small>{props.name} - <i>{props.email}</i></small>

				</div>
			</Link>
		</div>
	);
}
