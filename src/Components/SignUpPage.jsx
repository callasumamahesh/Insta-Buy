import React, { useEffect } from 'react'
import { useState } from 'react'
import Buy from '../assets/SIgnup.png'
import { useNavigate } from 'react-router-dom'

function SignUpPage({setUser}) {

    const [screen,setScreen] = useState(
        window.innerWidth >= 600 && window.innerWidth <= 1100
    )

    const [screenForMobiles,setScreenForMobiles] = useState(
       window.innerWidth <= 600,
    )

    useEffect(()=>{
        const SizeScreen = ()=>{
            setScreen(window.innerWidth >= 600 && window.innerWidth <= 1100)
        }
        SizeScreen();
        window.addEventListener('resize',SizeScreen)
        return()=>{
            window.removeEventListener('resize',SizeScreen)
        }
    }, [])
    const MobileSignup = {
        flexDirection : screenForMobiles ? 'column' : 'row',
    }
    const changesInLeft = {
        flexDirection : screen ? 'column' : 'row',
        height : 'auto',
        justifyContent : screen ? 'center' : 'center',
    }
    const Leftside = {
        marginTop : screen ? '2rem' : '0rem',
    }

    useEffect(() => {
        const SizeScreenForMobile = () => {
            setScreenForMobiles(window.innerWidth <= 600 );
        }
        SizeScreenForMobile();
        window.addEventListener('resize',SizeScreenForMobile)
        return() => {
            window.removeEventListener('resize',SizeScreenForMobile)
        }
    },[])

    const [email,setEmail] = useState('')
    const navigate = useNavigate();

    const inputFields = {
        width:'250px',
        padding:'10px',
        borderRadius:'7px',
        fontSize : '14px',
        marginRight:'1rem',
        marginBottom:'2rem',
        marginTop:'1rem',
        border:'none',
    }
    const inputFields1 = {
        width:'450px',
        padding:'10px',
        borderRadius:'7px',
        fontSize : '14px',
        marginRight:'1rem',
        marginBottom:'2rem',
        marginTop:'1rem',
        border:'none',
    }
    const SubmitButton ={
        width:'450px',
        display:'block',
        padding:'10px',
        backgroundColor:'blue',
        border:'2px solid white',
        color:'white',
        borderRadius:'7px',
    }
    const para = {
        marginTop :'1rem',
    }
    // const CombineStyles = {...changesInLeft,...MobileSignup}
    // console.log(changesInLeft)
    // console.log(MobileSignup)
    const mobileTotalStyles = {...changesInLeft,...MobileSignup}
  return (
    <div className='SignUpPage' style={mobileTotalStyles}>
        <div className='left' style={Leftside}>
            <h1>InstaBuy!</h1>
            <h3>One Place for all your needs</h3>
            <input type="text" placeholder='Enter Email' 
            onClick={(e) => (e.currentTarget.value)}
            style={inputFields}/>
            <input type="password" placeholder='Passowrd' style={inputFields}/>
            <input type="text" placeholder='Enter Full Name' style={inputFields1}/>
            <button style={SubmitButton} 
            onClick = { ()=> {
                localStorage.setItem('InstaBuyEmail',email)
                navigate('/');
                setUser(email)
              }}
            >Join the club</button>
            <p style={para}>Already a memeber? <a href='/login' style={{textDecoration:'none',color:'white'}}>Click here</a></p>
        </div>
        <div className='rignt'>
            <img src={Buy} alt="" style={{width:'500px'}}/>
        </div>
    </div>
  )
}

export default SignUpPage