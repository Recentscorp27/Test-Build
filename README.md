# Test-Build

This repository contains a simple script to generate short poems based on feelings and emotions.

## Usage

Run the script with a comma-separated list of emotions:

```bash
python3 poetry_app.py happy,sad,love
```

The script will output a short poem containing lines related to the provided emotions. Feel free to extend the `EMOTION_LINES` dictionary in `poetry_app.py` with more emotions and lines.

## Web Interface

Install the dependencies and run the Flask server:

```bash
python3 -m pip install Flask
python3 web_app.py
```

Then open `http://localhost:5000` in your browser to generate poems using a simple web form.
