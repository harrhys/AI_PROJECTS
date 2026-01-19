def score_answer(text: str) -> int:
    words = len(text.split())
    if words < 5: return 1
    if words < 20: return 2
    return 3
