import random
import sys

EMOTION_LINES = {
    'happy': [
        "Joy bursts from me like sunlight in May,",
        "Every step is lighter day by day.",
    ],
    'sad': [
        "A heavy heart drifts through the rain,",
        "In quiet corners I harbor my pain.",
    ],
    'love': [
        "Your name is the melody to my heart,",
        "Every beat is a piece of art.",
    ],
    'anger': [
        "Rage burns hot like a roaring fire,",
        "Trembling hands clench with desire.",
    ],
    'fear': [
        "Shadows linger as whispers of fright,",
        "I search for courage in the night.",
    ],
}


def create_poem(emotions):
    lines = []
    for emotion in emotions:
        emotion = emotion.strip().lower()
        if not emotion:
            continue
        options = EMOTION_LINES.get(emotion)
        if options:
            lines.extend(random.sample(options, k=len(options)))
        else:
            lines.append(f"I feel {emotion} in this moment of time,")
    return "\n".join(lines)


def main():
    if len(sys.argv) < 2:
        print("Usage: python3 poetry_app.py <emotion1,emotion2,...>")
        sys.exit(1)
    input_emotions = sys.argv[1].split(',')
    poem = create_poem(input_emotions)
    print(poem)


if __name__ == "__main__":
    main()
