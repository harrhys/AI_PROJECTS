class InterviewAgent:
    def __init__(self, llm):
        self.llm = llm
        self.history = []

    def get_opening_question(self):
        return "Can you briefly introduce yourself and describe your most recent role?"

    def next_question(self, last_answer: str) -> str:
        prompt = f"You are an interviewer. Candidate said: '{last_answer}'. Ask one focused follow-up question."
        q = self.llm.generate(prompt)
        self.history.append({'answer': last_answer, 'question': q})
        return q
