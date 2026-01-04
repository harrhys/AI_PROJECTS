import os
from llama_cpp import Llama

class LocalLLM:
    def __init__(self, model_path=None):
        self.mock = os.getenv('LLM_MOCK','false').lower()=='true'
        self.model_path = model_path
        if not self.mock:
            self.llm = Llama(model_path=model_path or '')

    def generate(self, prompt:str, max_tokens:int=200) -> str:
        if self.mock:
            return "Tell me more about that experience."
        out = self.llm(prompt, max_tokens=max_tokens)
        return out['choices'][0]['text']
