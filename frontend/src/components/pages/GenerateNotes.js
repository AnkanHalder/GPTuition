import React,{useState} from 'react'
import PromptInput from '../page_components/PromptInput'
import ConversationCard from '../page_components/ConversationCard'
import ApiManager from '../../api_manager/ApiManager'

const GenerateNotes = () => {
    const [conversations,setConversations] = useState([]);
    const [loadingText,setLoadingText] = useState(null);
    const [noteName,setNoteName] = useState("Untitled Note");

    const SaveNoteAsPDF = async () => {
         const res = await ApiManager.SaveNoteAsPDF({
            noteName: noteName,
            conversations: conversations,
        })
        const blob = new Blob([res.data], { type: 'application/pdf' });
        const dataURL = URL.createObjectURL(blob);
        window.open(dataURL, '_blank');
    }; 

    const handlePromptSubmit = async (e,prompt) =>{
        e.preventDefault();
        setLoadingText('Generating ....');
        if(!prompt) prompt = '';
        const data = await ApiManager.GenerateNoteFromTopic(prompt);
        try{
            const parsedData = JSON.parse(data)
            setConversations((prev)=>([...prev,parsedData]));
            setLoadingText(null);
        } catch(e) {
            setLoadingText("Something Went Wrong. Please Keep Trying. ")
        }
    }
    return (
        <div className='flex relative items-center justify-end flex-col  w-screen min-h-screen overflow-x-hidden overflow-y-auto'>
            <div className=' flex flex-wrap items-center justify-between px-2 fixed text-xl w-full top-0 left-0 bg-sec shadow-2xl'>
                <div className='h-full p-2 text-xl'>
                    <input
                        value={noteName}
                        onChange={(e)=>(setNoteName(e.target.value))}
                        type='text'
                        className=' text-xl font-bold px-4 py-2 bg-transparent h-full outline-none'
                    />
                </div>
                <div className='h-full p-2 text-xl'>
                    <button
                        onClick={()=>{SaveNoteAsPDF()}} 
                        className='px-4 py-2 founded-full bg-blue-400 button'> 
                        SAVE AS PDF 
                    </button>
                </div>
                
            </div>
            {
                conversations.map((conversation,index) => {
                    return (
                        <div className='my-4 py-2 w-full flex-center' key={index}>
                            <ConversationCard
                                handlePromptSubmit={handlePromptSubmit}
                                noteName={noteName}
                                heading={conversation.topic} 
                                text={conversation.reply} 
                                suggestedTopics={conversation.suggestedTopics} 
                            />
                        </div>
                    )
                })
            }
            {
                loadingText ?
                <div className='my-4 py-6 rounded-lg bg-sec w-11/12 sm:w-3/5 flex-center'>
                    <h1 className='text-lg sm:text-xl font-bold text-gradient-primary'>
                    {loadingText}
                    </h1>
                </div>
                :
                null
            }
            <div className='pb-6 my-6 w-full flex-center'>
                <PromptInput buttonText={"ASK"} handleSubmit={handlePromptSubmit} />
            </div>
        </div>
    )
}

export default GenerateNotes