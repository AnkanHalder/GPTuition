import React, { useEffect, useState } from 'react'
import HeroText from '../page_components/HeroText'
import HeroDescription from '../page_components/HeroDescription'
import { useAuthContext } from '../context/useAuthContext'
import { MdArrowDropUp } from "react-icons/md";
import ApiManager from '../../api_manager/ApiManager';


const Classrooms = () => {
    const {user,dispatch} = useAuthContext();
    const [createClassroomBool,setCreateClassroomBool] = useState(false);
    const [joinClassroomBool,setJoinClassroomBool] = useState(false);
    const [my_communities, setMyCommunities] = useState([]);
    

    const handleCreateClassroom = async (e,user)=> {
        e.preventDefault();
        const formData = new FormData(e.target);
        const name = formData.get('classroom_name');
        const subject = formData.get('classroom_subject');
        const tags = formData.get('classroom_tags');
        const desc = formData.get('classroom_desc');
        const adminId = user.id
        console.log(name, subject, tags, desc)
        const data = await ApiManager.CreateClassroom({
            name: name,
            subject: subject,
            tags: tags,
            desc: desc,
            adminId: adminId,
        });
        console.log("Data is : ",data);
        if(data.success){
            
        }

        
    }

    useEffect(()=>{
        if(user){
            console.log("MEMBER OF: " , user.member_of)
            ApiManager.getClassrooms(JSON.parse(user.member_of)).then((data)=>{
                console.log("Classrooms Data is : ",data)
                setMyCommunities(data.data);
            })
        }
    },[user])

    if(!user) return <h1>Please Login In to view Classrooms</h1>;

    return (
        <div className='page min-h-screen w-screen overflow-x-hidden overflow-y-auto'>
            <HeroText heading="Welcome To " span="GPTuition Classrooms" />
            <HeroDescription text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. " />
            <div className='flex-center flex-col gap-10 my-12'>
                <div className=" w-11/12 sm:w-3/5 bg-sec rounded-lg flex-center flex-col">
                    <div
                        onClick={()=>setCreateClassroomBool((prev)=>(!prev))} 
                        className="w-full py-3 cursor-pointer flex-center flex-wrap gap-4">
                        <h1> Create New Community </h1>
                        <div className={`text-4xl flex-center transition-all duration-300 ${createClassroomBool?"rotate-180":"rotate-0"}`}>
                            <MdArrowDropUp/>
                        </div>
                        
                    </div>
                    {
                        createClassroomBool ?
                        <div className="w-full">
                            <div className=" w-full h-[2px] bg-slate-200"></div>
                            <h1 className='text-xl font-bold text-center my-4'>Create New Community</h1>
                            <form 
                                onSubmit={(e)=>{handleCreateClassroom(e,user)}}
                                className="py-4 flex-center flex-col gap-4"
                            >
                                <input
                                    name="classroom_name"
                                    className="w-11/12 bg-transparent p-2 text-center font-semibold border-[1px] border-slate-100"
                                    type="text"
                                    placeholder="Classroom Name"
                                />
                                <input
                                    name="classroom_subject"
                                    className="w-11/12 bg-transparent p-2 text-center font-semibold border-[1px] border-slate-100"
                                    type="text"
                                    placeholder="Classroom Subject"
                                />
                                <input
                                    name="classroom_tags"
                                    className="w-11/12 bg-transparent p-2 text-center font-semibold border-[1px] border-slate-100"
                                    type="text"
                                    placeholder="Tags - space separated "
                                />
                                <textarea
                                    name="classroom_desc"
                                    className="w-11/12 bg-transparent p-2 text-center font-semibold border-[1px] border-slate-100"
                                    placeholder="Description "
                                />
                                <button
                                    className=" button px-6 py-2 rounded-lg uppercase"
                                    type="submit"
                                >
                                    Create
                                </button>
                            </form>
                        </div>
                        :
                        null
                    }
               
                </div>
                <div className=" w-11/12 sm:w-3/5 rounded-lg flex-center flex-col">
                    <h1 className="text-2xl font-bold">My Communities</h1>
                </div>
            </div>
           
        </div>
    )
}

export default Classrooms