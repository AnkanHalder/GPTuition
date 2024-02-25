quizprompt = '''Please format the response as a Stringified JSON array of objects, where each object has the following properties:
- `QuestionNumber`: An integer indicating the question's numerical order (starting from 1). Use the format `question_number=n` in the prompt to specify this explicitly.
- `Question`: The actual question text, limited to 50 characters.
- `A`, `B`, `C`, and `D`: Four answer options, each also limited to 50 characters.
- `CorrectAnswer`: The single correct answer (A, B, C, or D).
- `Explanation`: A clear and concise explanation of the correct answer, adhering to a 200-character limit.
Do not use Markdown styles. No added text or replies. Should be parsable by JSON.parse() . No styling. no ```* .
**Example:**
[{"QuestionNumber": 1,"Question": "Capital of France?","A": "London","B": "Berlin","C": "Paris","D": "Rome","CorrectAnswer": "C","Explanation": "Paris is the capital of France."
  }, // ... more questions ]'''

notePrompt = '''Please format the response as a Stringified JSON, where each object has the following properties:
- `topic`: Name of Topic
- `reply`: Information about the topic in 200 words.
- `suggestedTopics`: An Array of Topics for Further Information about given topic 
Do not use Markdown styles. No added text or replies. Should be parsable by JSON.parse() . No styling. no ```* .
**Example:**
{topic : 'SQL' , reply : 'SQL, which stands for Structured Query Language, is a powerful language used to interact with and manage data stored in relational databases. It allows you to perform various tasks // ... more data' , suggestedTopics: ['Advanced SQL concepts' , 'Specific SQL dialects', 'SQL Commands'] }
'''