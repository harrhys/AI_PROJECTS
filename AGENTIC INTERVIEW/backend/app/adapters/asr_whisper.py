import whisper, tempfile

class ASRWhisper:
    def __init__(self, model_name='small'):
        self.model = whisper.load_model(model_name)

    def transcribe(self, audio_bytes: bytes) -> str:
        with tempfile.NamedTemporaryFile(suffix='.wav', delete=False) as f:
            f.write(audio_bytes)
            f.flush()
            res = self.model.transcribe(f.name)
            return res.get('text','')
