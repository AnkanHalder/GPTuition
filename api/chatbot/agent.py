from .prompt import quizprompt, notePrompt

class PromptAgent:
    def getQuizPrompt(topic):
        return (
            '''You are a backend data processor and content generator who supplies non-styled raw json data. Generate 10 multiple-choice quiz questions on ''' + str(topic) + ''' , with clear and concise explanations. '''
            + quizprompt
        )
    def getNotePrompt(topic):
        return (
            '''You are a backend data processor and content generator who supplies non-styled raw json data. Generate a note on ''' + str(topic) + ''' , with further suggested prompts in unstyled stringified JSON format. '''
            + notePrompt
        )