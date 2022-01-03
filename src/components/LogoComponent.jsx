import React from 'react'
import '../styles.css'

export default function LogoComponent({name,size}){
    return (
        <div className="logo" style={{height:size,width:size}}>
            <p className='p-0 m-0'>{name[0].toUpperCase()}{name[Math.floor(name.length/2)].toUpperCase()}</p>
        </div>
    )
}