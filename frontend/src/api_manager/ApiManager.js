import axios from "axios";
import routes from "./routes";


class ApiManager{
    static async  GenerateNoteFromTopic(prompt){
        const res = await axios.post(routes.generateNoteRoute, {topicName: prompt})
        return res.data;
    } 
    static async SaveNoteAsPDF(data){
        const res = axios.post('/api/generate_note_pdf',{
            noteName: data.noteName,
            conversations: data.conversations
        });
        return res;
    }
    static async generateQuiz(topicName){
        const res = await axios.post('/api/generate_quiz', {topicName: topicName})
        return res.data;
    }
    static async submitQUiz(data){
        const res = await axios.post('/api/submit_quiz',{
            quiz_id: data.id,
            score: data.score
        });
        return res;
    }
    static async getTopQuizes(data){
        const res = await axios.get('/api/get_top_quizzes');
        return res.data;
    }
    static async getQuiz(id){
        const res = await axios.post('/api/get_quiz',{id});
        return res.data;
    }
    static async LoginUser(user){
        const res = await axios.post('/api/login',{
            email: user.email,
            password: user.password
        });
        return res.data;
    }
    static async SignUpUser(user){
        const res = await axios.post('/api/signup',{
            email: user.email,
            password: user.password,
            name: user.name
        });
        return res.data;
    }
    static async CreateClassroom(data){
        const res = await axios.post('/api/create_classroom',{
            ...data
        });
        return res.data;
    }
    static async getClassrooms(data){
        const res = await axios.post('/api/get_communities',data);
        return res.data;
    }            
};

export default ApiManager;