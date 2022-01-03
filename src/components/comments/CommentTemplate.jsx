import React from 'react'
import { getDateString } from '../../utils'
import LogoComponent from '../LogoComponent'

export default function CommentTemplate({name,email,comments,created}){
    return(
        <div className='pt-3'>
            <span>
            <LogoComponent name={name} size={30}/>
            <span className='p-2'>{name},
                <small className='p-2'><i>{email}</i>
                    <small className='p-5'>{getDateString(created)}</small>
                </small>
            </span>
            </span>
            <p className='p-3 mt-1 mb-0 rounded comment-text'>{comments}</p>
        </div>
    )
}