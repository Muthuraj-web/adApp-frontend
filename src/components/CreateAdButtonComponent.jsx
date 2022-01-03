import React, { useCallback } from 'react'
import { useNavigate } from 'react-router'

export default function CreateAdButtonComponent({auth}){
    const navigate = useCallback(useNavigate())
    
    return(
        <>
        {
            auth.userID ?
            <div className='container'>
                <button className='button create-ad rounded-pill pt-1 pb-1 pr-2 pl-2' onClick={()=>navigate('/add')}>
                    + Create Advertisement
                </button> 
            </div> :
            <></>
        }
        </>
    )
}