import React,{useState} from 'react'
import { MdMenu } from "react-icons/md";
import Draggable from 'react-draggable';
import { useAuthContext } from '../context/useAuthContext';

const Nav = () => {
    const [menuState,setMenuState] = useState(false);
    const {user,dispatch} = useAuthContext();

    function goToNewUrl(url) {
        window.location.href = url;
    }

    function handleAuthAction() {
        if(user){
            localStorage.setItem('user',null);
            dispatch({ type: 'LOGOUT' , payload: null });  
        };
        goToNewUrl("/login");
    }

    return (
        <>  
            <Draggable>
                <button
                    onPointerUp={()=>setMenuState((prev)=>(!prev))}
                    style={{top:"50%", left:"5%"}} 
                    className={`fixed flex-center text-xl h-10 w-10 sm:h-16 sm:w-16 rounded-full z-[10000] cursor-pointer
                    ${(menuState)?'bg-black text-white':' bg-white text-black'}`}>
                        <MdMenu />   
                </button>
            </Draggable>
            <div className={`fixed ${(menuState)?'opacity-100':'opacity-0'} z-[9000]  top-0 left-0 h-full
                ${(menuState)?'w-full':'w-8'} bg-white text-black text-2xl font-bold
                transition-all duration-200 ease-in-out overflow-hidden`
            }>
                <div className='h-full w-full flex-center flex-col gap-2 relative p-4'>
                    <div className='absolute top-0 left-0 w-full flex items-center justify-between'>
                        <h1 className=' text-2xl font-bold m-4'>
                            Welcome {(user)?user.name: "Guest"}
                        </h1>
                        <button
                            onClick={()=>{handleAuthAction()}}
                            className=' text-2xl font-bold m-4 cursor-pointer px-4 py-2 rounded-xl border-2 border-black border-solid hover:bg-black hover:text-white'
                        >
                            {(user)?"LOGOUT":"LOGIN"}
                        </button>
                    </div>
                    <a
                        href="/"
                        className=' text-xl font-bold m-4 cursor-pointer '
                    >
                        Home
                    </a>
                    <select
                        value={window.location.pathname}
                        onChange={(e)=>(goToNewUrl(e.target.value))}
                        className=' text-xl text-center cursor-pointer outline-none'
                    >
                        <option value="/selfstudy">Self Study</option>
                        <option value="/selfstudy/take_quiz"> SelfStudy: Take Quiz </option>
                        <option value="/generateNotes"> SelfStudy: Take Notes </option>
                    </select>
                    <a
                        href="/freeResources"
                        className=' text-xl font-bold m-4 cursor-pointer '
                    >
                        Free Resources
                    </a>
                </div>
            </div>
        </>
        
    )
}

export default Nav