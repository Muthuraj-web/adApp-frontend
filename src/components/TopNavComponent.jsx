import React,{useCallback, useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';
import LogoComponent from './LogoComponent'

export default function TopNavComponent({auth,setAuth}){

    const [dropdownToggle,setDropdownToggle] = useState(false)
    const navigate = useCallback(useNavigate())

    const logout = (e)=>{
        e.preventDefault()
        localStorage.removeItem('token')
        setAuth({})
    }

    const handleAuthSubmit = ()=>{
        navigate('/auth')
    }
    
    return(
        <>
        <div className="container-fluid border-dark rounded border-bottom mb-2">
        <div className="container pt-2 pb-2 m-auto">
                <div className='p-2 position-relative'>
                    <h5>AdPublish</h5>
                    {
                        auth.userID ? 

                        <span className='push-right-absolute' onClick={()=>{setDropdownToggle(!dropdownToggle)}}>
                            {auth.name.toUpperCase()}
                            <span><LogoComponent name={auth.name} size={50}/></span>
                        </span>       :

                        <Link className="cancel-a-behavior m-2 push-right-absolute" to={'/auth'}>
                            <button className='btn btn-dark' onClick={handleAuthSubmit} >Signup / Login</button>
                        </Link>

                    }
                </div>
        </div>
        </div>
        {
            auth.userID && dropdownToggle     ? 
             
            <div className='container m-auto w-100 position-relative' style={{zIndex:'1'}}>
            <ul className='push-right-absolute'>
                <Link to={`/myAds/${auth.userID}`}>
                    <li className='p-2'>Show MyAds</li>
                </Link>
                <Link to={`/add`}>
                    <li className='p-2'>Create Ads</li>
                </Link>
                <li className='p-2' onClick={logout}>Logout</li>
            </ul>
            </div>      :

            <></>
        }
        </>
    )
}