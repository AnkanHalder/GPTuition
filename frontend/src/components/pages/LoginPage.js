import React,{useState} from 'react'
import HeroText from '../page_components/HeroText'
import HeroDescription from '../page_components/HeroDescription'
import ApiManager from '../../api_manager/ApiManager';
import { useAuthContext } from '../context/useAuthContext';

const LoginPage = () => {
    const [isLogginIn,setIsLoggingIn] = useState(true);
    const [formData,setFormData] = useState({ email: "" , password: "",name:""});
    const [message,setMessage] = useState(null);
    const {dispatch} = useAuthContext();
    
    const handleSubmit = async (e) =>{
        e.preventDefault();
        console.log(formData);
        let data;
        if(!isLogginIn) data = await ApiManager.SignUpUser(formData);
        else data = await ApiManager.LoginUser(formData);
        console.log(data);
        if (data.success){
            dispatch({
                type: 'LOGIN',
                payload: data.data
            });
            localStorage.setItem('user',JSON.stringify(data.data));
            console.log("Successssss")
            window.location.href="/";
            
        } else {
            try {
                setMessage(data.error.errors[0].message)
            } catch(e) {
                setMessage(data.message);
            }
        }
    }

  return (
    <div className='page min-h-screen w-screen overflow-x-hidden overflow-y-auto'>
        <HeroText span="Login Or SignUP" />
        <HeroDescription text="Please Login to Access Classroom Features"/>
        <form onSubmit={(e)=>{handleSubmit(e)}}  className='flex-center'>
            <div className=' flex-center flex-col gap-4 bg-sec px-6 py-4 rounded-xl w-11/12 sm:w-2/5'>
                <h1 className='text-2xl font-bold text-gradient-primary py-4 '> 
                    {(isLogginIn)?" Login ": " Sign Up "} Now
                </h1>
                <h1 className=' py-2 text-lg text-pink-600'>{message}</h1>
                {
                    (isLogginIn)
                    ?
                        null
                    :
                        <input
                            type="text"
                            onChange={(e)=>{setFormData((prev)=>({...prev,name: e.target.value}))}}
                            placeholder=' Enter Name' 
                            className=' w-11/12 text-xl font-semibold text-center rounded-lg p-2 bg-transparent border-2 border-solid border-white focus:border-pink-500 outline-none'
                        />
                }
                <input
                    type="email"
                    onChange={(e)=>{setFormData((prev)=>({...prev, email: e.target.value }))}}
                    placeholder=' Enter Email' 
                    className=' w-11/12 text-xl font-semibold text-center rounded-lg p-2 bg-transparent border-2 border-solid border-white focus:border-pink-500 outline-none'
                />
                <input
                    type="password"
                    onChange={(e)=>{setFormData((prev)=>({...prev, password: e.target.value }))}}
                    placeholder=' Enter Password' 
                    className=' w-11/12 text-xl font-semibold text-center rounded-lg p-2 bg-transparent border-2 border-solid border-white focus:border-pink-500 outline-none'
                />
                <button 
                    type="button"
                    onClick={()=>setIsLoggingIn((prev)=>(!prev))}
                    className='text-md text-gradient-primary'
                > 
                    {(isLogginIn)?"Don't Have An Account ? Sign Up" : "Already Have An Account ? Login" }
                </button>
                <button 
                    type="submit"
                    className='text-2xl font-bold text-gradient-primary py-2 px-4 button '
                > 
                    {(isLogginIn)?" Login ": " Sign Up "}
                </button>
            </div>
        </form >
    </div>
  )
}

export default LoginPage