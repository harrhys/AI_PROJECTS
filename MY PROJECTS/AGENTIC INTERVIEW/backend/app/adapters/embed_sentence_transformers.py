from sentence_transformers import SentenceTransformer

class Embedder:
    def __init__(self, model_name='all-MiniLM-L6-v2'):
        self.model = SentenceTransformer(model_name)

    def embed_one(self, text: str):
        vec = self.model.encode([text])[0]
        return vec.tolist()
